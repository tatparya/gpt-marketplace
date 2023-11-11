const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

const { verifyToken } = require('../middleware/authMiddleware');
const { admin } = require('../services/firebase-admin');

// Helper functions
const getMetadataFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);

    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const imageUrl = $('meta[property="og:image"]').attr('content');
    console.log(title, imageUrl);

    return { title, imageUrl };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {};
  }
};

const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

const urlExists = async (url) => {
  const agentsRef = admin.firestore().collection('agents-meta');
  const snapshot = await agentsRef.where('url', '==', url).get();
  return !snapshot.empty;
};

// Verify URL and get metadata
router.post('/agents/check-url', verifyToken, async (req, res) => {
  try {
    const { url } = req.body;

    if (!isValidUrl(url)) {
      return res.status(403).send('Invalid URL');
    }

    const exists = await urlExists(url);
    if (exists) {
      return res.json({ exists });
    }

    // Fetch metadata if URL does not exist in the database
    const metadata = await getMetadataFromUrl(url);
    if (metadata.title || metadata.imageUrl) {
      res.json({ exists: false, title: metadata.title, imageUrl: metadata.imageUrl });
    } else {
      res.status(404).send('Metadata not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Add new agent to DB
router.post('/agents/add', verifyToken, async (req, res) => {
  const { url, title, imageUrl, description } = req.body;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const exists = await urlExists(url);
    if (exists) {
      return res.status(409).send('Agent with this URL already exists');
    }

    const agentData = {
      userId: req.user.uid,
      title,       // Use the title provided in the request
      imageUrl,    // Use the imageUrl provided in the request
      url,
      description,
      added: admin.firestore.Timestamp.now(),
    };

    await admin.firestore().collection('agents-meta').add(agentData);
    res.status(201).send('Agent added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/agents', async (req, res) => {
  try {
    const agentsRef = admin.firestore().collection('agents-meta');
    const snapshot = await agentsRef.get();

    const agents = [];
    snapshot.forEach(doc => {
      let agentData = doc.data();
      agentData.id = doc.id;
      agents.push(agentData);
    });

    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AgentCard from '../components/AgentCardComponent';
import { UserContext } from '../contexts/UserContext';

const AddAgentPage = () => {
  const [agentUrl, setAgentUrl] = useState('');
  const [description, setDescription] = useState('');
  const [urlValid, setUrlValid] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [previewData, setPreviewData] = useState({ title: '', imageUrl: '' });
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      }
    };

    getToken();
  }, [currentUser]);

  const checkUrl = async () => {
    if (agentUrl === "") {
      setError("");
      setUrlValid(false);
      setPreviewData({ title: '', imageUrl: '' });
      return;
    }
    try {
      const response = await axios.post('/api/agents/check-url', { url: agentUrl }, {
        headers: {
          'Authorization': `${token}`
        }
      });
      if (response.data.exists) {
        setError('This GPT has already been added.');
        setUrlValid(false);
      } else {
        setError('');
        setUrlValid(true);
        // Update preview data
        setPreviewData({
          title: response.data.title, // Assuming title is returned in the response
          imageUrl: response.data.imageUrl // Assuming imageUrl is returned in the response
        });
      }
    } catch (err) {
      setError('Error checking URL.');
      setPreviewData({ title: '', imageUrl: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (urlValid) {
      try {
        await axios.post('/api/agents/add', {
          userId: currentUser.uid,
          url: agentUrl,
          title: previewData.title, // Include the title from previewData
          imageUrl: previewData.imageUrl, // Include the imageUrl from previewData
          description
        }, {
          headers: {
            'Authorization': `${token}`
          }
        });
        // Redirect or show success message
        navigate('/');
      } catch (err) {
        setError('Error adding agent.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New GPT Agent</h2>
      <form onSubmit={handleSubmit}>
        {/* URL input */}
        <div className="mb-3">
          <label htmlFor="agentUrl" className="form-label">GPT URL</label>
          <input
            type="text"
            className="form-control"
            id="agentUrl"
            value={agentUrl}
            onChange={(e) => setAgentUrl(e.target.value)}
            onBlur={checkUrl}
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
        {/* Description input */}
        {urlValid && (
          <div className="mb-3">
            <label htmlFor="agentDescription" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="agentDescription"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        )}
        {/* Preview Card */}
        {urlValid && previewData.title && (
          <div className="mb-3">
            <h3>Preview</h3>
            <AgentCard
                title={previewData.title}
                imageUrl={previewData.imageUrl}
                description={description}
              />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!urlValid}>Submit</button>
      </form>
    </div>
  );
};

export default AddAgentPage;

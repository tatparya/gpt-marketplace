import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowsePage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('/api/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {agents.map(agent => (
          <div key={agent.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={agent.imageUrl} className="card-img-top" alt={agent.title} />
              <div className="card-body">
                <h5 className="card-title">{agent.title}</h5>
                <p className="card-text">{agent.description}</p>
                <a href={agent.url} className="btn btn-primary px-auto">Visit Agent</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;

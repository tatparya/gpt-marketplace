import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgentCard from '../components/AgentCardComponent';
import AgentDetailModal from '../components/AgentDetailModal';

const BrowsePage = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleCardClick = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null);
  };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    setAgents([...agents].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortAsc) {
        return titleA > titleB ? 1 : -1;
      } else {
        return titleA < titleB ? 1 : -1;
      }
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Browse GPT Agents</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Agents"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSort}>
        Sort {sortAsc ? 'Descending' : 'Ascending'}
      </button>
      <div className="row justify-content-center">
        {agents.filter(agent =>
          agent.title.toLowerCase().includes(searchTerm) ||
          agent.description.toLowerCase().includes(searchTerm)
        ).map(agent => (
          <div key={agent.id} className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
            <AgentCard
              title={agent.title}
              imageUrl={agent.imageUrl}
              description={agent.description}
              onClick={() => handleCardClick(agent)}
            />
          </div>
        ))}
      </div>

      {selectedAgent && (
        <AgentDetailModal
          show={showModal}
          handleClose={handleCloseModal}
          agent={selectedAgent}
        />
      )}
    </div>
  );
};

export default BrowsePage;

import React from 'react';

const AgentDetailModal = ({ show, handleClose, agent }) => {
  const handleVisitAgentClick = () => {
    if (agent.url) { // Make sure the URL is present
      window.open(agent.url, '_blank'); // Open the URL in a new tab
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{agent.title}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {agent.imageUrl && <img src={agent.imageUrl} className="card-img-top" alt={agent.title} />}
            <p className="mt-3">{agent.description}</p>
            {/* Button to visit agent's URL */}
            <button onClick={handleVisitAgentClick} className="btn btn-primary mt-3">Visit Agent</button>
            {/* Future content like ratings and reviews will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModal;

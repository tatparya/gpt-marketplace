import React from 'react';

const AgentCard = ({ title, imageUrl, description, agentUrl, onClick }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent onClick of the card
    console.log(agentUrl);
    window.open(agentUrl, '_blank');
  };

  return (
    <div className="card h-150 card-hover-shadow" style={{ width: "18rem" }} onClick={onClick}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img src={imageUrl} className="card-img-top" alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{description}</p>
        <button onClick={handleButtonClick} className="btn btn-primary mt-auto">Visit Agent</button>
      </div>
    </div>
  );
};

export default AgentCard;

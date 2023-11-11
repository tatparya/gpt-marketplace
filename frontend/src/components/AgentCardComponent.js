import React from 'react';

const AgentCard = ({ title, imageUrl, description, onClick }) => {
  return (
    <div className="card h-150 card-hover-shadow" style={{ width: "18rem" }} onClick={onClick}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img src={imageUrl} className="card-img-top" alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{description}</p>
        {/* Additional elements like buttons can be added here if needed */}
      </div>
    </div>
  );
};


export default AgentCard;

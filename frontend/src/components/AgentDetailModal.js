import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AgentDetailModal = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch details of the GPT agent from Firebase using agentId
  }, [agentId]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{agent.name}</h2>
      {/* Display detailed information about the agent */}
      <p>{agent.description}</p>
      {/* Add Rating and Review components */}
    </div>
  );
};

export default AgentDetailModal;

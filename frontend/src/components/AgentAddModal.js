import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentAddModal = ({ show, onHide, user }) => {
  const [agentUrl, setAgentUrl] = useState('');
  const [description, setDescription] = useState('');
  const [urlValid, setUrlValid] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      }
    };

    getToken();
  }, [user]);

  const checkUrl = async () => {
    if (agentUrl == "") {
      setError("")
      setUrlValid(false)
      return
    }
    try {
      const response = await axios.post('/api/agents/check-url', { url: agentUrl }, {
        headers: {
          'Authorization': `${token}`
        }});
      if (response.data.exists) {
        setError('This GPT has already been added.');
        setUrlValid(false);
      } else {
        setError('');
        setUrlValid(true);
      }
    } catch (err) {
      setError('Error checking URL.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (urlValid) {
      try {
        await axios.post('/api/agents/add', {
          userId: user.uid,
          url: agentUrl,
          description
        }, {
        headers: {
          'Authorization': `${token}`
        }});
        onHide(); // Hide the modal after successful submission
      } catch (err) {
        setError('Error adding agent.');
      }
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New GPT Agent</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-primary" disabled={!urlValid}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAddModal;

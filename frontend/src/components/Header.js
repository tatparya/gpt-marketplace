import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth, firebase } from '../firebaseConfig';
import AgentAddModal from './AgentAddModal';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddAgentClick = () => {
    if (currentUser) {
      setShowAddModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setCurrentUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-2" to="/">GPT Marketplace</Link>
      <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <button onClick={handleAddAgentClick} className="btn btn-outline-secondary my-2 mx-2 my-sm-0">Add New Agent</button>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger my-2 mx-2 my-sm-0">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-outline-success my-2 mx-2 my-sm-0" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary my-2 mx-2 my-sm-0" to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {currentUser && <AgentAddModal show={showAddModal} onHide={() => setShowAddModal(false)} user={currentUser}/>}
    </nav>
  );
};

export default Header;

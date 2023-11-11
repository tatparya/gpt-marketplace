import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/DashboardPage';
import AddAgentPage from './pages/AddAgentPage';

import { UserProvider, UserContext } from './contexts/UserContext';

// A component to handle private routes
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column vh-100">
          <Header />
          <div className="container flex-grow-1">
            <Routes>
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* Implementing a private route for Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              {/* Implementing a private route for AddAgentPage */}
              <Route
                path="/add-agent"
                element={
                  <PrivateRoute>
                    <AddAgentPage />
                  </PrivateRoute>
                }
              />
              {/* Redirect from home to browse or any other default page */}
              <Route path="/" element={<Navigate replace to="/browse" />} />
              {/* Other routes */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

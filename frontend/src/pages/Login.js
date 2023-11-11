import React, { useState } from 'react';
import { auth, firebase } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';


const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const handleGoogleSignIn = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleLoginWithEmail} className="mt-4">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3 d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="d-grid gap-2">
                  <button onClick={handleGoogleSignIn} type="submit" className="btn btn-danger">Sign in with Google</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

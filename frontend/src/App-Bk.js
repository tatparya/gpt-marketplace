import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">GPT Marketplace</a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row mt-4 mb-4">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>

        <div class="row mt-4 row-cols-2">
          <div class="col mb-2">
            <div class="card">
              <div>Card</div>
            </div>
          </div>
          <div class="col mb-2">
            <div class="card">
              <div>Card</div>
            </div>
          </div>
          <div class="col mb-2">
            <div class="card">
              <div>Card</div>
            </div>
          </div>
          <div class="col mb-2">
            <div class="card">
              <div>Card</div>
            </div>
          </div>
          <div class="col mb-2">
            <div class="card">
              <div>Card</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;

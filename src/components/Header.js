
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Header.css';
import React from 'react';

function Header() {
  return (
    <div className="container">
   <nav  class="navbar bg-dark navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid ">
      <a class="navbar-brand text-white" href="/">RestoLoc</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-white" aria-current="page" href="/">Search Restaurant</a>
          </li>

      </ul>
      <form class="d-flex">
      <button class="btn btn-outline-primary me-2" type="button">Sign in</button>
      <button class="btn btn-outline-primary " type="button">Register</button>
    </form>
    </div>
  </div>
</nav>
    </div>
  );
  }
  export default Header;

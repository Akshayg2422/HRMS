import React from "react";
import {Icons} from '@assets'

const Navbar = (props) => {
  return (
    <>
      <nav class="navbar navbar-horizontal navbar-light navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={Icons.NewLogo} alt="" width="100" height="25" class="d-inline-block align-text-top"></img>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-black" id="navbar-primary">
            <div class="navbar-collapse-header text-black">
              <div class="row">
                <div class="col-6 collapse-brand text-black">
                  <a href="javascript:void(0)">
                    <img src="../../assets-old/img/brand/blue.png" />
                  </a>
                </div>
                <div class="col-6 collapse-close">
                  <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <ul class="navbar-nav ml-lg-auto">
              <li class="nav-item">
                <a class="nav-link " href="#Home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#AboutAs">About us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#OurFeatures">Our Features</a>
              </li><li class="nav-item">
                <a class="nav-link " href="#FLowChart">Flow Chart</a>
              </li><li class="nav-item">
                <a class="nav-link " href="#Contact">Contact us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="/login" >Login</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

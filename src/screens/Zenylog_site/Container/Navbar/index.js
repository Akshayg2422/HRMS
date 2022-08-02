import React from "react";
import logo from "../../../../assets/images/Zenylog/Zenylog.png";
const Navbar = (props) => {
  return (
    <>
     {/* <nav class="navbar navbar-expand">
  <div class="container-fluid mt-4">
  <a class="navbar-brand" href="#">
      <img src={logo} alt="" width="150" height="25" class="d-inline-block align-text-top"></img>
    </a>
    <div class="collapse navbar-collapse justify-content-end"  id="navbarNavAltMarkup">
      <div class="nav navbar-nav">
        <a class="nav-link" href="#">Home</a>
        <a class="nav-link" href="#">About us</a>
        <a class="nav-link" href="#">Our Features</a>
        <a class="nav-link" href="#">Flow Chart</a>
        <a class="nav-link" href="#">Contact us</a>
      </div>
    </div>
  </div>
</nav> */}
<nav class="navbar navbar-horizontal navbar-light navbar-expand-lg">
<div class="container-fluid">
<a class="navbar-brand" href="#">
      <img src={logo} alt="" width="150" height="25" class="d-inline-block align-text-top"></img>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse text-black" id="navbar-primary">
<div class="navbar-collapse-header text-black">
<div class="row">
 <div class="col-6 collapse-brand text-black">
<a href="javascript:void(0)">
<img src="../../assets-old/img/brand/blue.png"/>
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
<a class="nav-link " href="#">Home</a>
</li>
<li class="nav-item">
<a class="nav-link " href="#">About us</a>
</li>
<li class="nav-item">
<a class="nav-link " href="#">Our Features</a>
</li><li class="nav-item">
<a class="nav-link " href="#">Flow Chart</a>
</li><li class="nav-item">
<a class="nav-link " href="#">Contact us</a>
</li>

</ul>
</div>
</div>
</nav>
    </>
  );
};

export default Navbar;

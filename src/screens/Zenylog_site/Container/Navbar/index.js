import React from "react";
import { Icons } from '@assets'
import {
  UncontrolledCollapse,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button
} from "reactstrap";

const Navbar = (props) => {
  return (
    <>
      <nav class="navbar navbar-horizontal navbar-light navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={Icons.NewLogo} alt="" width="100" height="25" class="d-inline-block align-text-top"></img>
          </a>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <img src={Icons.NewLogo} alt="" width="100" height="25" class="d-inline-block align-text-top"></img>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <a class="nav-link " href="#Home">Home</a>
              </NavItem>
              <NavItem>
                <a class="nav-link " href="#AboutAs">About us</a>
              </NavItem>
              <NavItem>
                <a class="nav-link " href="#OurFeatures">Our Features</a>
              </NavItem>
              <NavItem>
                <a class="nav-link " href="#FLowChart">Flow Chart</a>
              </NavItem>
              <NavItem>
                <a class="nav-link " href="#Contact">Contact us</a>
              </NavItem>
              <NavItem>
                <a class="nav-link " href="/login" >Login</a>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

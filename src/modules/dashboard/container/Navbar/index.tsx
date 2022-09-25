import React from 'react';
import {NAV_ITEM, useNav} from '@utils'
import {Icons} from '@assets'
import {ImageView} from '@components'



type NavItemProps = {
  id: string;
  name: string;
  value: string;
  icon: any;
}

const NavItem = ({item}: any) => {
  const navigate = useNav();

  return <li className="nav-item"  onClick={() => navigate(item.route)} >
    <a className=" nav-link"  >
      <i className={`${item.icon} text-white`}></i>
      <span className="nav-link-text text-white mt-2 ml-2">{item.name}</span>
    </a>
  </li >
}

const Navbar = ({ }) => {


  return (
    <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs bg-primary" id="sidenav-main">
      <div className="scrollbar-inner">
        <div className="sidenav-header  align-items-center">
          <a className="navbar-brand">
            
            <ImageView
              icon={Icons.LogoSmall}
            />
          </a>
          <div className=" ml-auto  ">
            <div className="sidenav-toggler  d-none d-sm-block" data-action="sidenav-unpin" data-target="#sidenav-main">
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white mb-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner mt-4">
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            <ul className="navbar-nav">
              {
                NAV_ITEM.map((it: NavItemProps) => {
                  return <NavItem item={it} />
                })
              }
            </ul>

          </div>
        </div>
      </div>

      <small className={'position-absolute bottom-0 p-2 text-white text-version text-right'}>Version: 0.3.1</small>

    </nav>



  )
}


export default Navbar;

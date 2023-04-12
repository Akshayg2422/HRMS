// import React, { useEffect, useState } from "react";
// import { CHILD_PATH, NAV_ITEM, useNav } from "@utils";
// import { Icons } from "@assets";
// import { ImageView } from "@components";
// import { useDispatch, useSelector } from "react-redux";
// import { currentNavIndex } from "../../../../store/app/actions";
// import { log } from "console";
// // import { matchRouteName } from "../../../../store/dashboard/actions";

// type NavItemProps = {
//   id: string;
//   name: string;
//   value: string;
//   icon: any;
// };

// const Navbar = ({ }) => {
//   const navigate = useNav();
//   const dispatch = useDispatch();


//   const { userDetails } = useSelector(
//     (state: any) => state.AuthReducer
//   );

//   const { navIndex } = useSelector((state: any) => state.AppReducer);
//   const pathname = window.location.pathname


//   const currentNav = (it: any, index: any) => {
//     navigate(it.route);
//     dynamicActiveNav()
//   };

//   useEffect(() => {
//     dynamicActiveNav()
//   }, [pathname])


//   const dynamicActiveNav = () => {
//     NAV_ITEM.filter((el: any, index: number) => {
//       if (pathname === el.route) {
//         dispatch(currentNavIndex(index));
//       } else {
//         childNav()
//       }
//     })
//   }


//   const childNav = () => {
//     CHILD_PATH.filter((el: any) => {
//       if (pathname === el.path) {
//         NAV_ITEM.filter((element: any, index: number) => {
//           if (el.parent === element.route) {
//             dispatch(currentNavIndex(index));
//           }
//         })
//       }
//     })
//   }

//   return (
//     <nav
//       className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs bg-primary"
//       id="sidenav-main"
//     >
//       <div className="scrollbar-inner">
//         <div className="sidenav-header  align-items-center">
//           <a className="navbar-brand">
//             <ImageView icon={Icons.LogoSmall} />
//           </a>
//           <div className=" ml-auto">
//             <div
//               className="sidenav-toggler d-none d-sm-block"
//               data-action="sidenav-unpin"
//               data-target="#sidenav-main"
//             >
//               <div className="sidenav-toggler-inner">
//                 <i className="sidenav-toggler-line bg-white"></i>
//                 <i className="sidenav-toggler-line bg-white"></i>
//                 <i className="sidenav-toggler-line bg-white"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="navbar-inner mt-5">
//           <div className="collapse navbar-collapse" id="sidenav-collapse-main">
//             <ul className="navbar-nav">

//               {
//                 userDetails.is_admin ?
//                   NAV_ITEM.map((it, index) => {
//                     return (
//                       <>
//                         {<li
//                           className="nav-item"
//                           onClick={() => {
//                             currentNav(it, index)
//                           }}
//                         >
//                           <a
//                             key={index}
//                             style={{ cursor: 'pointer' }}
//                             className={
//                               navIndex === index ? "nav-link active" : "nav-link"
//                             }
//                           >
//                             <i
//                               className={
//                                 navIndex === index
//                                   ? `${it.icon} text-primary`
//                                   : `${it.icon} text-white`
//                               }
//                             ></i>
//                             <span
//                               className={
//                                 navIndex === index
//                                   ? "nav-link-text text-primary mt-2 ml-2"
//                                   : "nav-link-text text-white mt-2 ml-2"
//                               }
//                             >
//                               {/* ESSL Config */}
//                               {it.name}
//                             </span>
//                           </a>
//                         </li>}
//                       </>
//                     );
//                   })
//                   :
//                   userDetails.is_branch_admin ?
//                     NAV_ITEM && NAV_ITEM.map((it, index) => {
//                       return (
//                         <>
//                           {it.name !== 'Location Portfolio' && <li
//                             className="nav-item"
//                             onClick={() => {
//                               currentNav(it, index)
//                             }}
//                           >
//                             <a
//                               key={index}
//                               style={{ cursor: 'pointer' }}
//                               className={
//                                 navIndex === index ? "nav-link active" : "nav-link"
//                               }
//                             >
//                               <i
//                                 className={
//                                   navIndex === index
//                                     ? `${it.icon} text-primary`
//                                     : `${it.icon} text-white`
//                                 }
//                               ></i>
//                               <span
//                                 className={
//                                   navIndex === index
//                                     ? "nav-link-text text-primary mt-2 ml-2"
//                                     : "nav-link-text text-white mt-2 ml-2"
//                                 }
//                               >
//                                 {/* ESSL Config */}
//                                 {it.name}
//                               </span>
//                             </a>
//                           </li>}
//                         </>
//                       );
//                     }) : ""
//               }
//             </ul>
//           </div>
//           <small className={"text-white text-version"}>Version: 1.30</small>
//         </div>
//       </div>

//       {/* <small
//         className={
//           "bottom-0  text-white text-version text-center"
//         }
//       >
//         Version: 0.3.2
//       </small> */}
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { CHILD_PATH, NAV_ITEM, useNav } from "@utils";


import {
  Collapse,
  NavbarBrand,
  Navbar as SideNav,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

import { SidebarProps } from './interface';
import { Icons } from "@assets";

function Navbar({
  routes = NAV_ITEM,
  logo = {
    innerLink: '/',
    imgSrc: Icons.LogoSmall,
    imgAlt: '...',
    text: '',
  },
  rtlActive = false
 }: SidebarProps) {

  console.log("o=============>", NAV_ITEM)
  const [sideNavOpen, setSideNavOpen] = React.useState(true);
  const [state, setState] = React.useState<any>({});
  const location = useLocation();

  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);

  const toggleSideNav = () => {

    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    }
    else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSideNavOpen(!sideNavOpen);
  };


  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };

  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes: any) => {
    let initialState = {};
    routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };


  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSideNav = () => {
    if (window.innerWidth < 1200) {
      if (toggleSideNav) {
        toggleSideNav();
      }
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st: any = {};
        st[prop["state"] as keyof typeof st] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <span className="nav-link-text text-white">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            className=""
            onClick={closeSideNav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">{prop.name}</span>
              </>
            ) : prop.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className="sidenav-normal"> {prop.name} </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const scrollBarInner = (
    <div className="scrollbar-inner  overflow-auto scroll-hidden">
      <div className="sidenav-header d-flex align-items-center">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        <div className="ml-auto">
          <div
            className={classnames("sidenav-toggler d-none d-xl-block", {
              active: sideNavOpen,
            })}
            onClick={toggleSideNav}
          >
            <div className="sidenav-toggler-inner ">
              <i className="sidenav-toggler-line text-white" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </div>
    </div>
  );

  return (
    <SideNav
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-primary " +
        (rtlActive ? "" : "fixed-left overflow-hidden")
      }
      onMouseEnter={onMouseEnterSideNav}
      onMouseLeave={onMouseLeaveSideNav}
    >
      {navigator.platform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </SideNav>
  );
}
export default Navbar;
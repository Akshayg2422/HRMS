

import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { currentNavIndex } from "../../../../store/app/actions";
import { Container } from "@components";

function Navbar({
  toggleSideNav,
  routes,
  logo,
  rtlActive = false,
  sideNavOpen
}: SidebarProps) {

  const [state, setState] = React.useState<any>({});
  const location = useLocation();
  const navigate = useNav();
  const dispatch = useDispatch();
  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );


  const { navIndex } = useSelector(
    (state: any) => state.AppReducer
  );
  const pathname = window.location.pathname

  useEffect(() => {
    dynamicActiveNav()
  }, [pathname])


  const dynamicActiveNav = () => {
    NAV_ITEM.filter((el: any, index: number) => {
      console.log("pathname", el.path)
      if (pathname === el.path && pathname !== "/approvals") {
        dispatch(currentNavIndex(el.path));
      }
      else {
        el?.views?.forEach((it: any, index: number) => {
          if (it.path === pathname && pathname !== "/approvals") {
            dispatch(currentNavIndex(it.path))
          }
          else {
            childNav()

          }
        })
      }
    })
  }

  const childNav = () => {
    CHILD_PATH.filter((el: any) => {
      if (pathname === el.path) {
        NAV_ITEM.filter((element: any, index: number) => {
          if (el.parent === element.path) {
            dispatch(currentNavIndex(el.parent));
          }
        })
      }
    })
  }

  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);

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
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className="ml-2 pointer"
              onClick={(e: any) => {
                e.preventDefault();
                setState(st);
                prop.name !== 'Approvals' && dispatch(currentNavIndex(prop.path));
              }}
            >
              {prop.icon ? (
                <>
                  <i className={`  ${prop.icon}  ${prop.path === navIndex ? "" : ''}`} />
                  <span className={`  ${prop.path === navIndex ? "" : ''}`}>{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className={`sidenav-mini-icon ${prop.path === navIndex ? "sass-active-text" : 'sass-link-text'}`}> {prop.miniName} </span>
                  <span className={`sidenav-normal ${prop.path === navIndex ? "sass-active-text" : 'sass-link-text'}`}> {prop.name} </span>
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
        <NavItem className={` ${prop.path === navIndex ? "sass-nav-active" : 'sass-nav'}`} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            className=""
            onClick={
              () => {
                closeSideNav()
                dispatch(currentNavIndex(prop.path))
              }
            }
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={`${prop.icon}  ${prop.path === navIndex ? "text-primary" : 'text-white'}`} />
                <span className={`  ${prop.path === navIndex ? "sass-active-text" : 'sass-link-text'}`}>{prop.name}</span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem >
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
              <i className="sidenav-toggler-line " />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            {createLinks(routes)}
            <small className={"text-white text-version"}>Version: 1.30</small>
          </Nav>
        </Collapse>
      </div>
    </div>
  );

  return (
    <SideNav
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-primary overflow-auto scroll-hidden " +
        (rtlActive ? "" : "fixed-left overflow-auto scroll-hidden")
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
export { Navbar };

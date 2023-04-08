import React, { useEffect, useState } from "react";
import { CHILD_PATH, NAV_ITEM, useNav } from "@utils";
import { Icons } from "@assets";
import { ImageView } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { currentNavIndex } from "../../../../store/app/actions";
import { log } from "console";
// import { matchRouteName } from "../../../../store/dashboard/actions";

type NavItemProps = {
  id: string;
  name: string;
  value: string;
  icon: any;
};

const Navbar = ({ }) => {
  const navigate = useNav();
  const dispatch = useDispatch();


  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );

  const { navIndex } = useSelector((state: any) => state.AppReducer);
  const pathname = window.location.pathname


  const currentNav = (it: any, index: any) => {
    navigate(it.route);
    dynamicActiveNav()
  };

  useEffect(() => {
    dynamicActiveNav()
  }, [pathname])


  const dynamicActiveNav = () => {
    NAV_ITEM.filter((el: any, index: number) => {
      if (pathname === el.route) {
        dispatch(currentNavIndex(index));
      } else {
        childNav()
      }
    })
  }


  const childNav = () => {
    CHILD_PATH.filter((el: any) => {
      if (pathname === el.path) {
        NAV_ITEM.filter((element: any, index: number) => {
          if (el.parent === element.route) {
            dispatch(currentNavIndex(index));
          }
        })
      }
    })
  }

  return (
    <nav
      className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs bg-primary"
      id="sidenav-main"
    >
      <div className="scrollbar-inner">
        <div className="sidenav-header  align-items-center">
          <a className="navbar-brand">
            <ImageView icon={Icons.LogoSmall} />
          </a>
          <div className=" ml-auto">
            <div
              className="sidenav-toggler d-none d-sm-block"
              data-action="sidenav-unpin"
              data-target="#sidenav-main"
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner mt-5">
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            <ul className="navbar-nav">

              {
                userDetails.is_admin ?
                  NAV_ITEM.map((it, index) => {
                    return (
                      <>
                        {<li
                          className="nav-item"
                          onClick={() => {
                            currentNav(it, index)
                          }}
                        >
                          <a
                            key={index}
                            style={{ cursor: 'pointer' }}
                            className={
                              navIndex === index ? "nav-link active" : "nav-link"
                            }
                          >
                            <i
                              className={
                                navIndex === index
                                  ? `${it.icon} text-primary`
                                  : `${it.icon} text-white`
                              }
                            ></i>
                            <span
                              className={
                                navIndex === index
                                  ? "nav-link-text text-primary mt-2 ml-2"
                                  : "nav-link-text text-white mt-2 ml-2"
                              }
                            >
                              {/* ESSL Config */}
                              {it.name}
                            </span>
                          </a>
                        </li>}
                      </>
                    );
                  })
                  :
                  userDetails.is_branch_admin ?
                    NAV_ITEM && NAV_ITEM.map((it, index) => {
                      return (
                        <>
                          {it.name !== 'Location Portfolio' && <li
                            className="nav-item"
                            onClick={() => {
                              currentNav(it, index)
                            }}
                          >
                            <a
                              key={index}
                              style={{ cursor: 'pointer' }}
                              className={
                                navIndex === index ? "nav-link active" : "nav-link"
                              }
                            >
                              <i
                                className={
                                  navIndex === index
                                    ? `${it.icon} text-primary`
                                    : `${it.icon} text-white`
                                }
                              ></i>
                              <span
                                className={
                                  navIndex === index
                                    ? "nav-link-text text-primary mt-2 ml-2"
                                    : "nav-link-text text-white mt-2 ml-2"
                                }
                              >
                                {/* ESSL Config */}
                                {it.name}
                              </span>
                            </a>
                          </li>}
                        </>
                      );
                    }) : ""
              }
            </ul>
          </div>
          <small className={"text-white text-version"}>Version: 1.27</small>
        </div>
      </div>

      {/* <small
        className={
          "bottom-0  text-white text-version text-center"
        }
      >
        Version: 0.3.2
      </small> */}
    </nav>
  );
};

export default Navbar;

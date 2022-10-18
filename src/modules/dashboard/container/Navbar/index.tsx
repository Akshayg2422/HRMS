import React, { useState } from "react";
import { NAV_ITEM, useNav } from "@utils";
import { Icons } from "@assets";
import { ImageView } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { currentNavIndex } from "../../../../store/app/actions";
import { matchRouteName } from "../../../../store/dashboard/actions";

type NavItemProps = {
  id: string;
  name: string;
  value: string;
  icon: any;
};

const Navbar = ({}) => {
  const navigate = useNav();
  const dispatch = useDispatch();

  const { navIndex } = useSelector((state: any) => state.AppReducer);

  const currentNav = (it: any, index: any) => {
    dispatch(currentNavIndex(index));
    navigate(it.route);
    dispatch(matchRouteName(it.id))
  };

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
              {NAV_ITEM.map((it: any, index: number) => {
                return (
                  <li
                    className="nav-item"
                    onClick={() => currentNav(it, index)}
                  >
                    <a
                      key={index}
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
                        {it.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <small className={"text-white text-version"}>Version: 0.3.2</small>
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

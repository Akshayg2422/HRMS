import React, { useEffect, useState } from "react";
import { goTo, HEADER_MENU, ROUTE, useNav } from "@utils";
import { availableLanguages } from "../../../../i18n";
import { useTranslation } from "react-i18next";
import { Icon, ImageView, Modal } from "@components";
import { useSelector } from "react-redux";
import { getImageUri } from "@utils";
import { Icons } from "@assets";

const Header = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const navigation = useNav();

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log(JSON.stringify(dashboardDetails) + "========");

  const DropdownHandler = (item: any) => {
    if (item.value === "CL") {
      setLanguageDropdown(true);
    }
    if (item.value === "PF") {
      console.log("profile");
      goTo(navigation, ROUTE.ROUTE_PROFILE);
    }
  };

  const ChangeLanguage = (item: string) => {
    i18n.changeLanguage(item);
    setLanguageDropdown(false);
  };

  return (
    <>
      <nav className="navbar navbar-top navbar-expand   bg-primary border-bottom">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="nav-item d-xl-none">
              <div
                className="pr-3 sidenav-toggler sidenav-toggler-dark"
                data-action="sidenav-pin"
                data-target="#sidenav-main"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </div>
            </a>
            <h6 className="h2 text-white d-inline-block mb-0">{"Dashboard"}</h6>
            <ul className="navbar-nav align-items-center  ml-md-auto ">
              <div className="media-body  d-none d-lg-block">
                {dashboardDetails && dashboardDetails.user_details && (
                  <span className="mb-0 text-white  font-weight-bold">
                    {dashboardDetails.user_details.name}
                  </span>
                )}
              </div>
            </ul>
            <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
              <li className="nav-item dropdown ">
                <a
                  className="nav-link pr-0"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <ImageView
                      height={'38'}
                        alt="Image placeholder"
                        icon={ dashboardDetails && dashboardDetails.user_details.profile_photo ?  getImageUri(dashboardDetails.user_details.profile_photo): Icons.ProfilePlaceHolder}
                      />
                    </span>
                    <div className="media-body  ml-2 text-white d-none d-lg-block dropdown-toggle"></div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  {HEADER_MENU.map((item) => {
                    return (
                      <a
                        className="dropdown-item"
                        onClick={() => DropdownHandler(item)}
                      >
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {languageDropdown ? (
        <Modal
          title={"Choose Language"}
          toggle={() => setLanguageDropdown(false)}
          children={availableLanguages.map((item) => {
            return (
              <a className="dropdown-item" onClick={() => ChangeLanguage(item)}>
                <span>{item}</span>
              </a>
            );
          })}
          showModel={languageDropdown}
        />
      ) : null}
    </>
  );
};
export default Header;

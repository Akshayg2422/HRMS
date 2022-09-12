import React, { useEffect, useState } from "react";
import { goTo, HEADER_MENU, ROUTE, useNav } from "@utils";
import { availableLanguages } from "../../../../i18n";
import { useTranslation } from "react-i18next";
import { Modal } from "@components";
import { useSelector } from "react-redux";
import { getImageUri } from "@utils";

const notification_Data = [
  {
    id: 1,
    username: "snow",
    received_Time: "2 hrs ago",
    message: "Let's meet at Starbucks at 11:30. Wdyt?",
  },
  {
    id: 2,
    username: "puma",
    received_Time: "1 hrs ago",
    message: "hi",
  },
  {
    id: 3,
    username: "jhon",
    received_Time: "1 hrs ago",
    message: "lets Meet?",
  },
];

const Header = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [arr, setArr] = useState<any>("");
  const { t, i18n } = useTranslation();
  const navigation = useNav();

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    if (dashboardDetails && dashboardDetails.details.user_details) {
      //  details = dashboardDetails.details.user_details;
      setArr(dashboardDetails.details.user_details);
    }
  }, []);

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
      <nav className="navbar navbar-top navbar-expand bg-dark bg-default border-bottom">
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
            <h6 className="h2 text-white d-inline-block mb-0">
              {window.location.pathname === "/report"
                ? "Log Report"
                : window.location.pathname === "/employee"
                ? "Employee Portfolio"
                : "Dashboard"}
            </h6>
            <ul className="navbar-nav align-items-center  ml-md-auto ">
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ni ni-bell-55 text-white"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
                  <div className="px-3 py-3">
                    <h6 className="text-sm text-muted m-0">
                      You have{" "}
                      <strong className="text-primary">
                        {notification_Data.length}
                      </strong>{" "}
                      notifications.
                    </h6>
                  </div>

                  <div className="list-group list-group-flush">
                    {notification_Data.map((item) => {
                      return (
                        <a
                          href="#!"
                          className="list-group-item list-group-item-action"
                        >
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="../assets-old/img/theme/team-1.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm ">
                                    {item.username}
                                  </h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>{item.received_Time}</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">{item.message}</p>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <a
                    href="#!"
                    className="dropdown-item text-center text-primary font-weight-bold py-3"
                  >
                    View all
                  </a>
                </div>
              </li>
              <div className="media-body  d-none d-lg-block">
                <span className="mb-0 text-white  font-weight-bold">
                  {arr?.name}
                  {/* {"puma"} */}
                </span>
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
                      <img
                        alt="Image placeholder"
                        src={getImageUri(arr?.profile_photo)}
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
                  {/* <div className="dropdown-divider"></div>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-user-run"></i>
                    <span>Logout</span>
                  </a> */}
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

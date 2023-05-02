import React, { useEffect, useState } from 'react';
import { goTo, HEADER_MENU, ROUTE, useNav, LANGUAGE_LIST, NAV_ITEM, CHILD_PATH, showToast, goBack, COMMON_HEADER } from '@utils';
import { useTranslation } from 'react-i18next';
import { ImageView, Modal, Container, BackArrow, Secondary, Primary, Divider, MyActiveBranches } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { getImageUri } from '@utils';
import { Icons } from '@assets';
import classnames from "classnames";



import { resetApp } from '../../../../store/app/actions';
import { resetAuth } from '../../../../store/auth/actions';
import { resetDashboard } from '../../../../store/dashboard/actions';
import { resetEmployee } from '../../../../store/employee/actions';
import { resetLocation } from '../../../../store/location/actions';
import { availableLanguages } from '../../../../i18n';
import { resetShiftManagement } from '../../../../store/shiftManagement/actions';
import { Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Media, Nav, NavItem, Navbar, NavbarBrand, Row, UncontrolledCollapse, UncontrolledDropdown, Form, UncontrolledTooltip } from 'reactstrap';
import { HeaderProps } from './interfaces';
import { clearNotificationCount, setIsShowBack } from '../../../../store/notifications/actions';

//ROUTE_PORTFOLIO

const Header = ({ headerNavOpen, toggleHeaderNav }: HeaderProps) => {
  const [languageModel, setLanguageModel] = useState(false);
  const [model, setModel] = useState(false);
  const [activeBranchModel, setActiveBranchModel] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('')
  const { t, i18n } = useTranslation();
  const navigate = useNav();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isParent, setIsParent] = useState(false)
  const [showArrow, setShowArrow] = useState(false)
  const [commonChild, setCommonChild] = useState(false)


  let dispatch = useDispatch();

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { NotificationCount } = useSelector(
    (state: any) => state.NotificationReducer
  );

  const pathname = window.location.pathname


  useEffect(() => {
    dynamicHeaderTitle()
  }, [pathname])



  const dynamicHeaderTitle = () => {
    NAV_ITEM.filter((el: any) => {
      if (pathname === el.path) {
        setHeaderTitle(el.name)
        setShowArrow(false)
        setIsParent(false)
      } else {
        dynamicChildHeader()
      }
    })
  }

  const dynamicChildHeader = () => {
    CHILD_PATH.filter((el: any) => {
      if (pathname === el.path) {
        NAV_ITEM.filter((element: any) => {
          if (el.parent === element.path) {
            setHeaderTitle(element.name)
            setShowArrow(el.showBack)
            setIsParent(el.showBreadCrums)
          } else {
            CHILD_PATH.filter((item: any) => {
              if (el.parent === item.path) {
                COMMON_HEADER.filter((child: any) => {
                  if (child.route === item.path) {
                    setHeaderTitle(child.name)
                    setShowArrow(el.showBack)
                    setIsParent(el.showBreadCrums)
                  }
                })
              }
            })
          }
        })
      }
    })
  }


  const getNameFromPath = (pathname: string) => {
    let name = ''
    CHILD_PATH.filter((el: any) => {
      if (pathname === el.path) {
        name = el.name
      }
    })
    return name
  }


  const DropdownHandler = (item: any) => {
    if (item.value === 'CL') {
      setLanguageModel(!model);
    }
    else if (item.value === 'PF') {
      goTo(navigate, ROUTE.ROUTE_PROFILE);
    }
    else if (item.value === 'LG') {
      setModel(!model)
    }
    else if (item.value === 'MP') {
      goTo(navigate, ROUTE.ROUTE_PORTFOLIO);
    } else if (item.value === 'MA') {
      setActiveBranchModel(!activeBranchModel)
    }

  };

  function proceedLogout() {
    try {
      localStorage.clear();
      dispatch(resetApp())
      dispatch(resetAuth())
      dispatch(resetDashboard())
      dispatch(resetEmployee())
      dispatch(resetLocation())
      dispatch(resetShiftManagement())
      goTo(navigate, ROUTE.ROUTE_LOGIN, true)
    } catch (error) {
    }
  }

  const changeLanguageHandler = (key: string) => {
    setSelectedLanguage(key)
    i18n.changeLanguage(key);
    setLanguageModel(!languageModel)
    try {
      window.location.reload();
    } catch (e) {
      // window.location.reload();
    }
  };

  const checkLength = (data: any) => {

    if (data.length < 100) {
      return data.length
    }
    else {
      return '99+'
    }
  }


  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand"
        )}
        style={{ background: '#f8f9ff' }}
      >
        <Container additionClass='container-fluid'>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    // { active: headerNavOpen },
                  )}
                  onClick={toggleHeaderNav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line bg-primary" />
                    <i className="sidenav-toggler-line bg-primary" />
                    <i className="sidenav-toggler-line bg-primary" /> 
                  </div>
                </div>
              </NavItem>
            </Nav>
            {showArrow && <BackArrow additionClass={`mr--1 ${isParent && 'mt-xl--3 '}`} />}
            <div className='col'>
              <h6 className='h2 text-primary d-inline-block mb-0'>{headerTitle}</h6>
              {isParent && <div className='small d-none d-sm-block'>
                <span style={{ cursor: "pointer" }} onClick={() => { goBack(navigate) }}>{headerTitle} </span>
                <span> {" / "} {getNameFromPath(pathname)}</span>
              </div>
              }
            </div>
            <ul className='navbar-nav align-items-center  ml-md-auto '>
              {/* <Notification /> */}
              <div className='mr-3 d-flex'>
                <a className="nav-link" onClick={() => {
                  goTo(navigate, ROUTE.ROUTE_MY_NOTIFICATION);
                }} >
                  <i className="ni ni-chat-round text-primary  " style={{ cursor: 'pointer' }}></i>
                </a>
                <a className="nav-link" onClick={() => {
                  goTo(navigate, ROUTE.ROUTE_NOTIFICATIONS);
                  dispatch(setIsShowBack(true))
                }} >
                  <i className="ni ni-bell-55 text-primary" style={{ cursor: 'pointer' }} onClick={() => dispatch(clearNotificationCount())}></i>
                  {NotificationCount > 0 && <span style={{ cursor: 'pointer' }} className="badge badge-sm badge-circle badge-floating badge-danger border-white top-0 mt-1 start-100 translate-middle p--2" >{checkLength(NotificationCount)}</span>}
                </a>
              </div>
              <div className='media-body  d-none d-lg-block'>
                {dashboardDetails && dashboardDetails.user_details && (
                  <span className='mb-0 text-primary  font-weight-bold'>
                    {dashboardDetails.user_details.name}
                  </span>
                )}
              </div>
            </ul>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <ImageView
                        height={'38'}
                        alt='Image placeholder'
                        icon={dashboardDetails && dashboardDetails.user_details.profile_photo ? getImageUri(dashboardDetails.user_details.profile_photo) : Icons.ProfilePlaceHolder}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <div className='media-body text-primary d-none d-lg-block dropdown-toggle'> </div>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  {HEADER_MENU.map((item) => {
                    return (
                      <DropdownItem
                        onClick={(e) => {
                          e.preventDefault()
                          DropdownHandler(item)
                        }}
                      >
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        title={'Select Language'}
        toggle={() => setLanguageModel(!languageModel)}
        showModel={languageModel}>
        {availableLanguages.map((item, index) => {
          return (
            <>
              <div className='row align-items-center px-lg-4' onClick={() => changeLanguageHandler(item)}>
                <div className='col'>
                  <span>{LANGUAGE_LIST[index].language}</span><br></br>
                  {LANGUAGE_LIST[index].subtitle && <small>{LANGUAGE_LIST[index].subtitle}</small>}
                </div>
                <div className='col text-right'>
                  {selectedLanguage === LANGUAGE_LIST[index].key && <ImageView icon={Icons.TickActive} />}
                </div>
              </div>
              {index !== availableLanguages.length - 1 && <Divider />}
            </>
          );
        })}
      </Modal>
      {
        <Modal
          title={t('logoutUser')}
          showModel={model}
          toggle={() => setModel(!model)}>
          <Container>
            <span className='ml-3'>{t('logoutMessage')}</span>
            <Container
              margin={'m-3'}
              justifyContent={'justify-content-end'}
              display={'d-flex'}>
              <Secondary
                text={t('cancel')}
                onClick={() => setModel(!model)}
              />
              <Primary
                text={t('proceed')}
                onClick={proceedLogout}
              />
            </Container>
          </Container>
        </Modal>
      }

      <Modal
        title={t('MyActiveBranches')}
        showModel={activeBranchModel}
        toggle={() => setActiveBranchModel(!activeBranchModel)}>
        <Container additionClass='col-xl-5'>
          <MyActiveBranches isReload={activeBranchModel === true ? true : false} />
        </Container>
        <Container
          margin={'m-3'}
          justifyContent={'justify-content-end'}
          display={'d-flex'}>
          <Secondary
            text={t('cancel')}
            onClick={() => setActiveBranchModel(!activeBranchModel)}
          />
          {/* <Primary
            text={t('proceed')}
          // onClick={proceedLogout}
          /> */}
        </Container>
      </Modal>
    </>
  );
};
export default Header;

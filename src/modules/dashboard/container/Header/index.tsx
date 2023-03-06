import React, { useEffect, useState } from 'react';
import { goTo, HEADER_MENU, ROUTE, useNav, LANGUAGE_LIST, NAV_ITEM, CHILD_PATH } from '@utils';
import { useTranslation } from 'react-i18next';
import { ImageView, Modal, Container, Secondary, Primary, Divider, } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { getImageUri } from '@utils';
import { Icons } from '@assets';


import { resetApp } from '../../../../store/app/actions';
import { resetAuth } from '../../../../store/auth/actions';
import { resetDashboard } from '../../../../store/dashboard/actions';
import { resetEmployee } from '../../../../store/employee/actions';
import { resetLocation } from '../../../../store/location/actions';
import { availableLanguages } from '../../../../i18n';
import { resetShiftManagement } from '../../../../store/shiftManagement/actions';
import { Notification } from '../Notification';

const Header = () => {
  const [languageModel, setLanguageModel] = useState(false);
  const [model, setModel] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('')
  const { t, i18n } = useTranslation();
  const navigate = useNav();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);



  let dispatch = useDispatch();

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const pathname = window.location.pathname


  useEffect(() => {
    dynamicHeaderTitle()
  }, [pathname])


  const dynamicHeaderTitle = () => {
    NAV_ITEM.filter((el: any) => {
      if (pathname === el.route) {
        setHeaderTitle(el.name)
      } else {
        dynamicChildHeader()
      }
    })
  }

  const dynamicChildHeader = () => {
    CHILD_PATH.filter((el: any) => {
      if (pathname === el.path) {
        NAV_ITEM.filter((element: any) => {
          if (el.parent === element.route) {
            setHeaderTitle(element.name)
          }
        })
      }
    })
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
    i18n.changeLanguage(key);
    setLanguageModel(!languageModel)
    try {
      window.location.reload();

    } catch (e) {

    }
  };


  return (
    <>
      <nav className='navbar navbar-top navbar-expand  bg-primary '>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <a className='nav-item d-xl-none'>
              <div
                className='pr-3 sidenav-toggler sidenav-toggler-dark'
                data-action='sidenav-pin'
                data-target='#sidenav-main'
              >
                <div className='sidenav-toggler-inner'>
                  <i className='sidenav-toggler-line'></i>
                  <i className='sidenav-toggler-line'></i>
                  <i className='sidenav-toggler-line'></i>
                </div>
              </div>
            </a>
            <h6 className='h2 text-white d-inline-block mb-0'>{headerTitle}</h6>
            <ul className='navbar-nav align-items-center  ml-md-auto '>
              {/* <Notification /> */}
              <div className='media-body  d-none d-lg-block'>
                {dashboardDetails && dashboardDetails.user_details && (
                  <span className='mb-0 text-white  font-weight-bold'>
                    {dashboardDetails.user_details.name}
                  </span>
                )}
              </div>
            </ul>
            <ul className='navbar-nav align-items-center  ml-auto ml-md-0 '>
              <li className='nav-item dropdown '>
                <a
                  className='nav-link pr-0'
                  href='#'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <div className='media align-items-center'>
                    <span className='avatar avatar-sm rounded-circle'>
                      <ImageView
                        height={'38'}
                        alt='Image placeholder'
                        icon={dashboardDetails && dashboardDetails.user_details.profile_photo ? getImageUri(dashboardDetails.user_details.profile_photo) : Icons.ProfilePlaceHolder}
                      />
                    </span>
                    <div className='media-body  ml-2 text-white d-none d-lg-block dropdown-toggle'></div>
                  </div>
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                  {HEADER_MENU.map((item) => {
                    return (
                      <a
                        className='dropdown-item'
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

      <Modal
        title={'Choose Language'}
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
    </>
  );
};
export default Header;

import {
  Container,
  Event,
  CardTable,
  CardCalendar,
  LineCharts,
  Primary,
} from "@components";
import React, { useEffect } from "react";

import { fetchDashboardDetails, Navbar, Header, DashBoardCard } from "@modules";
import { useDashboard } from "@contexts";
import { goTo, ROUTE, useNav } from "@utils";
import { useDispatch } from "react-redux";
import { getDashboard, setBranchHierarchical } from "../../../../store/dashboard/actions";
import { useSelector } from "react-redux"; import { useTranslation } from "react-i18next";


import {
  getListAllBranchesList,
} from '../../../../store/location/actions';

import { LocationProps } from '../../../../components/Interface';
import { currentNavIndex } from "../../../../store/app/actions";
import { getAdminBranches } from "../../../../store/employee/actions";
import { postAppConfig, webPushRegister } from "../../../../store/auth/actions";


function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch()


  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { userDetails, success, mobileNumber, error } = useSelector(
    (state: any) => state.AuthReducer
  );

  const { appConfig, fcmToken } = useSelector(
    (state: any) => state.AuthReducer
  );

  // function urlBase64ToUint8Array(base64String: any) {
  //   var padding = '='.repeat((4 - base64String.length % 4) % 4)
  //   var base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/')

  //   var rawData = window.atob(base64)
  //   var outputArray = new Uint8Array(rawData.length)

  //   for (var i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i)
  //   }
  //   return outputArray;
  // }

  // function loadVersionBrowser() {
  //   if ("userAgentData" in navigator) {
  //     console.log("navigatornavigator.", navigator);

  //     // navigator.userAgentData is not available in
  //     // Firefox and Safari
  //     const uaData: any = navigator.userAgentData;
  //     // Outputs of navigator.userAgentData.brands[n].brand are e.g.
  //     // Chrome: 'Google Chrome'
  //     // Edge: 'Microsoft Edge'
  //     // Opera: 'Opera'
  //     let browsername;
  //     let browserversion;
  //     let chromeVersion = null;
  //     for (var i = 0; i < uaData.brands.length; i++) {
  //       let brand = uaData.brands[i].brand;
  //       browserversion = uaData.brands[i].version;
  //       if (brand.match(/opera|chrome|edge|safari|firefox|msie|trident/i) !== null) {
  //         // If we have a chrome match, save the match, but try to find another match
  //         // E.g. Edge can also produce a false Chrome match.
  //         if (brand.match(/chrome/i) !== null) {
  //           chromeVersion = browserversion;
  //         }
  //         // If this is not a chrome match return immediately
  //         else {
  //           browsername = brand.substr(brand.indexOf(' ') + 1);
  //           return {
  //             name: browsername,
  //             version: browserversion
  //           }
  //         }
  //       }
  //     }
  //     // No non-Chrome match was found. If we have a chrome match, return it.
  //     if (chromeVersion !== null) {
  //       return {
  //         name: "chrome",
  //         version: chromeVersion
  //       }
  //     }
  //   }
  //   // If no userAgentData is not present, or if no match via userAgentData was found,
  //   // try to extract the browser name and version from userAgent
  //   const userAgent = navigator.userAgent;
  //   var ua = userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  //   if (/trident/i.test(M[1])) {
  //     tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
  //     return { name: 'IE', version: (tem[1] || '') };
  //   }
  //   if (M[1] === 'Chrome') {
  //     tem = ua.match(/\bOPR\/(\d+)/);
  //     if (tem != null) {
  //       return { name: 'Opera', version: tem[1] };
  //     }
  //   }
  //   M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  //   if ((tem = ua.match(/version\/(\d+)/i)) != null) {
  //     M.splice(1, 1, tem[1]);
  //   }
  //   return {
  //     name: M[0],
  //     version: M[1]
  //   };
  // };

  // const applicationServerKey = "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk"

  // if ('serviceWorker' in navigator) {
  //   var browser = loadVersionBrowser();
  //   console.log("browser", browser);


  //   navigator.serviceWorker.register('/public/firebase-messaging-sw.js').then(function (reg) {
  //     console.log("reggggg=====>",reg);
      
  //     reg.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
  //     }).then(function (sub) {
  //       console.log("subbb---->", sub);

  //       var endpointParts = sub.endpoint.split('/');
  //       var registration_id = endpointParts[endpointParts.length - 1];
  //       var data = {
  //         'browser': browser.name.toUpperCase(),
  //         // 'p256dh': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
  //         // 'auth': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))),
  //         'name': 'XXXXX',
  //         'registration_id': registration_id
  //       };
  //       console.log("data====>",data);
        
  //       // requestPOSTToServer(data);
  //     })
  //   }).catch(function (err) {
  //     console.log(':^(', err);
  //   });
  // }

  const register = () => {
    const params = {
      "name": appConfig?.model,
      "registration_id": "",
      "active": true,
      "p256dh": "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk",
      "auth": "",
      "browser": 'CHROME',
      "application_id": "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk"
    }
    dispatch(webPushRegister({
      params,
      onSuccess: (response: any) => {
        console.log("response---->", response);

      },
      onError: () => {
      },
    }))
  }


  useEffect(() => {
    getPostAppConfig()
    // register()
    // loadVersionBrowser()
  }, [fcmToken])

  useEffect(() => {
    dispatch(currentNavIndex(0))
    dispatch(getDashboard({}))
  }, []);




  const getPostAppConfig = () => {
    const params = {
      device_model: appConfig?.model,
      device_platform: appConfig?.platform,
      device_brand: appConfig?.brand,
      device_token: fcmToken
    }
    console.log('params------------->', params);
    dispatch(postAppConfig({ params }))
  }


  const getAllSubBranches = (branchList: any, parent_id: string) => {
    let branchListFiltered: any = [];
    const getChild = (branchList: any, parent_id: string) => {
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChild(branchList, it2.id);
          return it2;
        });
    };
    getChild(branchList, parent_id);

    branchListFiltered = branchListFiltered.map((it: any) => {
      return it.id;
    });
    return branchListFiltered;
  };


  useEffect(() => {
    if (dashboardDetails) {
      const params = {}
      dispatch(getListAllBranchesList({
        params,
        onSuccess: (response: Array<LocationProps>) => {
          const childIds = getAllSubBranches(response, dashboardDetails.company_branch.id)
          dispatch(setBranchHierarchical({ ids: { branch_id: dashboardDetails.company_branch.id, child_ids: childIds, include_child: false }, name: dashboardDetails.company_branch.name }))
        },
        onError: () => {
        },
      }))
    }

  }, []);

  return (
    <>
      <div className='my-5'>
        <DashBoardCard />
      </div>
    </>
  );
}

export default Dashboard;

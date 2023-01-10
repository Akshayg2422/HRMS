import { resetApp } from "../../../../store/app/actions";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../../../../store/auth/actions";
import { resetDashboard } from "../../../../store/dashboard/actions";
import { resetEmployee } from "../../../../store/employee/actions";
import { resetLocation } from "../../../../store/location/actions";
import { goTo, ROUTE, useNav } from "@utils";
import { resetShiftManagement } from "../../../../store/shiftManagement/actions";

const AutoLogout = () => {
  const [signoutTime, setSignoutTime] = useState(300000);
  let logoutTimeout: string | number | NodeJS.Timeout | undefined;
  let dispatch = useDispatch();
  const navigate = useNav();
  const { userLoggedIn } = useSelector(
    (state: any) => state.AppReducer
  );
  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];
  const logout = () => {
    // console.log("You have been loged out");
    localStorage.clear();
    dispatch(resetApp());
    dispatch(resetAuth());
    dispatch(resetDashboard());
    dispatch(resetEmployee());
    dispatch(resetLocation());
    dispatch(resetShiftManagement())
    goTo(navigate, ROUTE.ROUTE_LOGIN, true);
  };

  const setTimeouts = () => {
    logoutTimeout = setTimeout(logout, signoutTime);
  };

  const clearTimeouts = () => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  const resetTimeout = () => {
    clearTimeouts();
    setTimeouts();
  };


  useEffect(() => {
    if (userLoggedIn) {
      for (let i in events) {
        window.addEventListener(events[i], resetTimeout);
      }
      setTimeouts();
    }
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    };

  }, [userLoggedIn]);

  // window.onbeforeunload = () => {
  //   logout()
  // }

  return <div></div>;
};
export default AutoLogout;

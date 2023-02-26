import React, { useEffect } from 'react'
import { messaging } from '../../container'
import { getToken } from "firebase/messaging"
import { useDispatch } from 'react-redux'
import { getFcmToken } from '../../../../store/auth/actions'

const Requestpermission = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    pushNotification()
  }, [])

  const pushNotification = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      console.log("Allow Notifications")
      await getToken(messaging, { vapidKey: "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk" })
        .then((currentToken: any) => {
          if (currentToken) {
            dispatch(getFcmToken(currentToken))
          }
          else {
            console.log("")
          }
        }).catch((err: any) => { console.log("err", err) })
    }
    else if (permission === "denied") {
      console.log("Denied Notifications")
    }

  }


  return (
    <div></div>
  )
}

export default Requestpermission;

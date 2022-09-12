import React, {ReactNode, useEffect} from 'react'
import {useAuth} from '@contexts'
import LoadingOverlay from 'react-loading-overlay';



function AppLoader() {

  const {showLoader} = useAuth();

  useEffect(() => {
    console.log(showLoader + "========");
  }, [])

  return (
    <LoadingOverlay
      active={showLoader}
      spinner />
  )
}

export default AppLoader


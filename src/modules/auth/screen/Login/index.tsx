import React from 'react'
import { WelcomeBoard, Container } from '@components'
import { Login } from '../../container'
import { PushNotification } from '../../../../PushNotification'
import { DeviceInfo } from '@modules'

function Welcome() {



  return (
    <Container flexDirection={'row'} height={'vh-100'}  >
      <WelcomeBoard />
      <Login />
      <PushNotification />
      <DeviceInfo />
    </Container>
  )
}

export default Welcome
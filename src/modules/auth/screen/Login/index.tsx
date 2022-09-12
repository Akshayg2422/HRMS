import React from 'react'
import {WelcomeBoard, Container} from '@components'
import {Login} from '../../container'

function Welcome() {



  return (
    <Container flexDirection={'row'}  height={'vh-100'} width={'vw-100'} >
      <WelcomeBoard />
      <Login />
    </Container>
  )
}

export default Welcome
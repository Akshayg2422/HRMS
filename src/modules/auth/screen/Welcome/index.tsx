import React from 'react'
import {WelcomeBoard, Container} from '@components'
import {Landing} from '../../container'



function Welcome() {
  return (
    <Container flexDirection={'row'}  height={'vh-100'} width={'vw-100'} >
      <WelcomeBoard />
      <Landing />
    </Container>
  )
}

export default Welcome
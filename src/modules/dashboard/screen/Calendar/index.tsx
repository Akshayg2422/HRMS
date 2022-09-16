
import React from 'react'
import { Container, Calender, Card, Sort } from '@components'
import { Navbar } from '@modules'

function index() {
  return (
    <>
        <Container additionClass={'col-9 mt-5'} >
          <Card>
            <Calender />
          </Card>
        </Container>
    </>
  )

}

export default index
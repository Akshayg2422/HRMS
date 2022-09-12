
import React from 'react'
import { Container, Calender, Card, Sort } from '@components'
import { Navbar } from '@modules'

function index() {
  return (
    <>
      <Navbar />
      <div className='main-content'>
        <Container additionClass={'col-9 mt-5'} >
         
          <Card>
            <Calender />
          </Card>
        </Container>
      </div>
    </>
  )

}

export default index
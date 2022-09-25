import React from 'react'
import { Images } from '@assets';
import { WELCOME_NOTE } from '@utils'
import { Container } from '@components'




function WelcomeBoard() {
  return (

    <Container additionClass={'container-fluid'} display={'d-flex'} col={'col-xl-6'} flexDirection={'flex-column'}  justifyContent={'justify-content-center'}  padding={'p-6'}   style={{
      backgroundImage: `url(${Images.Welcome})`
    }}>

      <h1 className='display-1 text-white'>Welcome to <br></br> ZenyQ</h1>
      <span className='text-white mt-3 font-weight-medium'>{'Your logs, our responsibility'}</span>
      <ul className='ml--3 mt-4'>
        {
          WELCOME_NOTE.map(it => {
            return <li key={it.key} className={'text-white'}>
              <small className='text-white font-weight-medium'>{it.title}</small>
            </li>
          })
        }
      </ul>


    </Container >

  )
}


export default WelcomeBoard;
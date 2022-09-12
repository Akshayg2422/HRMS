import React from 'react'
import {Container, Card} from '@components'

interface EventProps {
  eventData: Array<{date: number, month: string, title: string, description: string}>;
  title?: string;

}


function index({eventData, title}: EventProps) {
  return (
    <Container>
      {title && <h5 className={'h3'}>{title}</h5>}
      {eventData.map((it) => {
        return (
          <Card>
            <Container flexDirection={'row'} alignItems={'align-items-center'} justifyContent={'justify-content-center'} >
              <Container flexDirection={'flex-column'} display={'d-flex'} additionClass={'col-auto'}>
                <span className='text-dark'>{it.date}</span>
                <span className='text-dark'>{it.month}</span>
              </Container>
              <Container additionClass={'col justify-content-center align-items-center'}>
                <p className='mb-0 fs-6'>{it.title}</p>
                <h6 className='text-light mt-0'>{it.description}</h6>
              </Container>
            </Container>
          </Card>
        );
      })}
    </Container >
  )
}

export default index
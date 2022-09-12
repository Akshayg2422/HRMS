import React from 'react'
import { Logo, Card, ImageView, Container } from '@components'
import { WELCOME_CARD, goTo, useNav } from '@utils'


function Landing() {
 const navigation = useNav()

  return (
  <>
    <Container col={'col'} display={'d-flex'} flexDirection={'flex-column'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} >
      {
        WELCOME_CARD.map(it => {
          return (
            <Card onClick={() => {
              goTo(navigation,it.goTo)
             }}>
              <Container style={{height: '100px', width: '100px'}} flexDirection={'flex-column'} display={'d-flex'} justifyContent={'justify-content-center'} alignItems={'align-items-center'}>
                <ImageView height={'60px'} width={'60px'} icon={it.icon} alt={it.title} />
                <small className='text-gray mt-2 text-center'>{it.title}</small>
              </Container>
            </Card>
          );
        })
      }

    </Container>
    </>



  )
}

export default Landing;
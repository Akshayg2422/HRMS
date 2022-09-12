import React from 'react';
import {Icons} from '@assets';
import {Card, Container, ImageView} from '@components';

const data = [
  {
    title: 'Total Employees',
    icon: Icons.TotalEmployee,
    value: 1200,
    alert: '60 for last month',
  },
  {
    title: 'Department',
    icon: Icons.Department,
    value: 16,
    alert: 'sa'
  },
  {
    title: 'Clients',
    icon: Icons.Clients,
    value: 12,
    alert: 'sa'
  },
  {
    title: 'Projects',
    icon: Icons.Projects,
    value: 16,
    alert: 'as'
  },
];

function DashBoardCard() {
  return (
    <Container flexDirection={'row'} margin={'mt-3'} >
      {data.map((it, index) => {
        return (
          <Container additionClass={'col-xl-3 col-md-6'}>
            <Card
              additionClass={'border'}
              style={{border: '1px bg-gray'}}>
              <Container additionClass={'row pt-3'} justifyContent={'justify-content-center'}>
                <Container col={'col-auto'} alignItems={'align-items-center'} >
                  <ImageView icon={it.icon} alt={it.title} height={50} width={50} />
                </Container>
                <div className='col'>
                  <h5 className='text-black mb-0 font-weight-light'>{it.title}</h5>
                  <h2 className='h2 font-weight-bold mb-0'>{it.value}</h2>
                  <Container additionClass={`rounded px-2 ${index === 0 ? 'bg-success' : 'bg-white'}`}>
                    <h5 className={`font-weight-light ${index === 0 ? 'text-gary' : 'text-white'}`}>{it.alert}</h5>
                  </Container>
                </div>
              </Container>
            </Card>
          </Container >
        );
      })}
    </Container >
  );
}

export default DashBoardCard;

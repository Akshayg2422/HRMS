import { Container, CommonTable, Modal, Divider, Primary, ImageView } from '@components';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranchesList, updateBranchLocationRadius, enableBranchRefence } from '../../../../store/location/actions';
import { goTo, useNav, ROUTE } from '@utils';
import {Icons} from '@assets'
function LocationScreen() {
  const dispatch = useDispatch();
  const navigation = useNav();

  const { brancheslist } = useSelector((state: any) => state.LocationReducer);
  const [model, setModel] = useState(false);
  const [modelData, setModelData] = useState<Location>();
  const [isRefresh, setIsRefresh] = useState(false);


  const DEFAULT_RADIUS_LIST = [30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  useEffect(() => {
    dispatch(getAllBranchesList({}));
  }, [isRefresh]);

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
      };
    });
  };

  const manageBranchesHandler = (id: string | undefined) => {
    goTo(navigation, ROUTE.ROUTE_MANAGE_BRANCHES);
  };

  function resetRadiusApi(radius : number) {
    
    const params = {id : modelData?.geo_location_id , fencing_radius: radius}

    

    console.log(JSON.stringify(params));

    dispatch(updateBranchLocationRadius({
      params,
      onSuccess: () => {
        setIsRefresh(!isRefresh)
        setModel(!model)
      },
      onError: () => {
      },
    }))

  }


  function enableReFetchApi(branchDetail : Location) {
    
    const params = {id : branchDetail?.id}
   
    dispatch(enableBranchRefence({
      params,
      onSuccess: () => {
        setIsRefresh(!isRefresh)
      },
      onError: () => {
      },
    }))

  }


  return (
    <>
      <Container>
        <Navbar />
        <div className='main-content'>
          {brancheslist && brancheslist.length > 0 && (
            <CommonTable
              tableTitle={'Branches'}
              buttonOnClock={() => manageBranchesHandler(undefined)}
              displayDataSet={normalizedEmployeeLog(brancheslist)}
              buttonText={'Add Branch'}
              tableChildren={
                <LocationTable
                  tableDataSet={brancheslist}
                  resetRadiusOnchange={(item) => {
                    setModelData(item)
                    setModel(!model)
                  }}
                  enableReFetch={enableReFetchApi}
                />}
            />
          )}
          <Modal
            title={'Select Radius'}
            showModel={model}
            toggle={() => setModel(!model)}>
            
              {DEFAULT_RADIUS_LIST.map(el => {
                return (
                  <div
                    className='row align-items-center mx-4'
                    onClick={()=>resetRadiusApi(el)}>
                    <div className='row align-items-center'>
                      <span className='col text-xl text-gray'>{el}</span>
                      {modelData && modelData?.fencing_radius === el && <div className='col-2 text-right'><ImageView icon={Icons.TickActive} /></div>}
                      <Divider />
                    </div>
                  </div>
                );
              })}
          
          </Modal>
        </div>
      </Container>
    </>
  );
}

type Location = {
  name: string;
  id: string;
  has_location: boolean;
  can_update_location: boolean;
  parent_id: string;
  fencing_radius: number;
  geo_location_id: string;
  fence_admin_id: string;
}

type LocationTableProps = {
  tableDataSet?: Array<Location>
  resetRadiusOnchange?: (item: Location) => void;
  enableReFetch?: (item: Location) => void;

}


const LocationTable = ({ tableDataSet, resetRadiusOnchange, enableReFetch }: LocationTableProps) => {
  return <div className='table-responsive'>
    <table className='table align-items-center table-flush'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>{'Name'}</th>
          <th scope='col'>{'Fencing Radius'}</th>
          <th scope='col'>{''}</th>
          <th scope='col'>{''}</th>
          <th scope='col'>{''}</th>
        </tr>

      </thead>
      <tbody>
        {
          tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: Location, index: number) => {
            return <tr className='align-items-center'>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.name}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.fencing_radius}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.has_location ? <Primary text={'Reset Radius'} size={'btn-sm'} onClick={() => { if (resetRadiusOnchange) resetRadiusOnchange(item) }} /> : <></>}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{(item.has_location && !item.can_update_location) && <Primary text={'Enable Refetch'} size={'btn-sm'} onClick={() => { if (enableReFetch) enableReFetch(item) }} />}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{<ImageView height={20} width={20} icon={item.has_location ? Icons.Location : Icons.LocationGray} />}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}

export default LocationScreen;

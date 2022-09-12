import {Container, CommonTable} from '@components'
import React,{useEffect} from 'react'
import {Navbar} from '../../container'
import { useDispatch,useSelector } from 'react-redux'
import { getAllBranchesList } from '../../../../store/location/actions'
import { goTo, useNav, ROUTE } from '@utils'
function LocationScreen() {

  const dispatch=useDispatch();
  const navigation = useNav()

  const { brancheslist } = useSelector(
    (state: any) => state.LocationReducer
  );
  useEffect(()=>{
dispatch(getAllBranchesList({}))
  },[])


  const normalizedEmployeeLog = (data: any) => {

    return data.map((el: any) => {
      return {
        id: el.id,
        name: el.name
      };
    });
  };

  const manageBranchesHandler = (id: string | undefined) => {
    // id ? dispatch(employeeEdit(id)) : dispatch(employeeEdit(undefined))
    goTo(navigation, ROUTE.ROUTE_MANAGE_BRANCHES)
  }


console.log("brancheslist",brancheslist)
  return (
    <>
    <Container>
      <Navbar />
      <div className='main-content'>
       
        {brancheslist && brancheslist.length >0 && <CommonTable tableTitle={"Branches"}  buttonOnClock={()=>manageBranchesHandler(undefined)} tableDataSet={normalizedEmployeeLog(brancheslist)} buttonText={'Add Branch'}/>}
      </div>
      </Container>
    </>
  )

}

export default LocationScreen;
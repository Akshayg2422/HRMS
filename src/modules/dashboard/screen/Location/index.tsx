import { Container, CommonTable, Modal, Divider, Primary, ImageView } from "@components";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranchesList } from "../../../../store/location/actions";
import { goTo, useNav, ROUTE } from "@utils";
import {Icons} from '@assets'
function LocationScreen() {
  const dispatch = useDispatch();
  const navigation = useNav();

  const { brancheslist } = useSelector((state: any) => state.LocationReducer);
  const [model, setModel] = useState(false);
  const [modelData, setModelData] = useState({});

  const DEFAULT_RADIUS_LIST = [30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  useEffect(() => {
    dispatch(getAllBranchesList({}));
  }, []);

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

  function resetRadiusApi(item: Location) {
    setModelData(item)
    setModel(!model)
  }


  return (
    <>
      <Container>
        <Navbar />
        <div className="main-content">
          {brancheslist && brancheslist.length > 0 && (
            <CommonTable
              tableTitle={"Branches"}
              buttonOnClock={() => manageBranchesHandler(undefined)}
              displayDataSet={normalizedEmployeeLog(brancheslist)}
              buttonText={"Add Branch"}
              tableChildren={
                <LocationTable
                  tableDataSet={brancheslist}
                  resetRadiusOnchange={(item) => resetRadiusApi(item) }
                />}
            />
          )}
          <Modal
            title={"Select Radius"}
            showModel={model}
            toggle={() => setModel(!model)}>
            <Container>
              {DEFAULT_RADIUS_LIST.map((el: any) => {
                return (
                  <div
                    className="row align-items-center mx-4"
                    onClick={() => console.log(el)}>
                    <div className="col-8">
                      <span className="text-xl text-gray">{el}</span>
                      <Divider />
                    </div>
                  </div>
                );
              })}
            </Container>
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
  fencing_radius: string;
  geo_location_id: string;
  fence_admin_id: string;
}

type LocationTableProps = {
  tableDataSet?: Array<Location>
  resetRadiusOnchange?: (item: Location) => void;
}


const LocationTable = ({ tableDataSet, resetRadiusOnchange }: LocationTableProps) => {
  return <div className="table-responsive">
    <table className="table align-items-center table-flush">
      <thead className="thead-light">
        <tr>
          <th scope="col">{'Name'}</th>
          <th scope="col">{'Fencing Radius'}</th>
          <th scope="col">{''}</th>
          <th scope="col">{''}</th>
          <th scope="col">{''}</th>
        </tr>

      </thead>
      <tbody>
        {
          tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: Location, index: number) => {
            return <tr className="align-items-center">
              <td style={{ whiteSpace: 'pre-wrap' }} key={item.id} >{item.name}</td>
              <td style={{ whiteSpace: 'pre-wrap' }} key={item.id} >{item.fencing_radius}</td>
              <td style={{ whiteSpace: 'pre-wrap' }} key={item.id} >{item.has_location ? <Primary text={'Reset Radius'} size={'btn-sm'} onClick={() => { if (resetRadiusOnchange) resetRadiusOnchange(item) }} /> : <></>}</td>
              <td style={{ whiteSpace: 'pre-wrap' }} key={item.id} >{(item.has_location && !item.can_update_location) && <Primary text={'Enable Refetch'} size={'btn-sm'} />}</td>
              <td style={{ whiteSpace: 'pre-wrap' }} key={item.id} >{<ImageView height={20} width={20} icon={item.has_location ? Icons.Location : Icons.LocationGray} />}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}

export default LocationScreen;

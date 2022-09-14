import { Container, CommonTable, Modal, Divider } from "@components";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranchesList } from "../../../../store/location/actions";
import { goTo, useNav, ROUTE } from "@utils";
function LocationScreen() {
  const dispatch = useDispatch();
  const navigation = useNav();

  const { brancheslist } = useSelector((state: any) => state.LocationReducer);
  const [model, setModel] = useState(false);
  const modelData = [30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

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

  console.log("brancheslist", brancheslist);
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
              tableOnClick={(e, index, item) => setModel(!model)}
            />
          )}
          <Modal
            title={"Select Radius"}
            showModel={model}
            toggle={() => setModel(!model)}
          >
            <Container>
              {modelData.map((el: any) => {
                return (
                  <div
                    className="row align-items-center mx-4"
                    onClick={() => console.log(el)}
                  >
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

export default LocationScreen;

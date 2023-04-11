import React, { useState, useEffect } from "react";
import { Modal, InputDefault, CheckBox, ImageView, MyActiveBranches, Container, InputText, Icon, NoRecordFound } from "@components";
import { getListAllBranchesList } from "../../store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from "../Interface";
import { Icons } from "@assets";
import {
  setBranchAllHierarchical,
  setBranchHierarchical,
  setBranchHierarchicalIncludeChild,
} from "../../store/dashboard/actions";
import { useTranslation } from "react-i18next";

interface HierarchicalProps {
  showCheckBox?: boolean;
  isValueExist?: (value: number) => void

}

function AllHierarchical({ showCheckBox = true, isValueExist }: HierarchicalProps) {
  const { t } = useTranslation();

  const { hierarchicalBranchName, hierarchicalAllBranchIds, hierarchicalBranchIds, dashboardDetails } =
    useSelector((state: any) => state.DashboardReducer);



  const { listBranchesList } = useSelector((state: any) => state.LocationReducer);

  const [model, setModel] = useState(false);
  const [showAll, setShowAll] = useState(false);
  let dispatch = useDispatch();
  const [branch, setBranch] = useState<any>([])
  const [allBranches, setAllBranches] = useState<any>([])
  const [defaultBranch, setDefaultBranch] = useState<any>([])
  const [searchBranches, setsearchBranches] = useState<any>('')
  const [hierarchicalBranch, setHierarchicalBranch] = useState<any>({});
  const [structuredData, setStructuredData] = useState<Array<LocationProps>>(
    []
  );

  const getBranchesList = () => {
    const params = {};
    dispatch(
      getListAllBranchesList({
        params,
        onSuccess: async (response: Array<LocationProps>) => () => {

        },
        onError: () => () => {
        },
      })
    );
  }

  useEffect(() => {
    getBranchesList()
    if (listBranchesList) {
      const currentBranch = getAllSubBranchesAlternative(listBranchesList, dashboardDetails?.company_branch.id);
      const parentBranch = listBranchesList.find((it: { parent_id: any; }) => !it.parent_id);
      const currentEmployeeParent = listBranchesList.find((it: { id: any; }) => it.id === dashboardDetails.company_branch.id);
      let searchArray = [currentEmployeeParent]
      currentBranch.forEach((element: any) => {
        const index = listBranchesList.findIndex((item: { id: any; }) => item.id === element)
        if (index) {
          searchArray = [...searchArray, listBranchesList[index]]
        }
      });
      setBranch(searchArray)
      setAllBranches(searchArray)
      setStructuredData(listBranchesList);
      setDefaultBranch(searchArray)
      if (parentBranch) {
        const hierarchicalBranchArray = {
          ...parentBranch,
          child: getChild(listBranchesList, parentBranch.id),
        };
        const filteredBranch = getCurrentBranchNode(
          dashboardDetails.company_branch.id,
          [hierarchicalBranchArray]
        );

        setHierarchicalBranch({ child: [filteredBranch] })
      }
    }
  }, [hierarchicalBranchName, hierarchicalBranchIds]);



  const getAllSubBranches = (branchList: any, parent_id: string) => {
    let branchListFiltered: any = [];
    const getChild = (branchList: any, parent_id: string) => {
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChild(branchList, it2.id);
          return it2;
        });
    };
    getChild(branchList, parent_id);

    branchListFiltered = branchListFiltered.map((it: any) => {
      return it.id;
    });
    return branchListFiltered;
  };

  const getAllSubBranchesAlternative = (branchList: any, parent_id: string) => {
    let branchListFiltered: any = [];
    const getChildAlternative = (branchList: any, parent_id: string) => {
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChildAlternative(branchList, it2.id);
          return it2;
        });
    };
    getChildAlternative(branchList, parent_id);

    branchListFiltered = branchListFiltered.map((it: any) => {
      return it.id;
    });
    return branchListFiltered;
  };



  const getChild = (branchList: Array<LocationProps>, parentId: string) =>
    branchList
      .filter((it) => it.parent_id === parentId)
      .map((it2) => {
        it2.child = getChild(branchList, it2.id);
        return it2;
      });

  const getCurrentBranchNode = (id: string, arr: Array<LocationProps>) => {
    let selectedNode = {};
    const getCurrentBranchNodeRecursive = (
      id: string,
      arr: Array<LocationProps>
    ) =>
      arr.forEach((it) => {
        if (it.id === id) {
          selectedNode = it;
        } else {
          getCurrentBranchNodeRecursive(id, it.child);
        }
      });

    getCurrentBranchNodeRecursive(id, arr);
    return selectedNode;
  };


  // function saveChildIdHandler(allBranch: Array<LocationProps>, item: any) {
  //   const childIds = getAllSubBranches(allBranch, item.id);
  //   dispatch(setBranchAllHierarchical(0))
  //   dispatch(
  //     setBranchHierarchical({
  //       ids: {
  //         ...hierarchicalBranchIds,
  //         branch_id: item.id,
  //         child_ids: childIds,
  //       },
  //       name: item.name,
  //     })
  //   );

  //   setModel(!model);
  // }

  const SelectedBranchFilter = () => {
    let filteredBranch = [...branch]
    if (searchBranches !== "") {
      filteredBranch = filteredBranch.filter((element: any) => {
        return element.name.replace(/\s/g, '').toLowerCase().includes(searchBranches.replace(/\s/g, '').toLowerCase())
      })
      setAllBranches(filteredBranch)
    }
    else {
      setAllBranches(defaultBranch)
    }
  }

  return (
    <div>
      <div className="row flex-row-reverse">
        <div className="col-lg-6">
          <div className="form-group">
            <small className="form-control-label text-black">{t("MyBranches")}</small>
            <div onClick={() => setModel(!model)}>
              <InputDefault disabled={true} value={hierarchicalAllBranchIds !== -1 ? hierarchicalBranchName : 'All'} />
            </div>
            {hierarchicalBranchIds && (
              <div className="ml-2 mt--3">
                <CheckBox
                  id={'2'}
                  text={"Include Sub Branches"}
                  checked={hierarchicalBranchIds.include_child}
                  onChange={(e) => {
                    dispatch(
                      setBranchHierarchicalIncludeChild({
                        checkBoxStatus: e.target.checked,
                      })
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <MyActiveBranches />
          </div>
        </div>
      </div>
      <Modal showModel={model} toggle={() => setModel(!model)}>
        <div>
          <Container additionClass={"col-xl-6 col-md-6 col-sm-12 mt-xl-4 row"}>
            <InputText
              value={searchBranches}
              col={'col'}
              placeholder={t("searchBranch")}
              onChange={(e) => {
                setsearchBranches(e.target.value);
              }}
            />
            <Icon type={"btn-primary"} additionClass={'col-xl-2 mt-xl-2 mt-2 mt-sm-0'} icon={Icons.Search}
              onClick={() => {
                SelectedBranchFilter()
              }}
            />
          </Container>
        </div>
      </Modal>
    </div>
  );
}

// type SubLevelComponentProps = {
//   item: any;
//   index: number;
//   onChange?: (array: Array<LocationProps>, item: LocationProps) => void;
//   hierarchicalBranchIds: any;
//   defaultData: Array<LocationProps>;
//   hierarchicalAllBranchIds: number
// };

// const SubLevelComponent = ({
//   item,
//   index,
//   onChange,
//   hierarchicalBranchIds,
//   hierarchicalAllBranchIds,
//   defaultData,
// }: SubLevelComponentProps) => {
//   return (
//     <>

//       <div className="row align-items-center my-4 mx-4" onClick={(e) => {
//         e.stopPropagation();
//         if (onChange) {
//           onChange(defaultData, item);
//         }
//       }}>
//         <div className="col-8">
//           <h5 className="mb-0">{item.name}</h5>
//         </div>
//         <div className="col-4 text-right">
//           <ImageView
//             icon={
//               hierarchicalAllBranchIds === -1 ? Icons.TickDefault : hierarchicalBranchIds.branch_id === item.id
//                 ? Icons.TickActive
//                 : Icons.TickDefault
//             }
//             onClick={(e) => {
//               e.stopPropagation();
//               if (onChange) {
//                 onChange(defaultData, item);
//               }
//             }}
//           />
//         </div>
//       </div>
//       <div>
//         {item.child &&
//           item.child.length > 0 &&
//           item.child.map((item: any, index: number) => {
//             return (
//               <SubLevelComponent
//                 hierarchicalAllBranchIds={hierarchicalAllBranchIds}
//                 index={index}
//                 item={item}
//                 onChange={onChange}
//                 hierarchicalBranchIds={hierarchicalBranchIds}
//                 defaultData={defaultData}
//               />
//             );
//           })}
//       </div>
//     </>
//   );
// };

export default AllHierarchical;

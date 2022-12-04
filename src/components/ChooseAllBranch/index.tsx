import React, { useState, useEffect } from "react";
import { Modal, InputDefault, CheckBox, ImageView } from "@components";
import { getAllBranchesList } from "../../store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from "../Interface";
import { Icons } from "@assets";
import {
  setBranchAllHierarchical,
  setBranchHierarchical,
  setBranchHierarchicalIncludeChild,
} from "../../store/dashboard/actions";

interface HierarchicalProps {
  showCheckBox?: boolean;
  isValueExist?: (value: number) => void

}

function AllHierarchical({ showCheckBox = true, isValueExist }: HierarchicalProps) {
  const { hierarchicalBranchName, hierarchicalAllBranchIds, hierarchicalBranchIds, dashboardDetails } =
    useSelector((state: any) => state.DashboardReducer);



  const { brancheslist } = useSelector((state: any) => state.LocationReducer);

  const [model, setModel] = useState(false);
  let dispatch = useDispatch();

  const [hierarchicalBranch, setHierarchicalBranch] = useState<any>({});
  const [structuredData, setStructuredData] = useState<Array<LocationProps>>(
    []
  );

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

  useEffect(() => {
    const params = {};
    dispatch(
      getAllBranchesList({
        params,
        onSuccess: async (response: Array<LocationProps>) => {
          setStructuredData(response);
          const parentBranch = response.find((it) => !it.parent_id);
          if (parentBranch) {
            const hierarchicalBranchArray = {
              ...parentBranch,
              child: getChild(response, parentBranch.id),
            };
            const filteredBranch = getCurrentBranchNode(
              dashboardDetails.company_branch.id,
              [hierarchicalBranchArray]
            );
            setHierarchicalBranch({ child: [filteredBranch] });
          }
        },
        onError: () => {
          console.log("=========error");
        },
      })
    );
  }, []);

  function saveChildIdHandler(allBranch: Array<LocationProps>, item: any) {
    const childIds = getAllSubBranches(allBranch, item.id);
    dispatch(setBranchAllHierarchical(0))

    dispatch(
      setBranchHierarchical({
        ids: {
          ...hierarchicalBranchIds,
          branch_id: item.id,
          child_ids: childIds,
        },
        name: item.name,
      })
    );

    setModel(!model);
  }



  return (
    <div>
      <div className="col text-right">
        <div onClick={() => setModel(!model)}>
          <InputDefault disabled={true} value={hierarchicalAllBranchIds !== -1 ? hierarchicalBranchName : 'All'} />
        </div>
      </div>
      <Modal showModel={model} toggle={() => setModel(!model)}>
        {brancheslist &&
          hierarchicalBranch &&
          hierarchicalBranch?.child &&
          hierarchicalBranch?.child.length > 0 &&
          hierarchicalBranch?.child.map(
            (item: LocationProps, index: number) => {
              return (
                <div>
                  <div className="row align-items-center my-4 mx-4">
                    <div className="col-8" >
                      <h5 className="mb-0">{'All'}</h5>
                    </div>
                    <div className="col-4 text-right">
                      <ImageView
                        icon={
                          hierarchicalAllBranchIds === -1
                            ? Icons.TickActive
                            : Icons.TickDefault
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setModel(!model);
                          dispatch(setBranchAllHierarchical(-1))
                        }}
                      />
                    </div>
                  </div>
                  <SubLevelComponent

                    hierarchicalAllBranchIds={hierarchicalAllBranchIds}
                    index={index}
                    item={item}
                    onChange={(array, item) => saveChildIdHandler(array, item)}
                    hierarchicalBranchIds={hierarchicalBranchIds}
                    defaultData={brancheslist}
                  />
                </div>
              );
            }
          )}
      </Modal>
    </div>
  );
}

type SubLevelComponentProps = {
  item: any;
  index: number;
  onChange?: (array: Array<LocationProps>, item: LocationProps) => void;
  hierarchicalBranchIds: any;
  defaultData: Array<LocationProps>;
  hierarchicalAllBranchIds: number
};

const SubLevelComponent = ({
  item,
  index,
  onChange,
  hierarchicalBranchIds,
  hierarchicalAllBranchIds,
  defaultData,
}: SubLevelComponentProps) => {
  return (
    <>

      <div className="row align-items-center my-4 mx-4">
        <div className="col-8">
          <h5 className="mb-0">{item.name}</h5>
        </div>
        <div className="col-4 text-right">
          <ImageView
            icon={
              hierarchicalAllBranchIds === -1 ? Icons.TickDefault : hierarchicalBranchIds.branch_id === item.id
                ? Icons.TickActive
                : Icons.TickDefault
            }
            onClick={(e) => {
              e.stopPropagation();
              if (onChange) {
                onChange(defaultData, item);
              }
            }}
          />
        </div>
      </div>
      <div>
        {item.child &&
          item.child.length > 0 &&
          item.child.map((item: any, index: number) => {
            return (
              <SubLevelComponent
                hierarchicalAllBranchIds={hierarchicalAllBranchIds}
                index={index}
                item={item}
                onChange={onChange}
                hierarchicalBranchIds={hierarchicalBranchIds}
                defaultData={defaultData}
              />
            );
          })}
      </div>
    </>
  );
};

export default AllHierarchical;

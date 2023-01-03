import React, { useState, useEffect } from "react";
import { Modal, InputDefault, CheckBox, ImageView, MyActiveBranches, Container } from "@components";
import { getAllBranchesList } from "../../store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from "../Interface";
import { Icons } from "@assets";
import {
  setBranchHierarchical,
  setBranchHierarchicalIncludeChild,
} from "../../store/dashboard/actions";
import { useTranslation } from "react-i18next";

interface HierarchicalProps {
  showCheckBox?: boolean;
}

function Hierarchical({ showCheckBox = true }: HierarchicalProps) {
  const { t } = useTranslation();

  const { hierarchicalBranchName, hierarchicalBranchIds, dashboardDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const { brancheslist } = useSelector((state: any) => state.LocationReducer);

  const [model, setModel] = useState(false);
  let dispatch = useDispatch();

  const [hierarchicalBranch, setHierarchicalBranch] = useState<any>({});
  const [structuredData, setStructuredData] = useState<Array<LocationProps>>(
    []
  );

  

  
  useEffect(() => {
    const params = {};
    dispatch(
      getAllBranchesList({
        params,
        onSuccess: async (response: Array<LocationProps>) => {
          setStructuredData(hierarchicalBranchIds);
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
  }, [hierarchicalBranchName,hierarchicalBranchIds ]);


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

  function saveChildIdHandler(allBranch: Array<LocationProps>, item: any) {
    const childIds = getAllSubBranches(allBranch, item.id);
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
    <div className="row flex-row-reverse" >
      <div className="col-lg-6">
        <div className="form-group">
          <small className="form-control-label text-black">{t("MyBranches")}</small>
          <div onClick={() => setModel(!model)}>
            <InputDefault disabled={true} value={hierarchicalBranchName} />
          </div>
          {hierarchicalBranchIds && showCheckBox && (
            <div className="mt--3">
              <CheckBox
                id={'1'}
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
      <Modal showModel={model} toggle={() => setModel(!model)}>
        {console.log("brancheslist", brancheslist)}
        {brancheslist &&
          hierarchicalBranch &&
          hierarchicalBranch?.child &&
          hierarchicalBranch?.child.length > 0 &&
          hierarchicalBranch?.child.map(
            (item: LocationProps, index: number) => {
              return (
                <div className="accordion">
                  <SubLevelComponent
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
};

const SubLevelComponent = ({
  item,
  index,
  onChange,
  hierarchicalBranchIds,
  defaultData,
}: SubLevelComponentProps) => {
  return (
    <>
      <div
        className="card-header"
        data-toggle="collapse"
        data-target={"#collapse" + item.id}
      >
        <div className="row align-items-center mx-4">
          <div className="col-8">
            <h5 className="mb-0">{item.name}</h5>
          </div>
          <div className="col-4 text-right">
            <ImageView
              icon={
                hierarchicalBranchIds.branch_id === item.id
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
      </div>
      <div className="collapse" id={"collapse" + item.id}>
        <div className="card-body row align-items-center">
          {item.child &&
            item.child.length > 0 &&
            item.child.map((item: any, index: number) => {
              return (
                <SubLevelComponent
                  index={index}
                  item={item}
                  onChange={onChange}
                  hierarchicalBranchIds={hierarchicalBranchIds}
                  defaultData={defaultData}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Hierarchical;

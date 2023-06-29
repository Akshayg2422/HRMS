import React, { useState, useEffect } from "react";
import { Modal, InputDefault, CheckBox, ImageView, MyActiveBranches, Container, Secondary, Primary } from "@components";
import { getListAllBranchesList } from "../../store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from "../Interface";
import { Icons } from "@assets";
import {
  multiSelectBranch
} from "../../store/dashboard/actions";
import { useTranslation } from "react-i18next";

interface HierarchicalProps {
  showCheckBox?: boolean;
  showActiveBranch?: boolean
}

function MultiselectHierarchical({ showActiveBranch = true }: HierarchicalProps) {
  const { t } = useTranslation();
  const [selectedBranch, setSelectedBranch] = useState<any>([])
  const { hierarchicalBranchName, hierarchicalBranchIds, dashboardDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const { listBranchesList } = useSelector((state: any) => state.LocationReducer);

  const [model, setModel] = useState(false);
  let dispatch = useDispatch();

  const [hierarchicalBranch, setHierarchicalBranch] = useState<any>({});
  const [structuredData, setStructuredData] = useState<Array<LocationProps>>(
    []
  );

  useEffect(() => {
    const params = {};
    dispatch(
      getListAllBranchesList({
        params,
        onSuccess: async (response: Array<LocationProps>) => () => {
          setStructuredData(hierarchicalBranchIds);
          const parentBranch = response.find((it) => !it.parent_id);
          if (parentBranch) {
            const hierarchicalBranchArray = {
              ...parentBranch,
              child: getChild(response, parentBranch.id),
            };
            const filteredBranch: any = getCurrentBranchNode(
              dashboardDetails.company_branch.id,
              [hierarchicalBranchArray]
            );
            let UpdatedBranch = [...selectedBranch]
            setSelectedBranch(UpdatedBranch)
            setHierarchicalBranch({ child: [filteredBranch] });
          }
        },
        onError: () => () => {
        },
      })
    );
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
    // dispatch(
    //   setBranchHierarchical({
    //     ids: {
    //       ...hierarchicalBranchIds,
    //       branch_id: item.id,
    //       child_ids: childIds,
    //     },
    //     name: item.name,
    //   })
    // );
    // setModel(!model);
  }

  const handleMultiselect = (allBranch: Array<LocationProps>, item: any) => {
    let UpdatedBranch = [...selectedBranch]
    const isExist = UpdatedBranch.some((branchId: any) => branchId.branch_id === item.id)
    if (isExist) {
      UpdatedBranch = UpdatedBranch.filter((Ids: any) => Ids.branch_id !== item.id)
    } else {

      const childIds = getAllSubBranches(allBranch, item.id);
      let structuredData = { branch_id: item.id, child_ids: childIds, include_child: false }
      UpdatedBranch = [...UpdatedBranch, structuredData]
    }
    setSelectedBranch(UpdatedBranch)
  }

  const handleIncludeChild = (id: string) => {
    let updateIncludeChild = [...selectedBranch]
    updateIncludeChild.map((el: any) => {
      if (el.branch_id === id) {
        el.include_child = !el.include_child
      }
    })
    setSelectedBranch(updateIncludeChild)
  }

  const handleSubmit = () => {
    dispatch(multiSelectBranch(selectedBranch))
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
        </div>
      </div>
      {showActiveBranch && <div className="col-lg-6">
        <div className="form-group">
          <MyActiveBranches />
        </div>
      </div>}
      {model && <Modal showModel={model} toggle={() => setModel(!model)} title={t('MyBranches')}>
        {listBranchesList &&
          hierarchicalBranch &&
          hierarchicalBranch?.child &&
          hierarchicalBranch?.child.length > 0 &&
          hierarchicalBranch?.child.map(
            (item: LocationProps, index: number) => {
              return (
                <>
                  <div className="accordion">
                    <SubLevelComponent
                      id={item.id}
                      index={index}
                      item={item}
                      onChange={(array, item) => handleMultiselect(array, item)}
                      includeChild={(id: string) => handleIncludeChild(id)}
                      hierarchicalBranchIds={hierarchicalBranchIds}
                      defaultData={listBranchesList}
                      filteredBranch={selectedBranch}
                    />
                  </div>
                </>
              );
            }
          )}
        <Container margin={"mt-5"} additionClass={"text-right"}>
          <Secondary
            text={t("cancel")}
            onClick={() => setModel(!model)}
          />
          <Primary
            text={t("confirm")}
            onClick={() => handleSubmit()}
          />
        </Container>
      </Modal>}
    </div>
  );
}

type SubLevelComponentProps = {
  item: any;
  id: string
  index: number;
  filteredBranch?: any,
  includeChild: any,
  onChange?: (array: Array<LocationProps>, item: LocationProps) => void;
  hierarchicalBranchIds: any;
  defaultData: Array<LocationProps>;
};

const SubLevelComponent = ({
  item,
  index,
  onChange,
  includeChild,
  filteredBranch,
  hierarchicalBranchIds,
  defaultData,
}: SubLevelComponentProps) => {
  let isExist = filteredBranch?.some((it: any) => it.branch_id === item.id)
  let hasChild = filteredBranch?.find((item_x: any) => {
    if (item_x.branch_id === item.id) {
      return item_x
    }
  });

  return (
    <>
      <Container additionClass="row">
        <div
          className="card-header"
          data-toggle="collapse"
          data-target={"#collapse" + item.id}
        >
          <div className="row align-items-center mx-xl-2">
            <div className="col-xl-4">
              <h5 className="mb-0">{item.name}</h5>
            </div>
            <div className="col-xl-4 col-10 col-sm-0 text-right">
              <ImageView
                icon={
                  isExist
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
            <div className="col-xl-4 col col-sm-0">
              {hasChild?.child_ids?.length > 0 ?
                <CheckBox
                  id={item.id}
                  text={"Include Sub Branches"}
                  checked={hasChild.include_child}
                  onChange={() => {
                    if (includeChild) {
                      includeChild(item.id)
                    }
                  }}
                /> : ''}
            </div>
          </div>
        </div>
      </Container>
      <div className="collapse" id={"collapse" + item.id}>
        <div className="card-body row align-items-center">
          {item.child &&
            item.child.length > 0 &&
            item.child.map((item: any, index: number) => {
              return (
                <SubLevelComponent
                  id={item.id}
                  index={index}
                  item={item}
                  filteredBranch={filteredBranch}
                  onChange={onChange}
                  hierarchicalBranchIds={hierarchicalBranchIds}
                  defaultData={defaultData}
                  includeChild={includeChild}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MultiselectHierarchical;

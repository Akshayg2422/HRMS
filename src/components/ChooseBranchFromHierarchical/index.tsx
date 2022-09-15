import React, { useState, useEffect } from 'react'
import { Modal, InputDefault, CheckBox, ImageView } from '@components'
import {
    getAllBranchesList,
} from '../../store/location/actions';
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from '../Interface'
import {Icons} from '@assets'
import { setBranchHierarchical, setBranchHierarchicalIncludeChild } from "../../store/dashboard/actions";

function Hierarchical() {

    const { hierarchicalBranchName, hierarchicalBranchIds , dashboardDetails} = useSelector(
        (state: any) => state.DashboardReducer
      );
    

    const [model, setModel] = useState(false);
    let dispatch = useDispatch();

    const [hierarchicalBranch, setHierarchicalBranch] = useState<any>({});
    const [structuredData, setStructuredData] = useState<Array<LocationProps>>([]);


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
            .filter(it => it.parent_id === parentId)
            .map(it2 => {
                it2.child = getChild(branchList, it2.id);
                return it2;
            });


    const getCurrentBranchNode = (id: string, arr: Array<LocationProps>) => {
        let selectedNode = {};
        const getCurrentBranchNodeRecursive = (id: string, arr: Array<LocationProps>) =>
            arr.forEach(it => {
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
        const params = {}
        dispatch(getAllBranchesList({
            params,
            onSuccess: (response: Array<LocationProps>) => {

                setStructuredData(response);
                const parentBranch = response.find(it => !it.parent_id);
                console.log(JSON.stringify(parentBranch));

                if (parentBranch) {
                    const hierarchicalBranchArray = {
                        ...parentBranch,
                        child: getChild(response, parentBranch.id),

                    };
                    const filteredBranch = getCurrentBranchNode(
                        dashboardDetails.company_branch.id,
                        [hierarchicalBranchArray],
                    );
                    setHierarchicalBranch({ child: [filteredBranch] });
                }
            },
            onError: () => {
            },
        }))
    }, [])


    function saveChildIdHandler(item: any) {
        const childIds = getAllSubBranches(structuredData, item.id)
        dispatch(setBranchHierarchical({ ids: { branch_id: item.id, child_ids: childIds, include_child: true }, name: item.name }))
        setModel(!model);
    }


    return (
        <div>
            <div className='col text-right' >
                <div onClick={() => setModel(!model)}>
                    <InputDefault disabled={true} value={hierarchicalBranchName}/>
                </div>
                <div className='mt--3'>
                    <CheckBox text={'Include Sub Branches'}  checked={hierarchicalBranchIds.include_child} onChange={(e)=>{
                        dispatch(setBranchHierarchicalIncludeChild({checkBoxStatus: e.target.checked}))
                    }}/>
                </div>
            </div>

            <Modal showModel={model} toggle={() => setModel(!model)}>

                {
                    hierarchicalBranch && hierarchicalBranch?.child && hierarchicalBranch?.child.length > 0 && hierarchicalBranch?.child.map((item: LocationProps, index: number) => {
                        return (
                            <div className='accordion'>
                                <SubLevelComponent index={index} item={item} onChange={(item)=>saveChildIdHandler(item)} hierarchicalBranchIds={hierarchicalBranchIds}/>
                            </div>
                        );
                    })
                }
            </Modal>
        </div>
    )
}

type SubLevelComponentProps = {
    item: any;
    index: number;
    onChange?: (item : LocationProps) => void
    hierarchicalBranchIds: any;
}

const SubLevelComponent = ({ item, index , onChange, hierarchicalBranchIds}: SubLevelComponentProps) => {
    return (
        <>
            <div className="card-header"  data-toggle="collapse" data-target={"#collapse" + item.id} >
                <div className='row align-items-center mx-4' >
                    <div className='col-8'>
                        <h5 className="mb-0">{item.name}</h5>
                    </div>
                    <div className='col-4 text-right' onClick={(e) => {
                        e.stopPropagation();
                        if (onChange) {
                            onChange(item)
                        }

                    }}>
                        <ImageView icon={hierarchicalBranchIds.branch_id === item.id ? Icons.TickActive : Icons.TickDefault} />
                    </div>
                </div>
            </div>
            <div className="collapse" id={"collapse" + item.id}>
                <div className="card-body row align-items-center">
                    {
                        item.child && item.child.length > 0 && item.child.map((item: any, index: number) => {
                            return <SubLevelComponent index={index} item={item} onChange={onChange} hierarchicalBranchIds={hierarchicalBranchIds}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Hierarchical;
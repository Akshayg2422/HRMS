import React, { useState, useEffect } from 'react'
import { Modal, InputDefault, CheckBox, ImageView } from '@components'

import {
    getAllBranchesList,
} from '../../store/location/actions';
import { useSelector, useDispatch } from "react-redux";
import { LocationProps } from '../Interface'
import {Icons} from '@assets'
type HierarchicalProps = {

}

function Hierarchical({ }: HierarchicalProps) {

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
                        '2b166a62-22ec-4fcd-a2fe-aab084cb6d37',
                        [hierarchicalBranchArray],
                    );
                    setHierarchicalBranch({ child: [filteredBranch] });
                }
            },
            onError: () => {
            },
        }))
    }, [])


    function saveChildIdHandler(item: any){
        // console.log(item.name+"========");
        // getAllSubBranches(structuredData, item.id)
        console.log(item.id);
        
        console.log(JSON.stringify(getAllSubBranches(structuredData, item.id))+"===========saveChildIdHandler");
        
    }


    return (
        <div>
            <div className='col text-right' >
                <div onClick={() => setModel(!model)}>
                    <InputDefault disabled={true} />
                </div>
                <div className='mt--3'>
                    <CheckBox text={'Include Sub Branches'} />
                </div>
            </div>

            <Modal showModel={model} toggle={() => setModel(!model)}>

                {
                    hierarchicalBranch && hierarchicalBranch?.child && hierarchicalBranch?.child.length > 0 && hierarchicalBranch?.child.map((item: LocationProps, index: number) => {
                        return (
                            <div className='accordion'>
                                <SubLevelComponent index={index} item={item} onChange={(item)=>saveChildIdHandler(item)}/>
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
}

const SubLevelComponent = ({ item, index , onChange}: SubLevelComponentProps) => {
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
                        <ImageView icon={Icons.TickDefault} />
                    </div>
                </div>
            </div>
            <div className="collapse" id={"collapse" + item.id}>
                <div className="card-body row align-items-center">
                    {
                        item.child && item.child.length > 0 && item.child.map((item: any, index: number) => {
                            return <SubLevelComponent index={index} item={item} onChange={onChange} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Hierarchical;
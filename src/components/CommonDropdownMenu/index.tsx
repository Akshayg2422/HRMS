import { HEADER_MENU } from '@utils';
import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ImageView } from '@components'


type CommonDropdownMenuProps = {
    onAddClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onDeleteClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onAssignCourse?: (e: React.MouseEvent<HTMLElement>) => void;
    isStudent?: boolean;
    onAddChild?: (e: React.MouseEvent<HTMLElement>) => void;
    isAddChild?: boolean
    showEdit?: boolean
    onAddRemark?: (e: React.MouseEvent<HTMLElement>) => void;
    showDelete?: boolean
    onItemClick?: (e: React.MouseEvent<HTMLElement>, item: any) => void;
    data?: any
}

function CommonDropdownMenu({ data, onItemClick }: CommonDropdownMenuProps) {

    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    color=""
                    size="sm"
                    className="btn-icon-only text-light shadow-none "
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >
                    <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                    {data && data?.map((item: any) => {
                        return (
                            <>
                                <a className="dropdown-item"
                                    onClick={(e) => {
                                        if (onItemClick) {
                                            e.stopPropagation()
                                            onItemClick(e, item)
                                        }
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.image
                                        ? <ImageView
                                            height={'18'}
                                            alt='Menu Icon'
                                            icon={item.image}
                                        /> : <i className={`${item.icon}`}></i>}
                                    <span className='ml-2' onClick={(e) => {
                                        if (onItemClick) {
                                            e.stopPropagation()
                                            onItemClick(e, item)
                                        }
                                    }}  >{item?.name}</span></a>
                            </>
                        );
                    })}

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export default CommonDropdownMenu 

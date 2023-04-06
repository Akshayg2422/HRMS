import { HEADER_MENU } from '@utils';
import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


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

function CommonDropdownMenu({ data, onAddClick, onDeleteClick, onAssignCourse, isStudent = false, showEdit = false, isAddChild = false, onAddChild, onAddRemark, showDelete = false, onItemClick }: CommonDropdownMenuProps) {

    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    color=""
                    size="sm"
                    className="btn-icon-only text-light shadow-none"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >
                    <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow " right>
                    {data && data?.map((item: any) => {
                        return (
                            <DropdownItem
                                onClick={(e) => { if (onItemClick) { onItemClick(e, item) } }}
                            >
                                {item.name}
                            </DropdownItem>
                        );
                    })}

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export default CommonDropdownMenu 
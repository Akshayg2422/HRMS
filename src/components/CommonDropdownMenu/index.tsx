import React from 'react'
import { Icon, ImageView } from '@components'
import { Icons } from '@assets';

type CommonDropdownMenuProps = {
    dataSet:
    Array<{
        name: string,
        elv: string,
        icon: string
    }>
    menuValueOnClick?: (event: any, index: number, item: object, elv: string) => void;
    menuSize?: string
}

function CommonDropdownMenu({ dataSet, menuValueOnClick, menuSize = '35' }: CommonDropdownMenuProps) {

    return (
        <li className='nav-item dropdown'>
            <div className='media'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                <ImageView
                    height={menuSize}
                    alt='Menu'
                    icon={Icons.MenuDots}
                />
            </div>
            <div className='dropdown-menu dropdown-menu'>
                {dataSet.map((item: any, index: number) => {
                    return (
                        <a className="dropdown-item" href="#"
                            onClick={(e) => {
                                if (menuValueOnClick) {
                                    menuValueOnClick(e, index, item, item.elv)
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}>
                            {item.icon
                                ? <ImageView
                                    height={'18'}
                                    alt='Menu Icon'
                                    icon={item.icon}
                                /> : <i className="fa fa-home"></i>}
                            <span className='ml-2'>{item?.name}</span></a>
                    );
                })}
            </div>
        </li>
    )
}

export default CommonDropdownMenu




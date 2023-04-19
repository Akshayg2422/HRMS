import React from "react";
import { SORT_BUTTON } from '@utils'

interface SortProps {
  sortData: Array<{ id: number, title: string }>
  onClick?: any;
  activeIndex?: number;
  size?: 'btn-sm' | 'btn-md' | 'btn-lg'
}

const index = ({ sortData, onClick, activeIndex, size }: SortProps) => {
  return (
    <>
      <div className="btn-group btn-secondary btn-group-toggle" data-toggle="buttons">
        {sortData.map((item, index: number) => {
          return (
            <label style={{ width: '110px' }} className={`btn btn-secondary ${size} ${activeIndex === index && 'active'}`} onClick={() => { if (onClick) { onClick(index, item) } }}>
              <input type="radio" name="options" className="align-self-center" />{item.title}
            </label>
          )
        })}
      </div>
    </>
  )
}

export default index
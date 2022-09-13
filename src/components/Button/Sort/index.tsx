import React from "react";
import { SORT_BUTTON } from '@utils'

interface SortProps {
  sortData: Array<{id: number, title: string}>
  onClick?: (index: number) => void;
  activeIndex?: number;
}

const index = ({ sortData, onClick, activeIndex }: SortProps) => {
  return (
    <>
      <div className="btn-group btn-secondary btn-group-toggle" data-toggle="buttons">
        {sortData.map((item, index: number) => {
          return (
            <label className={`btn btn-secondary ${activeIndex === index && 'active'}`} onClick={() => { if (onClick) { onClick(index) } }}>
              <input type="radio" name="options" />{item.title}
            </label>
          )
        })}
      </div>
    </>
  )
}

export default index
import React from "react";

const DropDown = (props) => {
  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props?.selected?.value}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.items.map((element) => {
          return (
            <a
              onClick={() => {
                props.onSelect(element);
              }}
              class="dropdown-item"
            >
              {element.value}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default DropDown;

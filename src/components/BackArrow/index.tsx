import React from "react";
import { ImageView, Container } from "@components";
import { Icons } from "@assets";
import { goBack, isExist, useNav } from "@utils";

interface BackArrowProps {
  backgroundColor?: string;
  col?: String;
  additionClass?: string;
}

const BackArrow = ({ additionClass, col }: BackArrowProps) => {
  const navigation = useNav();
  return (
    <div
      style={{ cursor: 'pointer' }}
      className={`${isExist(additionClass)} ${isExist(col)}`}

    >
      <ImageView icon={Icons.BackArrow} height={25} width={28} onClick={() => goBack(navigation)} />
    </div>
  );
};
export default BackArrow;

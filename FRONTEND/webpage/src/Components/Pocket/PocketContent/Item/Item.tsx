import React from "react";
import { addComma } from "../../../../Utils/numberUtils";
import DateLabel from "../DateLabel/DateLabel";
import "./Item.css";

interface ItemProps {
  id: number;
  date: Date;
  title: string;
  amount: number;
  amountType: string;
}

const Item: React.FC<ItemProps> = (props) => {
  let itemStyleByAmountType = "item " + props.amountType;
  let fontStyleByAmountType = "fs-emphasis fc-red";

  const itemTitle = props.title;
  let itemAmount = "-" + addComma(props.amount.toString());

  if (props.amountType === "충전") {
    fontStyleByAmountType = fontStyleByAmountType.replace("red", "green");
    itemAmount = itemAmount.replace("-", "+");
  }

  return (
    <div className={itemStyleByAmountType}>
      <div>
        <DateLabel date={props.date} />

        <div className="item__title">
          <h3 className="fs-normal fw-regular">{itemTitle}</h3>
        </div>
      </div>
      <div>
        <strong className={fontStyleByAmountType}>{itemAmount}</strong>
      </div>
    </div>
  );
};

export default Item;
import React, { useEffect, useState } from "react";
import { addComma } from "../../Utils/numberUtils";
import "./PocketStatus.css";

interface Item {
  info: string;
  insert_time: Date;
  price: number;
  total_point: number;
}

interface PocketStatusProps {
  items: Item[];
}

const PocketStatus: React.FC<PocketStatusProps> = (props) => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    const total = { balance: 0, income: 0, expense: 0 };

    if (props.items.length > 0) {
      // 자산, 수입, 지출 합계 계산
      props.items.forEach((item) => {
        if (item.info === "충전") {
          total.balance += +item.price;
          total.income += +item.price;
        } else {
          total.balance += +item.price;
          total.expense += +item.price;
        }
      });
    }

    setTotalBalance(total.balance);
    setTotalIncome(total.income);
    setTotalExpense(total.expense);
  }, [props.items]);

  return (
    <div className="pocket__status">
      <div className="pocket__status-title">
        <h1 className="fs-normal fw-light">포인트 현황</h1>
        <strong className="fs-title">
          {addComma(totalBalance.toString())}원
        </strong>
      </div>

      <div className="pocket__status-detail">
        <div className="pocket__status-detail--desc">
          <span className="fs-normal fw-light">수입</span>
          <strong className="fs-emphasis fc-green">
            {addComma(totalIncome.toString())}원
          </strong>
        </div>
        <div className="pocket__status-detail--desc">
          <span className="fs-normal fw-light">지출</span>
          <strong className="fs-emphasis fc-red">
            {addComma(totalExpense.toString())}원
          </strong>
        </div>
      </div>
    </div>
  );
};

export default PocketStatus;
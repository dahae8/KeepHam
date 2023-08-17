import React, { useContext } from "react";
import Item from "./PocketContent/Item/Item";
import { FilterContext } from "./PocketContainer";
import "./PocketItems.css";

const PocketItems: React.FC = () => {
  const { filteredItems } = useContext(FilterContext);

  if (filteredItems.length === 0) {
    return (
      <div className="pocket__items">
        <span
          className="fw-light fs-normal"
          style={{ display: "block", textAlign: "center" }}
        >
          입력된 데이터가 없어요 🙅
        </span>
      </div>
    );
  }

  const copyFilteredItems = [...filteredItems];
  const sortedFilteredItems = copyFilteredItems.sort((a, b) => {
    // 날짜가 최근일수록 상단에 위치하도록 정렬
    // 만약 날짜가 같다면 id 값이 작은 순으로(최근에 입력한 순으로) 상단에 위치하도록 정렬
    // if (new Date(a.insert_time).getTime() === new Date(b.insert_time).getTime()) {
    //   return a - b
    // }

    return new Date(b.insert_time).getTime() - new Date(a.insert_time).getTime();
  });

  return (
    <div className="pocket__items">
      {sortedFilteredItems.map((item, index) => (
        <Item
          key={index}
          id={index}
          date={item.insert_time}
          title={item.info}
          amount={item.price}
          amountType={item.info}
        />
      ))}
    </div>
  );
};

export default PocketItems;
import React from "react";

interface DataListProps {
  data: { name: string; count: number }[]; // 데이터의 타입을 필요에 맞게 변경할 수 있습니다.
}

const BoxLists: React.FC<DataListProps> = ({ data }) => {
  return (
    <div>
      <h1>데이터 리스트</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            이름 : {item.name} 갯수 : {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoxLists;

import { useState } from "react";
import "./boxSearch.css";
import MapContainer from "./MapContainer";
import BoxLists from "./boxLists";
import StoreLists from "./getdata";

function BoxSearch() {
  const [boxLocation, searchlocation] = useState("");
  const myData = [
    { name: "아이템 1", count: 3 },
    { name: "아이템 2", count: 1 },
    { name: "아이템 3", count: 10 },
  ];
  return (
    <>
      <div>
        <label>
          <input
            type="text"
            placeholder="현재 위치를 입력하세요"
            value={boxLocation}
            onChange={(e) => searchlocation(e.target.value)}
          />
          <button>검색</button>
          <div className="mapcontainer">
            <MapContainer />
            <StoreLists />
          </div>
        </label>
      </div>
    </>
  );
}

export default BoxSearch;

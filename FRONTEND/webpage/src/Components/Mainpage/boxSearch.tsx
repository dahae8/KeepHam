import { useState } from "react";
import "./boxSearch.css";
import MapContainer from "./MapContainer";

function BoxSearch() {
  const [boxLocation, searchlocation] = useState("");
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
          <MapContainer />
        </label>
      </div>
    </>
  );
}

export default BoxSearch;

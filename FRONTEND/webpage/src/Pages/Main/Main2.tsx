import { useState } from "react";
import "./Main2.css";
import BoxLists from "@/Components/Landing/BoxLists";
import { Typography } from "@mui/material";

function BoxSearch() {
  const [boxLocation, searchlocation] = useState("");
  const [showMode, setShowMode] = useState(false);
  let content = null;
  const changeShowMode = () => {
    setShowMode(true);
  };

  if (showMode) {
    content = (
      <div className="mapcontainer">
        {/* <MapContainer /> */}
        <Typography variant="h5" gutterBottom>
          지금은 함 목록
        </Typography>
        <div></div>
        <BoxLists />
      </div>
    );
  }
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
          <button type="submit" onClick={changeShowMode}>
            검색
          </button>
          {content}
          {boxLocation}
        </label>
      </div>
    </>
  );
}

export default BoxSearch;

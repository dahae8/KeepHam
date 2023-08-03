import { useState } from "react";
import { Typography } from "@mui/material";
import AwsDataFetcher from "@/Components/Chatt/getDatatest";

export default function ChattingBox() {
  const [chattForsend, getChattForsend] = useState("");

  const sendChatt = () => {
    console.log(chattForsend);
    getChattForsend("");
  };
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        채팅내용 보이는 곳
      </Typography>
      <AwsDataFetcher />
      <div>
        <input
          placeholder="채팅내용 입력하기"
          value={chattForsend}
          onChange={(e) => getChattForsend(e.target.value)}
        />
        <button type="submit" onClick={sendChatt}>
          보내기
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

export default function BoxInfo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8000/");
      const dataFromServer = response.data;
      setData(dataFromServer);
      console.log(data);
    } catch (error) {}
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        BoxInfo
      </Typography>
    </div>
  );
}

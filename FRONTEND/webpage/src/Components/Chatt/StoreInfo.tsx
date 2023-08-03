import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

export default function StoreInfo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8000/");
      const dataFromServer = response.data;
      setData(dataFromServer);
    } catch (error) {}
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        StoreInfo
      </Typography>
    </div>
  );
}

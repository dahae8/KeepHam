import React, { useEffect, useState } from "react";
import axios from "axios";

function StoreLists() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8000/");
      const dataFromServer = response.data;
      setData(dataFromServer);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  return (
    <div>
      <ul>
        {data.map((item: any) => (
          <li key={item._id}>
            name : {item.name}, belong : {item.belong}, phone : {item.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreLists;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BoxLists() {
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
      <ul>
        {data.map((item: any) => (
          <p>
            <Link to={"chatList/" + item._id} key={item._id}>
              name : {item.name}, belong : {item.belong}, phone : {item.phone}
            </Link>
          </p>
        ))}
      </ul>
    </div>
  );
}

export default BoxLists;

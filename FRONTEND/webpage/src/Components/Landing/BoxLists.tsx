import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface localData {
  belong: string;
  name: string;
  phone: string;
  _id: number;
}

function BoxLists() {
  const [data, setData] = useState<localData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8000/");
      const dataFromServer = response.data;
      console.log(dataFromServer);
      setData(dataFromServer);
      setLoading(false);
    } catch (error) {
      setError("AWS 서버에서 데이터를 가져오는데 에러가 발생했습니다.");
      setLoading(false);
    }
  }

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <Link to={"chatList/" + item._id}>
              name : {item.name}, belong : {item.belong}, phone : {item.phone}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoxLists;

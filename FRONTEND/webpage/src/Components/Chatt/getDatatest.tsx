import React, { useEffect, useState } from "react";
import axios from "axios";

interface Room {
  box_id: number;
  created_at: string;
  extension_number: number;
  id: number;
  locked: boolean;
  max_people_number: number;
  status: string;
  store_id: number;
  super_user_id: string;
  title: string;
  updated_at: string;
}

const AwsDataFetcher: React.FC = () => {
  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = window.localStorage.getItem("AccessToken");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://i9c104.p.ssafy.io:48080/api/rooms?status=OPEN",
          {
            headers: {
              Authorization: "Bearer" + { key },
            },
          }
        );
        setData(response.data.body);
        setLoading(false);
      } catch (error) {
        setError("AWS 서버에서 데이터를 가져오는데 에러가 발생했습니다.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>AWS 서버에서 가져온 데이터</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AwsDataFetcher;

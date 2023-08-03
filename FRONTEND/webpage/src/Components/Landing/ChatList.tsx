import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

export default function ChatList() {
  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://i9c104.p.ssafy.io:48080/api/rooms?status=OPEN",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyOlVTRVIiLCJpc3MiOiJzc2FmeSIsImlhdCI6MTY5MTAyMzg1OSwiZXhwIjoxNjkxMTMxODU5fQ.6beI-ZNT1hOPgK5_A3vNobQlFOnOXgeb3L3eD8mODn3auUST3l_7W5h0-dNc8ntkhrq1huyN_JHDOxopqO04rw",
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
      <Typography variant="h5" gutterBottom>
        채팅방 목록
      </Typography>
      <div>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Link to={"/chatRoom/" + item.id}>
                RoomNum : {item.extension_number}
                <p></p>
                방이름 : {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

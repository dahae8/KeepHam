import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { exRooms } from "@/Pages/RoomList/RoomList.tsx";
import axios from "axios";

// 타입
type propsType = {
  data: exRooms[];
};

// 테이블 아이템
function TableList(props: propsType) {
  const columns: GridColDef[] = [
    { field: "title", headerName: "제목", width: 200 },
    {
      field: "category",
      headerName: "카테고리",
      width: 100,
    },
    {
      field: "store_name",
      headerName: "주문 가게",
      width: 250,
    },
    {
      field: "address",
      headerName: "받는주소",
      width: 100,
    },
    {
      field: "max_people_number",
      headerName: "최대인원",
      width: 100,
    },
  ];
  const navigate = useNavigate();
  const userState = window.sessionStorage.getItem("userState");

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={(selectedRow) => {
          const selectedIdx: number = Number(selectedRow[0]);
          if (userState === "isLoggedIn") {
            const key = window.sessionStorage.getItem("AccessToken");
            const increasePeaple = async () => {
              try {
                const url =
                  import.meta.env.VITE_URL_ADDRESS +
                  "/api/rooms/" +
                  selectedIdx;
                const response = await axios.post(
                  url,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ` + key,
                    },
                  }
                );
                console.log(response.data.body);
              } catch (error) {
                console.log(error);
              }
            };
            increasePeaple();
            console.log("선택방번호:", props.data, selectedIdx);
            for (let i = 0; i < Number(props.data.length); i++) {
              if (props.data[i].id === selectedIdx) {
                sessionStorage.setItem("storeName", props.data[i].store_name);
                sessionStorage.setItem(
                  "roomTitle",
                  props.data[i].title.toString()
                );
                sessionStorage.setItem(
                  "superUser",
                  props.data[i].super_user_id.toString()
                );
                sessionStorage.setItem(
                  "enterBoxId",
                  props.data[i].box.box_id.toString()
                );
                sessionStorage.setItem(
                  "selected StoreInfo",
                  props.data[i].store_id.toString()
                );
              }
            }
            navigate(`/Home/Chatroom/${selectedIdx}`);
          } else navigate("/Auth");
        }}
      />
    </Box>
  );
}

export default TableList;

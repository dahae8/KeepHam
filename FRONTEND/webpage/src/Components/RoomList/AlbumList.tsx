import { exRooms } from "@/Pages/RoomList/RoomList.tsx";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 타입
type propsType = {
  data: exRooms[];
};

type imgListType = {
  img: string;
  title: string;
  storeName: string;
  featured: boolean;
  key: number;
  id: number;
};

function AlbumList(props: propsType) {
  const navigate = useNavigate();
  const roomData: imgListType[] = props.data.map((room, idx) => {
    const imgUrl = (category: string): string => {
      if (category === "1인분주문") return "/category/category-onedish.png";
      else if (category === "프랜차이즈") return "/category/category-10.png";
      else if (category === "치킨") return "/category/category-02.png";
      else if (category === "피자양식") return "/category/category-03.png";
      else if (category === "중식") return "/category/category-04.png";
      else if (category === "한식") return "/category/category-05.png";
      else if (category === "일식돈까스") return "/category/category-06.png";
      else if (category === "족발보쌈") return "/category/category-07.png";
      else if (category === "야식") return "/category/category-08.png";
      else if (category === "분식") return "/category/category-09.png";
      else if (category === "카페디저트") return "/category/category-11.png";
      else return "/category/category-convenience-store.png";
    };

    return {
      img: imgUrl(room.category),
      title: room.title,
      storeName: room.store_name,
      featured: true,
      key: idx,
      id: room.id,
    };
  });

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        flexWrap="wrap"
        width={"100%"}
        height={500}
        overflow={"auto"}
        useFlexGap
        padding={2}
        borderRadius={8}
        sx={{
          backgroundColor: "#EEF2FF",
        }}
      >
        {roomData.map((item) => (
          <Box
            onClick={() => {
              sessionStorage.setItem(
                "storeName",
                props.data[item.id].store_name
              );
              sessionStorage.setItem(
                "roomTitle",
                props.data[item.id].title.toString()
              );
              sessionStorage.setItem(
                "superUser",
                props.data[item.id].super_user_id.toString()
              );
              sessionStorage.setItem(
                "enterBoxId",
                props.data[item.id].box.box_id.toString()
              );
              sessionStorage.setItem(
                "selected StoreInfo",
                props.data[item.id].store_id.toString()
              );
              navigate(`/Home/Chatroom/${item.id}`);
            }}
            sx={{
              width: { xs: 120, md: 212 },
              height: { xs: 120, md: 212 },
              backgroundImage: `url("${item.img}")`,
              backgroundSize: "cover",
              borderRadius: 8,
              boxShadow: 8,
            }}
            key={item.id}
          >
            <Box
              sx={{
                width: "90%",
              }}
            >
              <Stack direction="row" justifyContent="end">
                <Typography
                  variant="body1"
                  sx={{
                    marginX: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
              <Divider />
              <Typography
                variant="body2"
                sx={{
                  marginX: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                주문 가게: {item.storeName}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
}

export default AlbumList;

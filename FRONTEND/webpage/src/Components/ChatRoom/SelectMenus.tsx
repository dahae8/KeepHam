import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";

export interface menuInfo {
  item: number;
  store_id: number;
  original_image: string;
  review_count: number;
  subtitle: string;
  description: string;
  price: number;
  slug: string;
  image: string;
  section: string;
  top_displayed_item_order: number;
  reorder_rate_message: "";
  menu_set_id: number;
  id: number;
  name: string;
  count: number;
}

type propsType = {
  menuList: menuInfo[];
  setCount: (id: number, count: number) => void;
  selectable: boolean;
};

function SelectMenus(props: propsType) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "#D8DADF",
      }}
    >
      <List sx={{ width: "100%" }}>
        {props.menuList.map((menu) => {
          return (
            <>
              <ListItem alignItems="flex-start" key={menu.id}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    overflow: "clip",
                    borderRadius: 4,
                    margin: 1,
                    boxShadow: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 60,
                      backgroundSize: "cover",
                      backgroundImage: `url("${menu.image}")`,
                    }}
                  ></Box>
                </Box>

                <ListItemText
                  primary={menu.name}
                  secondary={
                    <React.Fragment>
                      {menu.price}원{}
                    </React.Fragment>
                  }
                />
                <IconButton
                  disabled={!props.selectable}
                  onClick={() => {
                    props.setCount(menu.id, 1);
                  }}
                >
                  <AddBox />
                </IconButton>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="h6"
                  color="text.primary"
                >
                  {menu.count}
                </Typography>

                <IconButton
                  disabled={!props.selectable || menu.count == 0}
                  onClick={() => {
                    props.setCount(menu.id, -1);
                  }}
                >
                  <IndeterminateCheckBox />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </Box>
  );
}

export default SelectMenus;

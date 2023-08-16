import React, { useEffect, useState } from "react";
import PocketContainer from "@/Components/Pocket/PocketContainer.tsx";
import "../../Styles/font.css";
import "../../Styles/button.css";
import axios from "axios";

// interface Item {
//   id: number;
//   date: Date;
//   title: string;
//   amount: number;
//   amountType: string;
// }

const Payment: React.FC = () => {
  // const items: Item[] = [
  //   {
  //     id: 0,
  //     date: new Date("2023-08-07"),
  //     title: "aasdf",
  //     amount: 17000,
  //     amountType: "income",
  //   },
  //   {
  //     id: 1,
  //     date: new Date("2023-08-05"),
  //     title: "test",
  //     amount: 1500,
  //     amountType: "expense",
  //   },
  //   {
  //     id: 2,
  //     date: new Date("2023-08-06"),
  //     title: "test2",
  //     amount: 13500,
  //     amountType: "expense",
  //   },
  // ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    const AccessToken = sessionStorage.getItem("AccessToken");
    console.log("AccessToken", AccessToken);

    const fetchPayment = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/payment";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ` + AccessToken,
          },
        });
        console.log(response.data.body);

        console.log(response);
        setItems(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayment();
    console.log("items", items);
  }, []);

  // useEffect(() => {

  //   const localItemsJSON = sessionstorage.getItem("items");

  //   if (localItemsJSON === null) {
  //     sessionstorage.setItem("items", JSON.stringify(items));
  //   } else {
  //     const localItems: Item[] = JSON.parse(localItemsJSON);
  //     const copyLocalItems = localItems.map((item) => ({
  //       ...item,
  //       date: new Date(item.date),
  //     }));
  //     sessionstorage.setItem("items", JSON.stringify(copyLocalItems));
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionstorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  return (
    <>
      <PocketContainer items={items} />
    </>
  );
};

export default Payment;

import React, { useEffect } from "react";
import PocketContainer from "../../Components/Pocket/PocketContainer";
import "../../Styles/font.css";
import "../../Styles/button.css";

interface Item {
  id: number;
  date: Date;
  title: string;
  amount: number;
  amountType: string;
}

const Payment: React.FC = () => {
  const items: Item[] = [
    {
      id: 0,
      date: new Date("2023-08-07"),
      title: "aasdf",
      amount: 17000,
      amountType: "income",
    },
    {
      id: 1,
      date: new Date("2023-08-05"),
      title: "test",
      amount: 1500,
      amountType: "expense",
    },
    {
      id: 2,
      date: new Date("2023-08-06"),
      title: "test2",
      amount: 13500,
      amountType: "expense",
    },
  ];

  useEffect(() => {
    const localItemsJSON = localStorage.getItem("items");

    if (localItemsJSON === null) {
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      const localItems: Item[] = JSON.parse(localItemsJSON);
      const copyLocalItems = localItems.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      localStorage.setItem("items", JSON.stringify(copyLocalItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <PocketContainer items={items} />
    </>
  );
};

export default Payment;
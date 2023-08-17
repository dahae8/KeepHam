import React, { useState, useMemo, useCallback } from "react";
import PocketStatus from "./PocketStatus";
import PocketList from "./PocketList";
import "./PocketContainer.css";

export const FilterContext = React.createContext<{
  onChangeFilter: (selectedYear: string) => void;
  filteredItems: Item[];
  filterBaseYear: string;
  filteredExpenses: Item[];
}>({
  onChangeFilter: () => {},
  filteredItems: [],
  filterBaseYear: "",
  filteredExpenses: [],
});

interface Item {
  info: string;
  insert_time: Date;
  price: number;
  total_point: number;
}

interface PocketContainerProps {
  items: Item[];
}

const PocketContainer: React.FC<PocketContainerProps> = (props) => {
  const initialFilterBaseYear = new Date().getFullYear().toString();
  const [filterBaseYear, setFilterBaseYear] = useState<string>(initialFilterBaseYear);
  let filteredItems: Item[] = [];
  let filteredExpenses: Item[] = [];

  if (props.items.length > 0) {
    filteredItems = props.items.filter(
      (item) => new Date(item.insert_time).getFullYear().toString() === filterBaseYear
    );

    filteredExpenses = filteredItems.filter(
      (item) => item.info === "expense"
    );
  }

  const onChangeFilter = useCallback((selectedYear: string) => {
    setFilterBaseYear(selectedYear);
  }, []);

  const memoizedFilter = useMemo(() => {
    return { onChangeFilter, filteredItems, filterBaseYear, filteredExpenses };
  }, [filteredItems, filterBaseYear]);

  return (
    <div className="pocket__container">
      <FilterContext.Provider value={memoizedFilter}>
        <PocketStatus items={props.items}/>
        <PocketList />
      </FilterContext.Provider>
    </div>
  );
};

export default PocketContainer;
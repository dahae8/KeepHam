import SelectStep1 from "@/Components/ChatRoom/selectStep_1.tsx";
import SelectStep2 from "@/Components/ChatRoom/selectStep_2.tsx";
import { useState } from "react";

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

export type propsType = {
  menuList: menuInfo[];
  setCount: (id: number, count: number) => void;
  roomId: number;
  storeName: string;
  superUser: string;
  step: number;
  totalPoint: number;
  setStep: (step: number) => void;
};

function SelectMenus(props: propsType) {
  const [currentStep, setCurrentStep] = useState<number>(props.step);

  function updateStep(step: number) {
    setCurrentStep(step);
  }

  return (
    <>
      {props.step == 0 && (
        <SelectStep1
          menuList={props.menuList}
          setCount={props.setCount}
          roomId={props.roomId}
          storeName={props.storeName}
          superUser={props.superUser}
          step={currentStep}
          totalPoint={props.totalPoint}
          setStep={updateStep}
        />
      )}
      {props.step == 1 && (
        <SelectStep2
          menuList={props.menuList}
          setCount={props.setCount}
          roomId={props.roomId}
          storeName={props.storeName}
          superUser={props.superUser}
          step={currentStep}
          totalPoint={props.totalPoint}
          setStep={updateStep}
        />
      )}
    </>
  );
}

export default SelectMenus;

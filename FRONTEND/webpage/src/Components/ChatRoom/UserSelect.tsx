// function UserSelect() {
//   return (
//     <>
//       <div>UserSelect</div>
//     </>
//   );
// }

// export default UserSelect;
import MiniGame from "../Chatt/MiniGame";

interface MyComponentProps {
  roomId: number;
  // 다른 프로퍼티들도 정의할 수 있습니다.
}

const UserSelect: React.FC<MyComponentProps> = (props) => {
  return (
    <>
      <div>
        <MiniGame roomId={props.roomId} />
      </div>
    </>
  );
};

export default UserSelect;
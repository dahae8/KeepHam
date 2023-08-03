type propsType = {
  boxId: number;
};

function AlbumList(props: propsType) {
  return <div>albumList {props.boxId}</div>;
}

export default AlbumList;

type propsType = {
  areaId: number;
};

function AlbumList(props: propsType) {
  return <div>albumList {props.areaId}</div>;
}

export default AlbumList;

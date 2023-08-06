

type propsType = {
  location: string;
};

function MapList(props: propsType) {

  const userLocation = props.location;

  console.log(userLocation);
  
  return (
    <>
      <div>mapList</div>
    </>
  )
}

export default MapList
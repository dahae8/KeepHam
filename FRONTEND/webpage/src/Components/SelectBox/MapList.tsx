

type propsType = {
  zipCode: number;
};

function MapList(props: propsType) {

  const userZipCode = props.zipCode;

  console.log(userZipCode);
  
  return (
    <>
      <div>mapList</div>
    </>
  )
}

export default MapList
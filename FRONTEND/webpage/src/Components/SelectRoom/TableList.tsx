

type propsType = {
  location: string;
};

function TableList(props: propsType) {

  const userLocation = props.location;

  console.log(userLocation);

  return (
    <>
      <div>tableList</div>
    </>
  )
}

export default TableList
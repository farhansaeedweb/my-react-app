function Students(props) {
  console.log("Props: ", props);
  return (
    <>
      <h2>Name: {props.name}</h2>
      <h2>age: {props.age}</h2>
      <h2>city: {props.city}</h2>
    </>
  );
}

export default Students;

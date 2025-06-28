function BoxComponent(props) {
  return (
    <div className='Box' onClick={props.onClick}>
      <img src={props.image} alt={props.text} />
      <div className="text">
        <p>At</p>
        <h1>{props.text}</h1>
      </div>
    </div>
  );
}
  
export default BoxComponent;
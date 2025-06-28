import BoxComponent from "./BoxComponent";

function StartPage() {
  return (
    <div className='StartPage'>
      <BoxComponent image="./Office.png" text="OFFICE" />
      <BoxComponent image="./Party.png" text="PARTY" />
      <BoxComponent image="./College.png" text="COLLEGE" />
      <BoxComponent image="./Market.png" text="MARKET" />
    </div>
  );
}
  
export default StartPage;
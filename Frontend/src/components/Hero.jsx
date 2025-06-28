import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='Hero'>
      <div className='HeroImage'>
        <img src="./GirlConfusedClothes.png" alt="A confused girl with clothes" />
      </div>
      <div className='Value'>
        <div className='message'>
          <h3>Let us help you</h3>
          <h2>Decide</h2>
          <h3>What to wear?</h3>
        </div>
        <div className='CTA'>
          <Link to="/register"><button>START</button></Link>
        </div>    
      </div>
    </div>
  );
}

export default Hero;

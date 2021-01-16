import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {

return (
  <>
  <section className="homepage">
    {/* <div className="main-page-image">
        </div> */}
    {/* <div className="text-box"> */}
      {/* <h1 className="heading-primary">
      <span className="heading-title"> */}
        {/* Plant Gallerie
        </span>
      </h1>
    </div> */}
    <h1>Plant Gallerie</h1>
    <article>
      <p>
        buy 3 plants for $200
      </p>
      <p>plus free shipping</p>
      <button className="main-image-button" id="shopButton">
        <Link to="/products" className='allProdLink'>Shop Now
        </Link>
      </button>
    </article>
    {/* <div className="main-page-subtext">
      <span className="heading-main">buy 3 plants for $200</span>
      <span className="heading-main-sub">plus free shipping</span>
      <button className="main-image-button" id="shopButton">
        <Link to="/products" className='allProdLink'>Shop Now
        </Link>
      </button>
    </div> */}
  </section>
  </>
)
}

export default Home;
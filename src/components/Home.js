import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const Home = (props) => {
  const { search, setSearch } = props
  const slideImages = [
    'https://www.plants.com/images/vday-hp-hero_20210126-1611688063331.jpg',
    'https://cdn-yotpo-images-production.yotpo.com/instagram/26/17845191269080826/standard_resolution.jpg',
    'https://cdn-yotpo-images-production.yotpo.com/instagram/19/18079210213196619/standard_resolution.jpg',
    'https://i.pinimg.com/564x/f8/1d/4b/f81d4b822d3d4f2651a66b621db61de7.jpg',
  ]
  return (
    <>
      <section className="homepage">
        <div className="slide-container">
          <Slide>
            <div className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${slideImages[0]} )`,
                  height: '1800px',
                  backgroundRepeat: 'no-repeat',
                  height: '100vh',
                }}
              >
                <h1 className="header-heading">Plant Gallerie</h1>
                <article style={{ color: 'white' }} className="article-heder">
                  <p>Buy 3 plants for $200</p>
                  <p>Plus free shipping</p>
                  <button className="main-image-button" id="shopButton">
                    <Link to="/products" className="allProdLink">
                      Shop Now
                    </Link>
                  </button>
                </article>
              </div>
            </div>
            <div className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${slideImages[1]} )`,
                  height: '100vh',
                  width: '100wh',
                  marginLeft: '200px',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <h1 className="header-heading">Plant Gallerie</h1>
                <article className="article-heder">
                  <p>Buy 3 plants for $200</p>
                  <p>Plus free shipping</p>
                  <button className="main-image-button" id="shopButton">
                    <Link to="/products" className="allProdLink">
                      Shop Now
                    </Link>
                  </button>
                </article>
              </div>
            </div>
            <div className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${slideImages[2]})`,
                  height: '100vh',
                  backgroundRepeat: 'no-repeat',
                  marginLeft: '300px',
                }}
              >
                <h1 className="header-heading">Plant Gallerie</h1>
                <article className="article-heder">
                  <p>Buy 3 plants for $200</p>
                  <p>Plus free shipping</p>
                  <button className="main-image-button" id="shopButton">
                    <Link to="/products" className="allProdLink">
                      Shop Now
                    </Link>
                  </button>
                </article>
              </div>
            </div>
          </Slide>
        </div>
      </section>
    </>
  )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = (props) => {
  const { search, setSearch } = props
  return (
    <>
      <section className="homepage">
        <h1>Plant Gallerie</h1>
        <article>
          <p>buy 3 plants for $200</p>
          <p>plus free shipping</p>
          <button className="main-image-button" id="shopButton">
            <Link to="/products" className="allProdLink">
              Shop Now
            </Link>
          </button>
        </article>
      </section>
    </>
  )
}

export default Home

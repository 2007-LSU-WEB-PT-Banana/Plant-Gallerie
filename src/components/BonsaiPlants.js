import React from 'react'

const BonsaiPlants = (props) => {
  const { productList, setActiveProduct, history, search, setSearch } = props

  return (
    <>
      <h1 className="productsHeader">Bonsai and Bamboo</h1>
      <div className="allProducts">
        {productList.map((product, index) => {
          if (product.category === 'Bonsai') {
            return (
              <div
                className="productCard"
                id="modal"
                key={index}
                onClick={(event) => {
                  event.preventDefault()
                  setActiveProduct(product)
                  history.push(`/products/${product.id}`)
                }}
              >
                <img
                  src={product.imageURL}
                  alt="bonsai or bamboo plant"
                  height="200"
                  width="200"
                ></img>
                <p className="productName">{product.name}</p>
                <p className="productPrice">${product.price}</p>
              </div>
            )
          }
          return
        })}
      </div>
    </>
  )
}

export default BonsaiPlants

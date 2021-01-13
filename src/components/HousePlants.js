import React from 'react';

const HousePlants = (props) => {
  const { productList, setActiveProduct, history } = props;

return (
  <>
  <h1 className="productsHeader">Bonsai and Bamboo Plants</h1>
  <div className="allProducts">
    {productList.map((product, index) => {
      if(product.category == "HousePlant") {
        return (
          <div 
          className="productCard" 
          id="modal"
          key={index} 
          onClick={(event) => {
            event.preventDefault();
            setActiveProduct(product);
            history.push("/products/:productId");
          }}>
            <img src={product.imageURL} height="200" width="200"></img>
            <p className="productName">{product.name}</p>
            <p className="productPrice">${product.price}</p>
          </div>
        )
      }
    })}
  </div>
  </>
)
}

export default HousePlants;
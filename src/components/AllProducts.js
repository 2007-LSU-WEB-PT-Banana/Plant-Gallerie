import React from 'react';

const AllProducts = (props) => {
  const { productList, history, setActiveProduct } = props;



return (
  <>
  <h1 className="productsHeader">All Plants</h1>
  <div className="allProducts">
    {productList.map((product, index) => {
      return (
        <div 
        className="productCard" 
        id="modal"
        key={index} 
        onClick={(event) => {
          event.preventDefault();
          setActiveProduct(product);
          history.push(`/products/${product.id}`);
        }}>
          <img src={product.imageURL} alt="plant" height="200" width="200"></img>
          <p className="productName">{product.name}</p>
          <p className="productPrice">${product.price}</p>
        </div>
      )
    })}
  </div>
  </>
)

}

export default AllProducts;
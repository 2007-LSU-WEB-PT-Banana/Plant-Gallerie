// // Connect to DB
const { Client } = require("pg");
const bcrypt = require("bcrypt");

const DB_NAME = "plant-gallery";
const DB_URL =
	process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL, { username: "postgres" });

const createUser = async ({
	firstName,
	lastName,
	email,
	imageURL,
	username,
	password,
}) => {
	try {
		console.log("creating users");

		const {
			rows: [user],
		} = await client.query(
			`
    INSERT INTO users("firstName","lastName" ,email,"imageURL", username , password )
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *; 
    `,
			[firstName, lastName, email, imageURL, username, password]
		);

		const hashPassword = await bcrypt.hash(user.password, 5);

		user.password = hashPassword;

		return user;
	} catch (error) {
		console.log("cant create user");
		throw error;
	}
};

const getAllUsers = async () => {
	console.log("users live here");
	try {
		const { rows: allUsers } = await client.query(`
    SELECT * 
    FROM users;
 `);
		console.log("these are users", allUsers);
		allUsers.map((user) => {
			return delete user.password;
		});
		return allUsers;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (id) => {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
    SELECT *
    FROM users
    WHERE id=$1;
    `,
			[id]
		);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
};

const getUserByUsername = async (username) => {
	console.log("inside db");
	try {
		const {
			rows: [user],
		} = await client.query(
			`
    SELECT *
    FROM users 
    WHERE username=$1;
    `,
			[username]
		);
		console.log("required user is ", user);

		console.log("existing user by user function");
		return user;
	} catch (error) {
		throw error;
	}
};

const createProduct = async ({
	name,
	description,
	price,
	imageURL,
	inStock,
	category,
}) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
  INSERT INTO products (name, description, price,"imageURL", "inStock",category)
  VALUES($1,$2,$3,$4,$5,$6)
  RETURNING *;
  `,
			[name, description, price, imageURL, inStock, category]
		);
		return product;
	} catch (error) {
		throw error;
	}
};

const getAllProducts = async () => {
	try {
		const { rows: products } = await client.query(`
    SELECT *
    FROM products;
    `);

		
		return products;
	} catch (error) {
		throw error;
	}
};

const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * 
    FROM products
    WHERE id=$1;
    `,
      [id],
    )

    if (!product) {
      throw {
        message: 'Could not find a product with that name/id',
      }
    }

    return product
  } catch (error) {
    throw error
  }
}


// const createOrder = async ({ status, orderId, datePlaced }) => {
//   try {
//     const {
//       rows: [order],
//     } = await client.query(
//       `
//     INSERT INTO orders(status, "orderId", "datePlaced")
//     VALUES($1,$2,$3)
//     RETURNING *;
//     `,
//       [status, orderId, datePlaced],
//     )
//     return order
//   } catch (error) {
//     throw error
//   }
// }

//This is Evon's function.
const createOrder = async ({status='created', userId})=>{
  try {
   
      const {rows: [order]} = await client.query(`
      INSERT INTO orders(status, "userId") 
      VALUES ($1, $2)
      RETURNING *
      `, [status, userId])

      console.log("making orders");

		order.datePlaced = new Date();

      return order
   
  } catch (error) {
      console.error(error)
  }
}

//This function needs to be tested.
// const getCartByUserId= async (id) => {

//   try{
//       const {rows: [cartOrder] } = await client.query(`
//           SELECT * FROM orders 
//           WHERE "userId"=$1 AND status='created'
//       `,[id])
      

//       const productsOrdered = await getOrderProductByOrderId(cartOrder.id);
//       const productsInOrder = await Promise.all(productsOrdered.map(async (productsOrdered) =>{
//         const newProduct = await getProductById(productsOrdered.productId)
//         return newProduct;
//       }))
//       if(productsOrdered && productsInOrder){
//         cartOrder.productsOrdered = productsOrdered;
//         cartOrder.productsInOrder = productsInOrder;
//       }else{
//         cartOrder.productsOrdered = [];
//         cartOrder.productsInOrder = [];
//       }

    
//       return cartOrder


//   }catch(error){
//       console.log(error)
//   }

// }

const getAllOrders = async () => {
	try {
		const { rows: allOrders } = await client.query(`
    SELECT *
    FROM orders;
    `);
		const orders = await Promise.all(
			allOrders.map((order) => {
				return getOrdersByProduct(order.id);
			})
		);

		return orders;
	} catch (error) {
		throw error;
	}
};

const getOrdersByUser = async (userId) => {
	try {
		const { rows: OrderIds } = await client.query(`
    SELECT id
    FROM orders
    WHERE "userId"=${userId};
    `);
		const orders = await Promise.all(
			OrderIds.map((order) => getOrderById(order.id))
		);
		return orders;
	} catch (error) {
		throw error;
	}
};

const getOrderById = async (orderId) => {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
    SELECT *
    FROM orders
    WHERE id=$1; 
    `,
			[orderId]
		);
		console.log("order", order);
		return order;
	} catch (error) {
		throw error;
	}
};

//I don't think this function is going to work. Maybe we should call "getOrderById" below
//instead of getProductById
const getCartByUser = async ({id}) => {
	try {
		const { rows: cartOrder } = await client.query(
			`
    SELECT *
    FROM orders
    WHERE "userId"=$1 AND status='created';
    `,
			[id]
    );
    const orderProducts = await getOrderProductsByOrderId(cartOrder.id)
    const products = await Promise.all(orderProducts.map(async (orderProduct) =>{

        const product = await getProductById(orderProduct.productId)
        return product
    }))

    if(orderProducts && products){
    cartOrder.orderProducts = orderProducts
    cartOrder.products = products}else{
        cartOrder.orderProducts = []
        cartOrder.products = []
    }
	
		return cartOrder;
	} catch (error) {
		throw error;
	}
};

const getOrdersByProduct = async (id) => {
	try {
		const { rows: productIds } = await client.query(
			`
      SELECT *
      FROM order_products
      JOIN orders ON order_products."orderId" = orders.id
      JOIN products ON order_products."productId"=${id};
    `
		);
		console.log("product ids are ", productIds);
		const allProducts = productIds.map((product) => {
			return getProductById(product.id);
		});
		return allProducts;
	} catch (error) {
		throw error;
	}
};

const getOrderByProductId = async (id) =>{
  try{
const {rows: [orderProduct]} = await client.query(`
SELECT * 
FROM order_products
WHERE id=$1;
`, [id]);
return orderProduct;

  }catch(error){
    throw(error)
  }
}
const getOrderProductByOrderId = async (orderId) => {
  try{
    const {rows: [orderProduct]} = await client.query(`
SELECT * 
FROM order_products
WHERE "orderId"=$1;
`, [orderId]);
return orderProduct;

  }catch(error){
    throw error;
  }
}

const addProductToOrder = async ({orderId, productId, price, quantity}) => {
  try{
    const orderProduct = await getOrderProductByOrderId(id);

    if(orderProduct.length < 1){
      const {rows: [productOrdered] } = await client.query(`
      INSERT INTO order_products ("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `, [[productId, orderId, price, quantity]])
      return productOrdered
    }
    else{
      for(let i=0; i< orderProduct.length; i++){
        if(orderProduct[i].productId === productId){
          const {rows: [productOrder]} = await client.query(`
                    UPDATE order_products SET (price, quantity) = 
                    ($1, $2) WHERE "productId" = $3 AND "orderId" = $4
                    RETURNING *
                `, [ price, quantity,productId, orderId])

               return productOrder
        
      }else if (orderProduct[orderProducts.length-1].productId !== productId && i === orderProduct.length-1){
          const {rows: [productOrder]} = await client.query(`
          INSERT INTO order_products ("productId", "orderId", price, quantity)
          VALUES ($1, $2, $3, $4)
          RETURNING *`, [productId,orderId, price, quantity])
          return productOrder;
      }
    }
  }
  }catch (error){
    throw error;
  }
}



const updateOrderProduct = async ({id, price, quantity}) =>{

  try{
    const originalOrderProduct = await getOrderByProductId(id);

    if(!price){
      originalOrderProduct.price = price;
    }
    if(!quantity){
      originalOrderProduct.quantity = quantity;
    }

    const {rows: [orderProduct]} = await client.query(`

    UPDATE order_products original
    SET price=$2,
    quantity=$3
    WHERE original.id=$1
    RETRUNING *;
    `, [id,price,quantity]);
    console.log("update order produc", orderProduct)
    return orderProduct;

  }catch(error){
    throw error
  }
}
const destroyOrderProduct = async (id) =>{
  console.log("the id is ", id)
  try{
    const { rows: [orderProduct] } = await client.query(`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING *
      `, [id]);
      return orderProduct;

  }catch(error){
    throw error
  }
}

async function getOrderProductsByOrderId(orderId){
  try {
      const {rows: orderProducts} = await client.query(`
          SELECT * FROM order_products
          WHERE "orderId" = $1
      `,[orderId])
      return orderProducts
  } catch (error) {
      console.error(error)
  }
}




// export
module.exports = {
  client,
  // db methods
  // requireUser,
  // requireActiveUser,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createProduct,
  getProductById,
  getAllProducts,

  createOrder,
  getOrderByProductId,
  destroyOrderProduct,
  updateOrderProduct,
  addProductToOrder,
  getOrdersByProduct,
  getOrdersByUser,
  getAllOrders,
  getOrderProductByOrderId,
  getCartByUser,
  getOrderProductsByOrderId,

}

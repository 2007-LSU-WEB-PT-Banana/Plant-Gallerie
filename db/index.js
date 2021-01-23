// // Connect to DB
const { Client } = require('pg')
const bcrypt = require('bcrypt')

const DB_NAME = 'plantgallery'
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`
const client = new Client(DB_URL, { username: 'postgres' })

//this function is working - do not edit this code!
const createUser = async ({
  firstName,
  lastName,
  email,
  imageURL,
  username,
  password,
}) => {
  try {
    console.log('creating users')

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users("firstName","lastName" ,email,"imageURL", username , password )
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *; 
    `,
      [firstName, lastName, email, imageURL, username, password],
    )

    const hashPassword = await bcrypt.hash(user.password, 5)

    user.password = hashPassword

    return user
  } catch (error) {
    console.log('cant create user')
    throw error
  }
}

//this function is working - do not edit this code!
const getAllUsers = async () => {
  console.log('users live here')
  try {
    const { rows: allUsers } = await client.query(`
    SELECT * 
    FROM users;
 `)
    console.log('these are users', allUsers)
    allUsers.map((user) => {
      return delete user.password
    })
    return allUsers
  } catch (error) {
    throw error
  }
}

//this function is working - do not edit this code!
const getUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT username, password,id
    FROM users
    WHERE username=$1 AND password=$2;
    `,
      [username, password],
    )
    return user
  } catch (error) {
    throw error
  }
}

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
      [id],
    )
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}

//this function is working - do not edit this code!
const getUserByUsername = async ({ username }) => {
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
    )
    return user
  } catch (error) {
    throw error
  }
}

//this function is working - do not edit this code!
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
      [name, description, price, imageURL, inStock, category],
    )
    return product
  } catch (error) {
    throw error
  }
}

const getAllProducts = async () => {
  try {
    const { rows: allProducts } = await client.query(`
    SELECT *
    FROM products;
    `)
    return allProducts
  } catch (error) {
    throw error
  }
}

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
      [productId],
    )

    if (!product) {
      throw {
        message: 'Could not find a product with that name/id',
      }
    }

    console.log('product is here', product)

    return product
  } catch (error) {
    throw error
  }
}

//this function is working - do not edit this code!
const createOrder = async ({ status, userId, products }) => {
  datePlaced = new Date()

  try {
    console.log('creating order')
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders(status,"userId", "datePlaced")
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [status, userId, datePlaced],
    )
    console.log('this is order id', order.id)
    const newOrder = await addProductsToOrder(order.id, products)

    return newOrder
  } catch (error) {
    throw error
  }
}

const getAllOrders = async () => {
  try {
    const { rows: allOrders } = await client.query(`
    SELECT *
    FROM orders;
    `)
    const orders = await Promise.all(
      allOrders.map((order) => {
        return getOrdersByProduct(order.id)
      }),
    )

    return orders
  } catch (error) {
    throw error
  }
}

const getOrdersByUser = async (userId) => {
  try {
    const { rows: OrderIds } = await client.query(`
    SELECT id
    FROM orders
    WHERE "userId"=${userId};
    `)
    const orders = await Promise.all(
      OrderIds.map((order) => getOrderById(order.id)),
    )
    return orders
  } catch (error) {
    throw error
  }
}

//this function is working - do not edit this code!
const getOrderById = async (orderId) => {
  console.log('hitting this route')
  console.log('id in db', orderId)
  try {
    const { rows: order } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON order_products."orderId"=orders.id
      JOIN products ON products.id=order_products."productId"
      WHERE "orderId"=$1;    
      `,
			[orderId]
		);

		if (!order) {
			throw {
				name: "OrderNotFoundError",
				message: "Could not find an order with that order ID",
			};
		} else {
			return order;
		}
	} catch (error) {
		throw error;
	}
};

const getOrderProductsById = async (orderId) => {
  try {
    const { rows: products } = await client.query(
      `
      SELECT *
      FROM order_products
      WHERE "orderId"=$1;
    `,
      orderId,
    )

    return products
  } catch (error) {
    throw error
  }
}

//this function works - do not edit this code!
// const getCartByUser = async (userId) => {
// 	try {
// 		const { rows: userCart } = await client.query(
// 			`
//     SELECT *
//     FROM orders
//     JOIN products ON
//     WHERE "userId"=$1 AND status='created';
//     `,
// 			[userId]
// 		);
// 		const orders = await Promise.all(
// 			userCart.map((order) => getOrderById(order.id))
// 		);
// 		return orders;
// 	} catch (error) {
// 		throw error;
// 	}
// };

//this function works - do not edit code!
const getCartByUser = async (userId) => {
	try {
		const { rows: orders } = await client.query(
			`
    SELECT *
    FROM orders
    WHERE "userId"=$1 AND status='created';
    `,
			[userId]
		);
		console.log("the orders are", orders);

		const openOrders = await Promise.all(
			orders.map((order) => getOrderById(order.id))
		);

		return openOrders;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createOrderProducts = async ({ productId, orderId, price, quantity }) => {
  console.log('productId', productId)
  console.log('orderId', orderId)
  console.log('price', price)
  console.log('quantity', quantity)
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      INSERT INTO order_products("productId","orderId", price, quantity)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `,
			[productId, orderId, price, quantity]
		);
		console.log("order-products are:", orderProduct);
		return orderProduct;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const addProductsToOrder = async (orderId, productList) => {
  console.log('i isde addProduvts to order')
  try {
    const createOrderProductsPromises = productList.map((product) =>
      createOrderProducts({
        productId: product.id,
        orderId,
        price: product.price,
        quantity: product.quantity,
      }),
    )

    await Promise.all(createOrderProductsPromises)
    return await getOrderById(orderId)
  } catch (error) {
    throw error
  }
}

const getOrdersByProduct = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON order_products."orderId"=orders.id
      JOIN products ON products.id=order_products."productId"
      WHERE "orderId"=$1; 
    `,
      [id],
    )

    return orders
  } catch (error) {
    throw error
  }
}

//i don't think this is going to work because this is selecting from
//order_products not orders.
const getOrderByProductId = async (id) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
SELECT * 
FROM order_products
WHERE id=$1;
`,
			[id]
		);
		return orderProduct;
	} catch (error) {
		throw error;
	}
};

const getOrderProductByOrderId = async (orderId) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
SELECT * 
FROM order_products
WHERE "orderId"=$1;
`,
      [orderId],
    )
    return orderProduct
  } catch (error) {
    throw error
  }
}

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
  try {
    const orderProduct = await getOrderProductByOrderId(id)

    if (orderProduct.length < 1) {
      const {
        rows: [productOrdered],
      } = await client.query(
        `
      INSERT INTO order_products ("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
        [[productId, orderId, price, quantity]],
      )
      return productOrdered
    } else {
      for (let i = 0; i < orderProduct.length; i++) {
        if (orderProduct[i].productId === productId) {
          const {
            rows: [productOrder],
          } = await client.query(
            `
                    UPDATE order_products SET (price, quantity) = 
                    ($1, $2) WHERE "productId" = $3 AND "orderId" = $4
                    RETURNING *
                `,
            [price, quantity, productId, orderId],
          )

          return productOrder
        } else if (
          orderProduct[orderProducts.length - 1].productId !== productId &&
          i === orderProduct.length - 1
        ) {
          const {
            rows: [productOrder],
          } = await client.query(
            `
          INSERT INTO order_products ("productId", "orderId", price, quantity)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
						[productId, orderId, price, quantity]
					);
					return productOrder;
				}
			}
		}
	} catch (error) {
		throw error;
	}
};

//this function works - do not edit this code!
const updateOrderProduct = async (orderId, { productId, price, quantity }) => {
	try {
		const originalOrderProduct = await getOrderProductsByOrderId(orderId);

		let index = originalOrderProduct.findIndex(
			(x) => x.productId === productId
		);
		let itemToUpdate = originalOrderProduct[index];
		itemToUpdate.price = price;
		itemToUpdate.quantity = quantity;

		const {
			rows: [orderProduct],
		} = await client.query(
			`
      UPDATE order_products
      SET price=$2,
      quantity=$3
      WHERE id=$1
      RETURNING *;
    `,
			[itemToUpdate.id, itemToUpdate.price, itemToUpdate.quantity]
		);

		const updatedOrder = await getOrderById(orderId);
		return updatedOrder;
	} catch (error) {
		throw error;
	}
};

const destroyOrderProduct = async (productId, orderId) => {
	console.log("the id is ", productId);
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
      DELETE FROM order_products
      WHERE "productId"=$1 AND "orderId"=$2
      RETURNING *
      `,
			[productId, orderId]
		);

		return await getOrderById(orderId);
	} catch (error) {
		throw error;
	}
};

//this function works - do not edit this code!
async function getOrderProductsByOrderId(orderId) {
  try {
    const { rows: orderProducts } = await client.query(
      `
          SELECT * FROM order_products
          WHERE "orderId" = $1
      `,
      [orderId],
    )
    return orderProducts
  } catch (error) {
    console.error(error)
  }
}

const getOrderByORDERID = async (orderId) => {
  try {
    const { rows: order } = await client.query(
      `
     SELECT *
     FROM order_products
     JOIN orders ON orders.id=${orderId};   
      `,
    )
    return order
  } catch (error) {
    throw error
  }
}

const updateOrder = async (orderId, { status, userId }) => {
  console.log('inisde update order')
  console.log('this is orderId', orderId)
  console.log('this is status', status)
  console.log('this is userId', userId)

  const orderToBeUpdtaed = getOrderByORDERID(orderId)
  orderToBeUpdtaed.status = status
  orderToBeUpdtaed.userId = userId
  console.log('this is status to be updatted', orderToBeUpdtaed.status)
  console.log('this is userId to be updated', orderToBeUpdtaed.userId)
  try {
    const {
      rows: [updatedOrder],
    } = await client.query(
      `
    UPDATE orders
    SET status=$2,
    "userId"=$3
    WHERE id=$1
    RETURNING *;
  `,
      [orderId, orderToBeUpdtaed.status, orderToBeUpdtaed.userId],
    )
    console.log('this is updateOrder', updatedOrder)
    return updatedOrder
  } catch (error) {
    throw error
  }
}

const completeOrder = async (orderId, status) => {
  const orderToBeCompleted = await getOrderById(orderId)
  orderId = orderToBeCompleted.orderId
  console.log('this is order to be completd', orderToBeCompleted)
  try {
    const {
      rows: [completeOrder1],
    } = await client.query(
      `
  UPDATE orders
  SET status=$2
  WHERE id=$1;
  `,
      [orderId, orderToBeCompleted.status],
    )
    return completeOrder1
  } catch (error) {
    throw error
  }
}

const cancelOrder = async (orderId, status) => {
  const orderToBeCancelled = await getOrderByORDERID(orderId)
  console.log('this is order required', orderToBeCancelled)
  orderId = orderToBeCancelled.orderId
  status = orderToBeCancelled.status

  try {
    const {
      rows: [cancelOrder],
    } = await client.query(
      `
    UPDATE orders
    SET status=$2
    where id=$1;
    `,
      [orderId, orderToBeCancelled.status],
    )

    return cancelOrder
  } catch (error) {
    throw error
  }
}

module.exports = {
	client,
	createUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
	createProduct,
	getProductById,
	getAllProducts,
	getCartByUser,
	createOrder,
	getOrdersByProduct,
	getAllOrders,
	getOrderById,
	getUser,
	getOrderProductsById,
	getOrdersByUser,
	addProductsToOrder,
	updateOrderProduct,
	destroyOrderProduct,
};

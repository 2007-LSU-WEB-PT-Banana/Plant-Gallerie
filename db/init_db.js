const {
	client,
	createProduct,
	getProductById,
	getAllProducts,
	createUser,
	getAllUsers,
	getUserById,
	// other db methods
} = require("./index");
// const { uuid } = require('uuidv4')
// const { v4: uuidv4 } = require('uuid')
async function buildTables() {
	try {
		client.connect();
		await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
		// drop tables in correct order
		await client.query(`

    DROP TABLE IF EXISTS order_products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
  `);
		// build tables in correct order
		console.log("creating tables");
		await client.query(`
    CREATE TABLE products(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      "imageURL" TEXT DEFAULT 'no picture' NOT NULL,
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category TEXT NOT NULL
    );
      CREATE TABLE users(
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        "imageURL" TEXT DEFAULT 'no picture' NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );
      CREATE TABLE orders(
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        status VARCHAR(255) DEFAULT 'created',
        "userId" uuid REFERENCES users(id),
        "datePlaced" DATE
      );
      CREATE TABLE order_products(
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "productId" uuid REFERENCES products(id),
        "orderId" uuid REFERENCES orders(id),
        price INTEGER NOT NULL ,
        quantity INTEGER NOT NULL DEFAULT 0
        );
    `);
  } catch (error) {
    throw error
  }
}
async function populateInitialData() {
	try {
		await createUser({
			firstName: "arman",
			lastName: "khalil",
			email: "abc@gmail.com",
			imageURL: "image url",
			username: "abc",
			password: "abcdefghi1",
			isAdmin: false,
		});
		await createUser({
			firstName: "fkhan",
			lastName: "khan",
			email: "fkhan@gmail.com",
			imageURL: "image url",
			username: "fkhan",
			password: "abcdefghi123",
			isAdmin: false,
		});
		await createProduct({
			name: "Juniper Bonsai",
			description:
				"Ever-beautiful and ready for creative shaping, this tiny tree has been cultivated for thousands of years to bring you calmness and serenity. But no pressure! Plant Perk: All about artful shaping and training, these trees are great for Zen relaxation.",
			price: 5999,
			imageURL:
				"https://www.plants.com/images/juniper_20200728-1595948327586.jpeg",
			inStock: true,
			category: "Bonsai",
		});
		await createProduct({
			name: "Money Tree Plant",
			description:
				"Known in certain cultures to bring good luck and fortune, the Money Tree offers a wealth of benefits - from dressing up the decor with its cool, braided trunk to bringing a fresh energy to any space.  Available with your choice of planter.",
			price: 5499,
			imageURL:
				"https://www.plants.com/images/157651-Money-Tree-Plant-M%20(1)_20201215-1608045628034.jpg",
			inStock: true,
			category: "HousePlant",
		});
		console.log("getting users");
		// create useful starting data
	} catch (error) {
		throw error;
	}
}
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end())


















const mysql =
require("mysql2/promise");


const pool =
require("../config/db");


const seedProducts =
require("../data/products");



async function ensureDatabaseExists(){


    const connection =
    await mysql.createConnection({

        host: process.env.DB_HOST || "localhost",

        port: process.env.DB_PORT || 3306,

        user: process.env.DB_USER,

        password: process.env.DB_PASSWORD

    });


    await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );


    await connection.end();


}



async function initDb(){


    await ensureDatabaseExists();


    await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL
        )
    `);


    await pool.query(`
        CREATE TABLE IF NOT EXISTS cart_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            product_id INT NOT NULL,
            product_name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            quantity INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);


    const [rows] =
    await pool.query(
        "SELECT COUNT(*) AS count FROM products"
    );


    if(rows[0].count === 0){


        for(const product of seedProducts){

            await pool.query(
                "INSERT INTO products (id, name, price, stock) VALUES (?, ?, ?, ?)",
                [product.id, product.name, product.price, product.stock]
            );

        }


    }


}


module.exports = initDb;

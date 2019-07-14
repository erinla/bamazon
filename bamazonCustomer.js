require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 8889,

    // Username
    user: "root",

    // Password
    password: process.env.password,
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // start();
    console.log("connected");
    displayProducts();
});


// 1. online stock should be able to display the list of products
function displayProducts() {
    connection.query('SELECT * FROM products', function (err, result, fields) {

        if (err) throw err;
        if (result) {
            console.log("Welcome to Bamazon! The following list will give you some details about the items we have in store.")
            for (var i = 0; i < result.length; i++) {

                console.log("-----------------------------")
                console.log('Item Id: ' + result[i].item_id);
                console.log("Product Name: " + result[i].product_name)
                console.log("Department: " + result[i].department_name)
                console.log("Price: " + result[i].price)
                console.log("-----------------------------")
            }
        }
        printQuestions()
    })
}

// 2. the user can select a product if she/he wants to buy it
//  how many items wants to buy
function printQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'idPromp',
                message: 'What is the ID number of the product you would like to buy?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nPlease enter a valid number.");
                }
            },
            {
                type: 'input',
                name: 'quantityPromp',
                message: 'How many would you like to buy?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nPlease enter a valid number.");
                }
            },

        ]).then(function (response) {
            console.log(response)
            var id = response.idPromp;
            var quantity = response.quantityPromp;
            // based on their answer, either call the bid or the post functions
            checkQuantity(id, quantity)
        });
}

// 3. Check if we have enough quantity
function checkQuantity(id, quantity) {
    connection.query('SELECT stock_quantity, price FROM products WHERE item_id=?', [id], function (err, result, field) {
        // err = true
        if (err) {
            throw err;
            console.log(result)
        }
        else {
            // console.log(result[0].stock_quantity);
            if (result[0].stock_quantity >= quantity) {
                var stockQuantity = result[0].stock_quantity - quantity;
                var itemPrice = result[0].price
                connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [stockQuantity, id], function (err, result) {
                    if (err) {
                        throw err;
                        console.log(err);
                    }
                    else {
                        console.log("Item price: " + itemPrice)
                        console.log("Your total cost was " + itemPrice * quantity)
                    }
                })
            } else {
                console.log("We do not have enough of this item. Please select a different quantity.")
            }
        }
    })
}


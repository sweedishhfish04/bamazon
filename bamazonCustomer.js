var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'bamazon'
});

connection.connect()

connection.query('SELECT * FROM products', function (err, results, fields) {
    results.forEach(item => {
        console.log(`id: ${item.item_id}\tProduct: ${item.product_name}\tPrice: $${item.price}`)
    })
    prompt.start();

    prompt.get(['id', 'units'], function (err, result) {
        var item = results.find(item => item.id === id)
        if (units <= item.stock_quantity) {
            connection.query(`UPDATE products SET stock_quantity ${item.stock_quantity - units} WHERE item_id = ${item.item_id}`, function (error, results, fields) {
                if (err) {
                    console.error('Error making order')
                } else {
                    console.log(`Total Cost: ${units * item.price}`)
                }
            })
        } else {
            console.log('Insufficient quantity!')
            connection.end()
        }
    });

});
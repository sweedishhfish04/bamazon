var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'bamazon'
});
var data = null;

connection.connect()

connection.query('SELECT * FROM products', function (err, results, fields) {
    results.forEach(item => {
        console.log(`id: ${item.item_id}\tProduct: ${item.product_name}\tPrice: $${item.price}`)
    })
    data = results;
    prompt.start();

    prompt.get(['id', 'units'], function (err, result) {
        //  console.log(data,results)
        var item = data.find(itm => {
         //   console.log(itm.item_id, result.id)
            return itm.item_id === parseInt(result.id)
        })
        console.log(item);
        if (parseInt(result.units) <= item.stock_quantity) {
            connection.query(`UPDATE products SET stock_quantity ${item.stock_quantity - parseInt(result.units)} WHERE item_id = ${item.item_id}`, function (error, results, fields) {
                if (err) {
                    console.error('Error making order')
                } else {
                    console.log(`Total Cost: ${parseInt(result.units) * item.price}`)
                }
            })
        } else {
            console.log('Insufficient quantity!')
            connection.end()
        }
    });

});
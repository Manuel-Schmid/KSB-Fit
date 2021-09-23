let mysql = require('mysql');
let connection = mysql.createConnection({
    host: '213.196.190.205',
    user: 'kfadmin',
    password: 'kfroot',
    database: 'kfdb',
    connectionLimit: 10
});

function testConnection() {
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
      
        console.log('Connected to the MySQL server.');
});
    
    
    // // function getUsers() {
        connection.query(`select * from kfdb.user;`, (err, res)=> {
            console.log(res);
            return res
        })
    // // }
    
      
    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = { testConnection }

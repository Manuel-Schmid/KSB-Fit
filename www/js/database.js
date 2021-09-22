const { createPool } = require('mysql')

const pool = createPool({
    host: '213.196.190.205',
    user: 'kfadmin',
    password: 'kfroot',
    connectionLimit: 10
})

function getUsers() {
    pool.query(`select * from kfdb.user;`, (err, res)=> {
        return res
    })
}

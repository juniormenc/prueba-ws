
var serverBD = {
    username: 'oqgktyhhazfvrt',
    password: '13ddae8daedfae7f22f270d22db2ff253f53e289a9cdd9ee61bc8af23f1a9d24',
    ip: 'ec2-174-129-247-1.compute-1.amazonaws.com',
    port: '5432',
    database: 'da1oa4bj3eudi9',
    ssl: true,
    max: 20,
    idleTimeoutMillis: 3000,
}

/*
var serverBD = {
    username: 'postgres',
    password: 'postgres',
    //ip: '192.168.1.3',//set the host
    ip: '127.0.0.1',
    port: '5432',
    database: 'bdhealthinnin',
    ssl: false,
    max: 70, // set pool max size to 70
    idleTimeoutMillis: 3000, // close idle clients after 3 seconds
    //min: 4, // set min pool size to 4
    //connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
}
*/

module.exports = serverBD;

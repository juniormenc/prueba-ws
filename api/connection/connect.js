
var serverBD = {
    username: 'oikjetgenfdsgd',
    password: '1ec682bee8023abdb97f0181238f86f0380016eb5bd5c21912ae548a777a1616',
    ip: 'ec2-54-235-193-34.compute-1.amazonaws.com',
    port: '5432',
    database: 'd1077v0gj89mb9',
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

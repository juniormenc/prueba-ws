
var serverBD = {
    username: 'vsbslzptigyrws',
    password: '00df1cfd93b2a81a91f46aceb49e239153bcef9dfb6b60a6ed65a504381203ad',
    ip: 'ec2-107-21-233-72.compute-1.amazonaws.com',
    port: '5432',
    database: 'd36fstib41g5v9',
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
    database: 'telemedica',
    ssl: false,
    max: 70, // set pool max size to 70
    idleTimeoutMillis: 3000, // close idle clients after 3 seconds
    //min: 4, // set min pool size to 4
    //connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
}
*/

module.exports = serverBD;

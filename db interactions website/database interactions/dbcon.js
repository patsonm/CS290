var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_patsonm',
  password        : '9171',
  database        : 'cs290_patsonm'
});

module.exports.pool = pool;

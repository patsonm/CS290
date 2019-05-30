var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'oniddb.cws.oregonstate.edu',
  user            : 'patsonm-db',
  password        : 'JzFsOun2iJYAjRWD',
  database        : 'patsonm-db'
});

module.exports.pool = pool;

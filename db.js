var bb = require('bluebird');
var initOptions = {
    promiseLib: bb,
    noLocking:true,
    error(error, e) {
        if (e.cn) {
            console.log('EVENT:', error.message || error);
        }
    }
}
var config = require(__dirname+'/init_app');
var pgp = require('pg-promise')(initOptions);
var cs = config.db;
var db = pgp(cs);
module.exports = db;
var db = require("./DB/mySQLConnector");

exports.getParents = function(childId, generations, callback) {
    db.getParents(childId, callback);
};

exports.getChildren = function(parentId, generations, callback) {
	db.getChildren(parentId, callback);
};

exports.getByFacebookID = function(socialId , callback) {
	db.getByFacebookID( socialId , callback );
};

exports.updatePerson = function( info, callback ) {
	db.updatePerson( info, callback )
}
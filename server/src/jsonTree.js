var db = require("./readDB");

exports.getParents = function (childId, generations, callback) {
    db.getParents(childId, callback);
};

exports.getChildren = function (parentId, generations, callback) {
	db.getChildren(parentId, callback);
}
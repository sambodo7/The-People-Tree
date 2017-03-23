var mysql = require('mysql');
var config = require('../config');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : config.dbHost,
    user     : config.dbUsername,
    password : config.dbPassword,
    database : 'the_people',
    debug    :  false
});

function handle_database(query, callback) {
   
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query(query,function(err,rows){
            console.log(err);
            connection.release();
            if(err) {
                callback(err + "\n" + query);
            }
            else {
            	callback(null, rows);
            }          
        });

        connection.on('error', err => {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
        });
    });
}

exports.getParents = (childId, callback) => {
    if(!childId) {
        callback(new Error("no childID decleared"));

    }
    else {
        handle_database("SELECT * " +
            "FROM PERSON " +
            "INNER JOIN PARENT " +
            "ON PERSON.PERSON_ID=PARENT.PARENT_ID " +
            "WHERE PARENT.CHILD_ID='" + childId + "'", callback);
    }
};

exports.getChildren = (parentId, callback) => {
    if(!parentId) {
        callback(new Error("no paarentID decleared"));

    }
    else {
        handle_database("SELECT * " +
            "FROM PERSON " +
            "INNER JOIN PARENT " +
            "ON PERSON.PERSON_ID=PARENT.CHILD_ID " +
            "WHERE PARENT.PARENT_ID='" + parentId + "'", callback);
    }
};

exports.getByFacebookID = (facebookID, callback) => {
    if(!facebookID) {
        callback(new Error("no FacebookID decleared"));

    }
    else {
        handle_database("SELECT * " +
            "FROM PERSON " +
            "WHERE PERSON.FACEBOOK_ID='" + facebookID + "'", callback);
    }
};

exports.updatePerson = ( info, callback ) => {

    if( !info || !info.PERSON_ID ) {
        callback( new Error( "I don't know what person to update" ) );
    }
    else {
        let setString = "";
        for( prop in info ) {

            if ( !( prop === "PERSON_ID" ) && !( info[ prop ] === "" ) ) {
                setString += `${ prop }="${ info[ prop ] }", `;
            }

        }
        const updateString = `UPDATE PERSON ` +
            `SET ${ setString.trim().slice( 0, -1 ) } ` +
            `WHERE PERSON_ID="${ info.PERSON_ID }"`;
        console.log( updateString )
        handle_database( updateString, callback );
    }
}

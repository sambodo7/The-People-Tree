const session = JSON.parse( atob( Cookies.get("session") ) );

function displayAsideInfo ( node ) {

    var tableBuilder = "";

    for( prop in nodeData.nodes._data[node].info ) {
        if(nodeData.nodes._data[node].info[prop]) {
            if( prop === "PERSON_ID" ) {
                tableBuilder = tableBuilder + "<tr hidden><th>" + prop + "</th><td id='currentPerson'>" + nodeData.nodes._data[node].info[prop] + "</td></tr>"
            } else {
                tableBuilder = tableBuilder + "<tr><th>" + prop + "</th><td>" + nodeData.nodes._data[node].info[prop] + "</td></tr>"
            }
        }

    }
    
    $("#person-info").html($("<tbody></tbody>").html(tableBuilder));

}

function mapPersonDataToEdit ( personInfo ) {

    $("#first-name-edit").val( personInfo.FIRST_NAME );
    $("#middle-name-edit").val( personInfo.MIDDLE_NAMES );
    $("#last-name-edit").val( personInfo.LAST_NAME );
    $("#maiden-name-edit").val( personInfo.MAIDEN_NAME );
    $("#alias-edit").val( personInfo.ALIAS );
    $("#DOB-edit").val( personInfo.DOB );
    $("#DOD-edit").val( personInfo.DOD );
    $("#sex-edit").val( personInfo.SEX );
    $("#COD-edit").val( personInfo.COD );


}

function savePersonEdit () {

    $("#submit-edit-form").click();
    $("#close-edit-form").click();

}

const nodeClickEvent = function (param) {

    if(param.nodes.length > 0) {

        displayAsideInfo( param.nodes[0] );

        if (!nodeData.nodes._data[param.nodes[0]].loaded) {

            $.getJSON(`${ config.apiBase }/parents?userId=${ param.nodes[0] }&generationBack=1`, d => {
                
                var level = nodeData.nodes._data[param.nodes[0]].level + 1;

                nodeData.nodes._data[param.nodes[0]].loaded = true;
                d.filter( p => !(p.PERSON_ID in nodeData.nodes._data)).forEach(p => {
                    nodeData.nodes.add({"id": p.PERSON_ID, "label": p.FIRST_NAME, "group": p.LAST_NAME, "info": p, "loaded": false, "level": level});
                    nodeData.edges.add({"id": p.CHILD_ID + "to" + p.PERSON_ID, "from": p.CHILD_ID, "to": p.PERSON_ID,  "arrows": 'from', color:{inherit:'both'}})
                })
            })

            $.getJSON(`${ config.apiBase }/children?userId=${ param.nodes[0] }&generationBack=1`, d => {

                var level = nodeData.nodes._data[param.nodes[0]].level - 1;

                nodeData.nodes._data[param.nodes[0]].loaded = true;
                d.forEach(p => {
                    if(!(p.PERSON_ID in nodeData.nodes._data)) {
                        nodeData.nodes.add({"id": p.PERSON_ID, "label": p.FIRST_NAME, "group": p.LAST_NAME, "info": p, "loaded": false, "level": level});
                    }
                    if(!((p.PERSON_ID + "to" + p.PARENT_ID) in nodeData.edges._data)) {
                        nodeData.edges.add({"id": p.PERSON_ID + "to" + p.PARENT_ID, "from": p.PERSON_ID, "to": p.PARENT_ID,  "arrows": 'from', color:{inherit:'both'}})
                    }
                })
            })

        }

    }

}

$.getJSON( `${ config.apiBase }/social?socialID=${session.user.id}&provider=${session.user.provider}`, data => {
    var container = document.getElementById('tree-holder');

    var options = {
        layout: {
            hierarchical: {
                direction: "UD",
                edgeMinimization: true,
                blockShifting: true,
                parentCentralization: true
            }
        },
        physics:false
    };

    nodeData =  {
        nodes : new vis.DataSet( [ {
            "id": data.PERSON_ID,
            "label": data.FIRST_NAME,
            "group": data.LAST_NAME,
            "info": data,
            "loaded": false,
            "level": 1
        } ] ),
        edges : new vis.DataSet([])
    };

    network = new vis.Network(container, nodeData, options);
    network.on("click", nodeClickEvent);

    displayAsideInfo( data.PERSON_ID )
    
    } )

$( "#delete_button" ).on("click", () => {
    nodeData.edges.remove(network.getSelectedEdges());
    nodeData.nodes.remove(network.getSelectedNodes());
} );

$( "#edit_Person" ).on( "shown.bs.modal", () => mapPersonDataToEdit( nodeData.nodes._data[ $("#currentPerson").text() ].info ) );

$( "#edit-save" ).on( "click", () => savePersonEdit() );

$('#edit-person').submit( event => {
    
    event.preventDefault(); // Stops browser from navigating away from page
    var data = {};
    // build a json object or do something with the form, store in data
    $.post( config.apiBase, data, resp => {
        // do something when it was successful
    });
});

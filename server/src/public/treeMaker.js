//Temp code


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
var data =  {
	nodes : new vis.DataSet([{"id":"CD1F881450A8", "label":"Dakota", "group": "Stephenson", "loaded": false, "level": 0}]),
	edges : new vis.DataSet([])
};

network = new vis.Network(container, data, options);

//Temp code end

nodeClickEvent = function (param) {

	if(param.nodes.length > 0) {

		var tableBuilder = "";

		for(prop in data.nodes._data[param.nodes[0]].info) {
			if(data.nodes._data[param.nodes[0]].info[prop]) {
				tableBuilder = tableBuilder + "<tr><th>" + prop + "</th><td>" + data.nodes._data[param.nodes[0]].info[prop] + "</td></tr>"
			}

		}
		
		$("#person-info").html($("<tbody></tbody>").html(tableBuilder));

		if (!data.nodes._data[param.nodes[0]].loaded) {

			$.getJSON("http://localhost:8080/api/parents?userId="+ param.nodes[0] +"&generationBack=1", d => {
                
                var level = data.nodes._data[param.nodes[0]].level + 1;

				data.nodes._data[param.nodes[0]].loaded = true;
				d.filter( p => !(p.PERSON_ID in data.nodes._data)).forEach(p => {
					data.nodes.add({"id": p.PERSON_ID, "label": p.FIRST_NAME, "group": p.LAST_NAME, "info": p, "loaded": false, "level": level});
					data.edges.add({"id": p.CHILD_ID + "to" + p.PERSON_ID, "from": p.CHILD_ID, "to": p.PERSON_ID,  "arrows": 'from', color:{inherit:'both'}})
				})
		    })

		    $.getJSON("http://localhost:8080/api/children?userId="+ param.nodes[0] +"&generationBack=1", d => {

		    	var level = data.nodes._data[param.nodes[0]].level - 1;

				data.nodes._data[param.nodes[0]].loaded = true;
				d.forEach(p => {
					if(!(p.PERSON_ID in data.nodes._data)) {
						data.nodes.add({"id": p.PERSON_ID, "label": p.FIRST_NAME, "group": p.LAST_NAME, "info": p, "loaded": false, "level": level});
					}
					if(!((p.PERSON_ID + "to" + p.PARENT_ID) in data.edges._data)) {
						data.edges.add({"id": p.PERSON_ID + "to" + p.PARENT_ID, "from": p.PERSON_ID, "to": p.PARENT_ID,  "arrows": 'from', color:{inherit:'both'}})
					}
				})
		    })

		}

	}

}

network.on("click", nodeClickEvent);

$('#delete_button').on("click", () => {
	data.edges.remove(network.getSelectedEdges());
	data.nodes.remove(network.getSelectedNodes());
})
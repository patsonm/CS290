document.getElementById('addExerciseButton').addEventListener('click',function(event){	
	
	var addExercise = document.getElementById("addExercise"); 
	var req = new XMLHttpRequest();
	var param =         "exercise="+addExercise.elements.exercise.value+ "&reps="+addExercise.elements.reps.value+
    "&weight="+addExercise.elements.weight.value+
    "&date="+addExercise.elements.date.value;
	
	if(addExercise.elements.unitCheck.checked){
		param += "&unitCheck=1";                                     
	}
	else{
		param += "&unitCheck=0";
	}

	//modified from https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
	req.open("GET", "/insert?" + param, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function(){                       
		if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);           
			var id = response.inserted;
			var table = document.getElementById("userTable");

			
			var row = table.insertRow(-1);
	//same style fr add to each row
			var exName = document.createElement('td');           
			exName.textContent = addExercise.elements.exercise.value;
			row.appendChild(exName);

	//same style fr add to each row		
			var reps = document.createElement('td');
			reps.textContent = addExercise.elements.reps.value;
			row.appendChild(reps);

	//same style fr add to each row		
			var weightADD = document.createElement('td');
			weightADD.textContent = addExercise.elements.weight.value;
			row.appendChild(weightADD);

//same style fr add to each row
            var date = document.createElement('td');
			date.textContent = addExercise.elements.date.value;
			row.appendChild(date);
//same style fr add to each row            
			var unitCheck = document.createElement('td');
			if(addExercise.elements.unitCheck.checked){    
				unitCheck.textContent = "lbs";
			}
			else{
				unitCheck.textContent = "kg"; 
			}
			row.appendChild(unitChecker);
            
            	
//followed previous lesson on handlebar ID.... this was killer
			var newData = document.createElement('td');             
			var newDataLink = document.createElement('a');
			newDataLink.setAttribute('href','/updateTable?id=' + id);
			var inputButton = document.createElement('input');         
			inputButton.setAttribute('value','Update Exercise');       
            inputButton.setAttribute('type','button');         
			newDataLink.appendChild(inputButton);
			newData.appendChild(newDataLink);
            //add to the table
			row.appendChild(newData);                                   
            
   //basically same as above with the button def
			var clearCell = document.createElement('td');             
			var deleteButton = document.createElement('input');         
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');                 
			deleteButton.setAttribute('value','Delete');
			deleteButton.setAttribute('onClick', 'deleteData("dataTable",' + id +')');
			var deleteHidden = document.createElement('input');         
			deleteHidden.setAttribute('type','hidden');
			deleteHidden.setAttribute('id', 'delete' + id);
			clearCell.appendChild(deleteButton);                       
			clearCell.appendChild(deleteHidden);
			row.appendChild(clearCell);                               

		}
		else {
            //something goes wrong, sends to error
	    	console.log("error");
		}
	});
	
	req.send("/insert?" + param);
	event.preventDefault();                                     
});

function deleteData(tableId, id){
    var deleteItem = "delete" + id;                             	
	var table = document.getElementById("userTable"); 
	var numRows = table.rows.length;

	//loop through and look for data, copied this basic set up from the move box project
	for(var i = 1; i < numRows; i++){
		var row = table.rows[i];
		var findData = row.getElementsByTagName("td");	
		var erase = findData[findData.length -1];		        
		if(erase.children[1].id === deleteItem)
        {    
			table.deleteRow(i);
		}
	}

	var req = new XMLHttpRequest();

	req.open("GET", "/delete?id=" + id, true); 

	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){ //trow error if no event
	    	console.log('success');
		} else {
		    console.log('error');
		}
	});

	req.send("/delete?id=" + id); 
}
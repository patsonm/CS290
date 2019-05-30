/*Michael Patson Homework assignment
Simple table to practice javascript, html and dom
May 3rd 2018*/

//a function to generate the table (should look familiar from previous assignment)
//set table
var headersMade = 0;

var myTable = document.createElement("Table");

//functions for table, create headers-th, create table data-td, 



//makes headers and fills in labels
function makeHeader(row)
{
    for (var i = 0; i < 4; i ++)
    {
        var headers = document.createElement("th");
        headers.textContent = ("Header " + (i+1));
        row.appendChild(headers);
        headersMade=1;
    }
}

function makeTD(row, col)
{
    for (var i = 0; i < 4; i ++)
    {
        var TableData = document.createElement("td");
        TableData.textContent = ((i+1)+ " , " + col);
        row.appendChild(TableData);
        }
} 

//populate table, calls functions for headers and col/row
for (var i = 0; i < 4; i++) {
	var rowInsert = myTable.insertRow(i);
  if (headersMade==0)
  {
  makeHeader(rowInsert);
  }
  else{
  makeTD(rowInsert,i);
	}
  }
  

var createTable = document.createElement("div");
createTable.appendChild(myTable);
document.body.appendChild(createTable);



// button creation
var upButton = document.createElement("button"); 
  upButton.id = "up";
  var upButtonText = document.createTextNode("Up");
  upButton.appendChild(upButtonText);
  document.body.appendChild(upButton); 
 
 var downButton = document.createElement("button");    
  downButton.id = "down";
  var downButtonText = document.createTextNode("Down");
  downButton.appendChild(downButtonText);
  document.body.appendChild(downButton);
  
    
  var leftButton = document.createElement("button");     
  leftButton.id = "left";
  var leftButtonText = document.createTextNode("Left");
  leftButton.appendChild(leftButtonText);
  document.body.appendChild(leftButton);
  
 
  var rightButton = document.createElement("button");     
  rightButton.id = "right";
  var rightButtonText = document.createTextNode("Right");
  rightButton.appendChild(rightButtonText);
  document.body.appendChild(rightButton);

  
  var markButton = document.createElement("button");        
  markButton.id = "mark";
  var markButtonText = document.createTextNode("Mark Cell");
  markButton.appendChild(markButtonText);
  document.body.appendChild(markButton);
  
  
  
  
//asigns listening to buttons... gives them functions 
document.getElementById("up").addEventListener("click", moveUp); 
document.getElementById("down").addEventListener("click", moveDown);
document.getElementById("left").addEventListener("click", moveLeft);
document.getElementById("right").addEventListener("click", moveRight); 
document.getElementById("mark").addEventListener("click", markCell);


// runs to this point, makes a 4x4 table, bolded headers, now to create the highlite functions

//first is to highlight top left (not header)
var current = document.getElementsByTagName("td")[0];
current.style.border = "3px solid black";
var row = 1;
var col = 0;
//functions

function moveUp(){
//this of this kind of like a swap

var prev=current;

	if (row > 1)
		{
    prev.style.border = "1px solid black";
    row--;
    current = myTable.rows[row].cells[col];
    current.style.border = "3px solid black";
    }
}

function moveDown(){
var prev=current;
	if (row < 3)
		{
    prev.style.border = "1px solid black";
    row++;
    current = myTable.rows[row].cells[col];
    current.style.border = "3px solid black";
    }
}
function moveRight(){
var prev=current;
if (col < 3)
		{
    prev.style.border = "1px solid black";
    col++;
    current = myTable.rows[row].cells[col];
    current.style.border = "3px solid black";
    }
}
function moveLeft(){
var prev=current;
if (col>0)
		{
    prev.style.border = "1px solid black";
    col--;
    current = myTable.rows[row].cells[col];
    current.style.border = "3px solid black";
    }
}

function markCell(){
	current.style.background = "Yellow";
}
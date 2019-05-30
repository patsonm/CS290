var deepComparison = function(obj_1, obj_2) {
  for (var key in obj_1) {
     if (obj_2[key] === undefined) {
       return false;
     } 

     if (obj_2[key] instanceof Object && obj_1[key] instanceof Object) {
        if (!deepComparison(obj_2[key], obj_1[key])) {
          return false;
        } 
     } else if (obj_2[key] !== obj_1[key]) {
        return false;
     }    
  }
  return true;
}

var objA = {a: 1, b: 2};
var objB = {a: 1, b: 2};

console.log(deepComparison(objA, objB));

var objC = {a: [["michael"], 3], b: 4};
var objD = {a: [["michael"], 3], b: 4};

console.log(deepComparison(objC, objD));

var objMike = {m: {x: { a: "mike", b: "bri"} }, b: {a: {a: 7, b: 8}}};
var objBri = {m: {x: { a: "mike", b: "bri"} }, b: {a: {a: 7, b: 8}}};

console.log(deepComparison(objMike, objBri));


var obj1 = {a: null, b: null};
var obj2 = {a: null, b: null};


console.log(deepComparison(obj1, obj2));
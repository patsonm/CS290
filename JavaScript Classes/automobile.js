function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(x) {
        if (x == true) {
            console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
        } else {
            console.log(this.year + " " + this.make + " " + this.model);
        }
    }
    
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array )
{
    //copied from a sorting project in cs165
    var sortedArray = array;

    for (var i = (sortedArray.length - 1); i >= 0; i--) 
    {
        for (var j = (sortedArray.length - 1); j > 0; j--) 
        {
            if (comparator(sortedArray[j], sortedArray[j - 1])) 
            {
                var temp = sortedArray[j];
                sortedArray[j] = sortedArray[j - 1];
                sortedArray[j - 1] = temp;
            }
        }
    }

    return sortedArray;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    return (auto1.year > auto2.year);
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    var auto1LC = auto1.make.toLowerCase();
    var auto2LC = auto2.make.toLowerCase();

    return (auto1LC < auto2LC);
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2){
    
    var ranking = {'roadster': 4, 'pickup': 3, 'suv': 2, 'wagon': 1};
    
    var type1 = ranking[auto1.type.toLowerCase()];
    var type2 = ranking[auto2.type.toLowerCase()];
     
    
    if (type1==type2)
        {
        return yearComparator(auto1, auto2);
        }

    else if(type1 > type2)
        {
        return true;
        }
    else
        {
        return false;
        }
}

var printResults = function() {
    console.log("*****");
    console.log("The cars sorted by year are:");
    
    var sortedYear = sortArr(yearComparator, automobiles);

    for (var i = 0; i < sortedYear.length; i++) 
    {
        sortedYear[i].logMe(false);
    }
    
    console.log("\nThe cars sorted by make are:");
    
    
    var sortedMake = sortArr(makeComparator, automobiles);

    for (var j = 0; j < sortedMake.length; j++) 
    {
        sortedMake[j].logMe(false);
    }
    
    console.log("\nThe cars sorted by type are:");
    
    
    var sortedType = sortArr(typeComparator, automobiles);

    for (var k = 0; k < sortedType.length; k++) 
    {
        sortedType[k].logMe(true);
    }
    console.log("*****");

};

printResults();

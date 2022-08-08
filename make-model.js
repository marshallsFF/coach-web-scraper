const fs = require('fs');

// import json
let rawdata = fs.readFileSync('coaches.json');
let coaches = JSON.parse(rawdata);

//create variable to export
let newList = [];

let i = 0;

coaches.filter( (coach) => {
    if (coach.class == "Popup" || coach.class == "Truck camper") {
        return false;
    }
    return true;
}).map( (coach) => {
    let manufacturer = "";
    let cClass = coach.class;
    let model = coach.model;
    let floorplan = coach.floorplan;

    i++;
    
});


console.log(i);
console.log(coaches.length);

// iterate through json

    /* variables
    let manufacturer = "";
    let class = coach.class;
    let model = coach.model;
    let floorplan = coach.floorplan;
    */

    // remove truck campers & popups DONE

    // switch statement for manufacturer??


    // remove RVs from model name

    // push revisions to newList array


// export newList to JSON file    
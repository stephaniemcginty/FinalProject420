﻿

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("getTotalPets").addEventListener("click", function () {
        console.log("button works");
        getQuery1();
    });

    // event listener for cats vs dogs button runs getquery2
    document.getElementById("getCatsVSDogs").addEventListener("click", function () {
        getQuery2();
    });

    // event listener for top 3 breeds button runs getquery3
    document.getElementById("getTop3").addEventListener("click", function () {
        getQuery3();
    });

});


function getQuery1() {
    $.getJSON("api/Q1")
        .done(function (data) {
            console.log(data);
            $.each(data, function (key, item) {
                //Add a list item for the product.
                $('<li>', { text: formatItem1(item) }).appendTo($('#displayPets1'));
            });
            console.log(data);
            let table = document.getElementById("table1");
            //generateTable(table, data);
        });
}

function getQuery2() {
    // grabs years selected from drop downs
    let y1 = $('#years1-select').val();
    let y2 = $('#years2-select').val();
    $.getJSON("api/pets/query2/" + y1 + "/" + y2)
        .done(function (data) {
            // deletes previous data on table
            $("#table2 tr").remove();
            // gets table id
            let table = document.getElementById("table2");
            // prints data to console
            console.log(data);
            // generates table using data from query
            generateTable(table, data);
        });
}


function getQuery3() {
    // grabs years selected from drop downs
    let animal = $('#animal-select').val();
    let year = $('#breedYear-select').val();
    $.getJSON("api/pets/query3/" + animal + "/" + year)
        .done(function (data) {
            // deletes previous data on table
            $("#table3 tr").remove();
            // gets table id
            let table = document.getElementById("table3");
            // prints data to console
            console.log(data);
            // generates table using data from query
            generateTable(table, data);
        });
}

// function to append data to a table
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}



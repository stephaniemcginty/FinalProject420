

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
            //$.each(data, function (key, item) {
                //Add a list item for the product.
                //$('<li>', { text: formatItem1(item) }).appendTo($('#displayPets1'));
            //});
            
            let table = document.getElementById("table1");
            table.hidden = false;
            //table.insertRow(data[0]);
            //let firstYear = document.createTextNode(data[0]);
            //table.insertRow(1).insertCell(0).appendChild(firstYear);
            let display2019 = document.getElementById("row1-col1");
            display2019.hidden = false;
            display2019.innerHTML = data[0];

            let display2020 = document.getElementById("row2-col2");
            display2020.hidden = false;
            display2020.innerHTML = data[1];

            let displayCovid2020 = document.getElementById("covidCases");
            //display2020.hidden = false;
            displayCovid2020.innerHTML = data[2];
            //displayCovid2020.hidden = false;
            document.getElementById("tabletohide").hidden = true;

            console.log(data[2]);
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

            // creates table with breed and number headers
            let row = table.insertRow();
            let cell = row.insertCell();
            let text = document.createTextNode("Breed");
            cell.appendChild(text);
            let cell2 = row.insertCell();
            let text2 = document.createTextNode("Number");
            cell2.appendChild(text2);

            // generates table using data from query
            generateTable(table, data);

            var json = []; // first row needs to be headers 
            var headers = [];
            for (var i = 0; i < table.rows[0].cells.length; i++) {
                headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
            }

            // go through cells 
            for (var i = 1; i < table.rows.length; i++) {
                var tableRow = table.rows[i];
                var rowData = {};
                for (var j = 0; j < tableRow.cells.length; j++) {
                    rowData[headers[j]] = tableRow.cells[j].innerHTML;
                }

                json.push(rowData);
            }

            console.log(json);

            // map JSON values back to label array
            var labels = json.map(function (e) {
                return e.breed;
            });
            console.log(labels);

            // map JSON values back to values array
            var values = json.map(function (e) {
                return e.number;
            });
            console.log(values);

            var chart = BuildChart(labels, values, "Top 5 Breeds");
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

// functions creates a chart using labels, data, and title parameters
function BuildChart(labels, values, chartTitle) {
    //Remove the canvas after every chart call, this worked for me
    $("canvas").remove();
    $("div.card-body").append('<canvas id="myChart"></canvas>');
    $("div.card").css("display", "block");
    // grabs chart element
    var ctx = document.getElementById("myChart").getContext('2d');
    // creates the chart
    var myChart = new Chart(ctx, {
        type: 'bar',
        height: 200,
        data: {
            labels: labels, // uses labels parameters
            datasets: [{
                label: chartTitle, // titles the chart
                data: values, // inputs values
                backgroundColor: [ // colors
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [ // color borders
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1 // bar border width
            }]
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true, // makes chart responsive, resizes based on browser
            maintainAspectRatio: true, // prevents default behavior of full-width/height 
        }
    });
    return myChart;
}
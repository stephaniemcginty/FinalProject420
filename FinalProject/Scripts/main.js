

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("getTotalPets").addEventListener("click", function () {

        getQuery1();
    });

});


function getQuery1() {

    $.getJSON("api/Q1")
        .done(function (data) {
            $.each(data, function (key, item) {
                //Add a list item for the product.
                $('<li>', { text: formatItem1(item) }).appendTo($('#displayPets1'));
            });
            console.log(data);
            let table = document.getElementById("table1");
            generateTable(table, data);
        });
}

function getRaceData2() {
    $.getJSON("api/Q2")
        .done(function (data) {
            //document.getElementById("displayRace2").innerHTML = data[0] + "   " + data[1] + "   " + data[2] + "   " + data[3];
            let table = document.getElementById("table2");
            console.log(data);
            let row = table.insertRow();
            $.each(data, function (key, item) {

                let cell = row.insertCell();
                let text = document.createTextNode(item);
                cell.appendChild(text);
            });


        });
}


function getRaceData3() {
    $.getJSON("api/Q3")
        .done(function (data) {
            $.each(data, function (key, item) {
                // Add a list item for the product.
                $('<li>', { text: formatItem3(item) }).appendTo($('#displayRace3'));
            });

        });
}


function formatItem1(item) {
    return "Race: " + item.SubjectRace + "  Level: " + item.IncidentID + "  Date:  " + item.eDate + "  Max Temp:  " + item.TempMax;
}

function formatItem3(item) {
    return "Level: " + item.Level + "  Temp: " + item.MaxTemp + "  Date:  " + item.iDate + "  Race: " + item.Race;
}






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




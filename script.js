var rowCount = 0;

function setUpPage(){
    var table = document.getElementById('gradeTable');
    table.setAttribute("id","theTable");
    document.getElementById("finalTable").setAttribute("border", "2px");

    addRow();
}

function addRow(){
    var table = document.getElementById("theTable");
    var gradeRow = document.createElement("tr");
    gradeRow.setAttribute("id","gRow" + rowCount);
    var weightRow = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var gradeInput = document.createElement("input");
    var weightInput = document.createElement("input");

    var label = document.getElementById("newCat").value;
    gradeInput.setAttribute("id","grd" + rowCount);
    weightInput.setAttribute("id","wgt" + rowCount);

    if (label == ""){
        label = "Homework";
    }

    td1.innerHTML = label + " Grades";
    td2.innerHTML = label + " Weight";

    td3.append(gradeInput);
    td4.append(weightInput);

    gradeRow.append(td1);
    gradeRow.append(td2);
    weightRow.append(td3);
    weightRow.append(td4);


    table.append(gradeRow);
    table.append(weightRow);

    rowCount += 1;

    document.getElementById("theTable").setAttribute("border", "2px");
}

function calculateCurrentGrade() {
    var gr = [];
    var w = [];
    var validation = "";
    for (var i = 0; i < rowCount; i++) {
        gr.push(document.getElementById("grd" + i).value);
        w.push(document.getElementById("wgt" + i).value);
    }
    for (var j = 0; j < gr.length; j++){
        gr[j] = convertArrayStringToNumber(gr[j]);
        gr[j] = averageArray(gr[j]);
        var color = colorAvgs(gr[j])
        document.getElementById("gRow" + j).setAttribute("class",color);
    }
    for (var k = 0; k < w.length; k++){
        w[k] = convertArrayStringToNumber(w[k]);
        validation += w[k]
    }
    if (validation != 100){
        document.getElementById("inputValidation").innerHTML = "Error: Weight must add up to 100.";
        return;
    }
    var currentGrade = weightAverages(gr,w);
    document.getElementById("currentGrade").innerHTML = currentGrade;
}

function convertArrayStringToNumber(str) {
    var num = str.split(",");
    for (var i = 0; j=i < num.length; i++) {
        num[i] = parseInt(num[i]);
    }
    return num;
}

function averageArray(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    var avg = sum / arr.length;
    return avg;
}

function colorAvgs(x){
    var colorClass = ""
    if (x<=100 && x>=90){
        colorClass = "green";
    }
    if (x<90 && x>=80){
        colorClass = "lightGreen";
    }
    if (x<80 && x>=70){
        colorClass = "yellow";
    }
    if (x<70 && x>=60){
        colorClass = "orange";
    }
    if (x<60 && x>=0){
        colorClass = "red";
    }
    return colorClass;
}
function weightAverages(number,weight){
    var grade = 0;
    for (i = 0; i < number.length; i++){
        grade += number[i] * weight[i] / 100;
    }
    return grade;
}

function calculateGradeNeeded(){
    var currentGrd = parseInt(document.getElementById("currentGrade").innerHTML);
    var grdDesired = parseInt(document.getElementById("gradeDesired").value);
    var finalWgt = parseInt(document.getElementById("finalWeight").value) / 100;
    if (finalWgt>1 || finalWgt<0){
        document.getElementById("inputValidationTwo").innerHTML = "Error: Final Weight must be between 0 and 100.";
        return;
    }
    var currentWgt = 1 - finalWgt;
    var currentGrdWgt = currentGrd * currentWgt;
    var finalGrdNeeded = (grdDesired - currentGrdWgt) / finalWgt;
    document.getElementById("finalGradeNeeded").innerHTML = finalGrdNeeded;
}

"use strict";

function addMonths(elem) {
    let annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    let months = document.getElementById(elem).getElementsByTagName('input');

    for (i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    }
    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;

}



function sunHours() {
    let hrs;
    let theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    } // end of swich 
    return hrs;
} // end function


function calculatePannel() {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name];
    return x

}




function calculateSolar() {
    let dailyUseKw = addMonths('mpc');

    let sunHoursPerDay = sunHours();

    let minkwNeeds = dailyUseKw / sunHoursPerDay;

    let realKWNeeds = minkwNeeds * 1.25;

    let realWattNeeds = realKWNeeds * 1000;

    let pannelInfo = calculatePannel();

    let panelOutput = pannelInfo[0];

    let panelName = pannelInfo[1];

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

    let feedback = "";
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you need to purchase " + panelsNeeded + " " + panelName + " solar panels to offset 100% of your electricity bill.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " kmh per day.</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hours.</p>";
    feedback += "<p>The " + panelName + " pannel you selected generates about " + panelOutput + " watts per hour.</p>";

    document.getElementById('feedback').innerHTML = feedback;

} 
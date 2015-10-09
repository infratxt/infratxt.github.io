// Prompt for salary and hours
var salary = parseInt(prompt("How much do you earn per month in pounds?"));
var hours = parseInt(prompt("and roughly how many hours do you work per week?"))

// Run function
function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
            seconds = parseInt(timer);
        
        var youEarned = salaryRounded * seconds;        
        display.textContent = "£" + youEarned.toFixed(2); //Print value every second

        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Calculate a value for salary per second, to 3 d.p.
var wage = (salary / 31) * 7;
var salaryPerSecond = wage / (24 * 60 * 60);
var roundUp = Math.floor(salaryPerSecond * 100000);
var salaryRounded = roundUp / 100000;
var poundMinutes = Math.round((1 / salaryRounded) / 60);


//Write pound values
document.write("<p>You earn <b>£" + salary + "</b> per month for a <b>" + hours + "</b> hour week.</p>");
document.write("<p>That makes <b>£" + salaryRounded + "</b> pounds every second at work.</p>");
document.write("<p>On average, it takes you <b>" + poundMinutes + "</b> minutes to earn <b>£1</b>.")

// Run function to update display result to screen

window.onload = function () {
    var startFrom = 2,
        display = document.querySelector('#time');
    startTimer(startFrom, display);
};

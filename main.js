const pageAlert = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-traffic-chart");
const mobileCanvas = document.getElementById("mobile-users-chart");
const user = document.querySelector(".user-search");
const message = document.getElementById("messageField");
const send = document.getElementById("sendButton");
const notificationBell = document.getElementById("bell-icon");
const notificationTray = document.getElementById("notifications");
const bellIndicator = document.getElementById("bell-indicator");
const trafficLI = document.getElementsByClassName("traffic-nav-link");
const trafficNav = document.getElementById("trafficNav");

// Traffic Data Line Chart

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1
    }]
};

let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 800
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

//traffic chart selections

trafficNav.addEventListener('click', (e) => {
    for (let i=0; i< trafficLI.length;i++) {
        trafficLI[i].classList.remove("active");
    }
    if (e.target.classList.contains("traffic-nav-link")) {
        e.target.classList += " active";}
    for (let i=0; i<trafficLI.length; i++){
    if(e.target.id === "hourlyButton") {
        trafficData.labels = ["7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "6pm", "7pm"];
        trafficData.datasets[0].data = [1100, 850, 1050, 900, 1800, 1300, 1250, 1650, 1750, 1550, 1700, 2300];
        trafficChart.update();
    } else if (e.target.id === "dailyButton") {
        trafficData.labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
        trafficData.datasets[0].data = [600, 950, 1150, 650, 1100, 1200, 1950, 1450, 1350, 1950, 1700, 2200];
        trafficChart.update();
    } else if (e.target.id === "weeklyButton") {
        trafficData.labels = ["9-15","16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
        trafficData.datasets[0].data = [900, 750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500];
        trafficChart.update();
    } else if (e.target.id === "monthlyButton") {
        trafficData.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        trafficData.datasets[0].data = [450, 1050, 800, 1800, 2200, 650, 2250, 1650, 2450, 1800, 2300, 2200];
        trafficChart.update();
    }
    }
});



// Daily Traffic Bar Chart

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
}

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

// Mobile Users Donut Chart

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold'
        }
    }
}

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

// Notifications

notificationBell.addEventListener('click', () => {
    notificationTray.innerHTML = 
    `
    <span class="notification-tray-close">X</span>
    <p class="notification-text">You are now friends with Dan Oliver</p>
    <p class="notification-text">You have 2 new messages</p>
    `
    notificationTray.style.position = "absolute";
    notificationTray.style.zIndex = 10;
    notificationTray.style.border = "2px solid #573a9b";
    notificationTray.style.borderRadius = "5px";
    notificationTray.style.background = "white";
    notificationTray.style.padding = "20px";
    notificationTray.style.color = "rgb(114, 114, 114)";
    bellIndicator.style.display = "none";
});

notificationTray.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("notification-tray-close")) {
        notificationTray.style.display = "none";
    }
});

// Alert

pageAlert.innerHTML =
    `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
        <p class="alert-banner-close">X</p>
    </div>
    `;

pageAlert.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        pageAlert.style.display = "none";
    }
});

// Messaging form submittal validation

send.addEventListener('click', () => {
    if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
    alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
    alert("Please fill out message field before sending");
    } else {
    alert(`Message successfully sent to: ${user.value}`);
    }
});

// Autocomplete feature for messaging widget

let members = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];
let results = document.getElementById("autoCompleteResults");
let matches = [];
let resultsCursor = 0;

user.addEventListener('keydown', (e) => {
    if (e.keyCode == '13' || e.keyCode == '38' || e.keyCode == '40') {
        e.preventDefault();
    }
});


user.addEventListener('keyup', (e) => {
    results.innerHTML = "";
    toggleResults("hide");

    if (user.value.length > 0) {
        matches = getMatches(user.value);

        if (matches.length > 0) {
            displayMatches(matches);
        }
    }

    if (results.classList.contains("visible")) {
        switch( event.keyCode ) {
            case 13:
                user.value = results.children[resultsCursor].innerHTML;
                toggleResults("hide");
                resultsCursor = 0;
                break;
            case 38:
                if (resultsCursor > 0) {
                    resultsCursor--;

                    moveCursor(resultsCursor);
                }
                break;
            case 40:
                    if (resultsCursor < (matches.length - 1)) {
                        resultsCursor++;
    
                        moveCursor(resultsCursor);
                    }
                break;
        }
    }
})

function toggleResults(action) {
    if (action == "show") {
        results.classList.remove("hide");
        results.classList.add("visible");
    } else if (action == "hide") {
        results.classList.remove("visible");
        results.classList.add("hide");
    }
}

function getMatches(inputText) {
    let matchList = [];

    for (let i = 0; i < members.length; i++) {
        if (members[i].toLowerCase().indexOf(inputText.toLowerCase()) != -1) {
            matchList.push(members[i]);
        }
    }
    return matchList;
}

function displayMatches(matchList) {
    let j = 0;

    while (j < matchList.length) {
        results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
        j++;
    }
    moveCursor(resultsCursor);
    toggleResults("show");
}

function moveCursor(pos) {
    for (let i = 0; i < results.children.length; i++) {
        results.children[i].classList.remove("highlighted");
    }

    results.children[pos].classList.add("highlighted");
}



// Storing settings in local storage

const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const timezone = document.getElementById("timezone");
let timezoneSelection = timezone.value;
let lastSelection = localStorage.getItem("timezoneSelection");

// *** Timezone settings

if (lastSelection) {
    timezone.value = lastSelection;
}

//save timezone settings with save button

saveButton.addEventListener('click', () => {    
    lastSelection = timezone.value;
    localStorage.setItem("timezoneSelection", lastSelection);  
})

//revert to previously saved timezone settings with cancel button

cancelButton.addEventListener('click', () => {
    timezone.value = lastSelection;
})

// *** Toggle switch settings

// const emailToggle = document.getElementById("email-toggle");
// const privacyToggle = document.getElementById("privacy-toggle");
// let emailClickCounter = 0;
// let privacyClickCounter = 0;

// emailToggle.addEventListener('click', () => {
//     emailClickCounter++;
//     console.log(emailClickCounter);
// });

// privacyToggle.addEventListener('click', () => {
//     privacyClickCounter++;
//     console.log(privacyClickCounter);
// });
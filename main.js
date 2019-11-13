const pageAlert = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-traffic-chart");
const mobileCanvas = document.getElementById("mobile-users-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("sendButton");
const notificationBell = document.getElementById("bell-icon");
const notificationTray = document.getElementById("notifications");
const bellIndicator = document.getElementById("bell-indicator");

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
        duration: 0
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
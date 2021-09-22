let globalvarOS = "";
let selectedIcon = "home-icon";
let basicSelected = true;

let tasks = [
    {
        title: "Eagle Leg Extension",
        image: "../img/task-images/task (5).jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Ab Abdominal",
        image: "../img/task-images/task (13).jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Fly / Rear Delt",
        image: "../img/task-images/task (12).jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Arm / Bicep Curl",
        image: "../img/task-images/task (11).jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
]

let userData = {
    userID: 0,
    firstName: 'Anonym',
    lastName: '',
    email: '-',
    weight: '-',
    height: '-'
}

let basicPlan = {
    legpress: true,
    latissimus: true,
    chestpress: true,
    hipstretching: true,
    complex: true,
    squats: false,
    pullUps: false,
    benchPress: false,
    kneeBends: false
}

let advancedPlan = {
    legpress: false,
    latissimus: false,
    chestpress: false,
    hipstretching: true,
    complex: false,
    squats: true,
    pullUps: true,
    benchPress: true,
    kneeBends: true
}

// console.log(JSON.stringify(basicPlan));
// console.log(JSON.stringify(advancedPlan));

(function($) {
    $(function() {
        "use strict";
        document.addEventListener('deviceready', $.onDeviceReady.bind(this), false);
        if (window.cordova.platformId === 'browser') {
            globalvarOS = 'WINWOWS';
        } else {
            globalvarOS = 'ANDROID';
        }
    });
})(jQuery);

jQuery.extend({
    onDeviceReady: function() {
        $("#home").load("../components/Startseite/startseite.html");
        $("#header").load("../components/header.html");
        $("#navbar").load("../components/navbar.html");
        $("#tasks").load("../components/tasks.html");
        $("#training").load("../components/training.html");
        $("#notes").load("../components/notes.html");
    }
});

function switchToTab(tabName) {
    // reset other colors
    let icons = document.getElementsByClassName('icon-black')
    for (let i = 0; i < icons.length; i++) {
        icons[i].setAttribute('fill', 'black');
    }
    let selectedTabs = document.getElementsByClassName('selected-tab')
    if (selectedTabs.length > 0) {
        for (const el of document.getElementsByClassName('selected-tab')) {
            el.className = ""
        }
    }
    document.getElementById('qr-icon').setAttribute('fill', 'white')

    // set highlightings
    iconID = tabName + "-icon"
    txtID = tabName + "-txt"
    document.getElementById(iconID).setAttribute('fill', '#E01272')
    document.getElementById(txtID).className += 'selected-tab'
}

function changePlan() {
    basicSelected = !basicSelected
    if (basicSelected) {
        document.getElementById('basic-btn').className = 'button is-rounded selected-btn'
        document.getElementById('advanced-btn').className = 'button is-rounded'
    } else {
        document.getElementById('basic-btn').className = 'button is-rounded'
        document.getElementById('advanced-btn').className = 'button is-rounded selected-btn'
    }
    let planElements = document.getElementsByClassName('advanced-check')
    for (let i = 0; i < planElements.length; i++) {
        planElements[i].checked = !(planElements[i].checked)
    }
}

function login() {
    userData.userID = 'xxx'
    userData.firstName = 'xxx'
    userData.lastName = 'xxx'
    userData.email = 'xxx'
    userData.weight = 'xxx'
    userData.height = 'xxx'
}

function loadTasks() {
    newTasks = ''
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        newTasks += '<div class="box"> <p>'+task.title+'</p> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg> <img src="'+task.image+'" alt="Leg Extension"> </div>';

        document.getElementById('tasks').innerHTML = newTasks;
    }
}

// function loadTrainingPlans() { // <li><input type="checkbox"> checkbox 1</li>
//     newPlans = ''
//     for (let i = 0; i < 9; i++) {
//         // newPlans += '<li><input type="checkbox"> '+ 'task' +'</li>';

//         document.getElementById('list-elements').innerHTML = newPlans;
//     }
// }

function goToTasks() {
    // clear old tabs
    document.getElementById('home').className = "hidden"
    document.getElementById('training').className = "hidden"
    document.getElementById('notes').className = "hidden"

    document.getElementById('tasks').className = ""
    switchToTab('tasks')
    loadTasks();
}

function goToHome() {
    // clear old tabs
    document.getElementById('tasks').className = "hidden"
    document.getElementById('training').className = "hidden"
    document.getElementById('notes').className = "hidden"

    document.getElementById('home').className = ""
    switchToTab('home')
}

function goToTraining() {
    // clear old tabs
    document.getElementById('home').className = "hidden"
    document.getElementById('tasks').className = "hidden"
    document.getElementById('notes').className = "hidden"

    document.getElementById('training').className = ""
    switchToTab('training')
}

function goToNotes() {
    // clear old tabs
    document.getElementById('home').className = "hidden"
    document.getElementById('tasks').className = "hidden"
    document.getElementById('training').className = "hidden"

    document.getElementById('notes').className = ""
    switchToTab('notes')
}

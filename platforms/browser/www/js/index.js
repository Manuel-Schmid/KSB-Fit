let globalvarOS = "";
let selectedIcon = "home-icon";
let basicSelected = true;
let emailHash = '';
let activeTab = 'login'

let tasks = [
    {
        title: "Eagle Glute",
        image: "../img/task-images/task (1)1.jpeg",
        description: "VORBEREITUNG <br/>"+
        "Bauchpolster so einstellen, dass die Unterarme bequem auf den Unterarmpolstern aufliegen. Fußleiste auf die gewünschte Startposition einstellen. Ein Knie und Ellenbogen auf die Polster auflegen und Griffe umfassen. Fuß des anderen Beins an die Fußleiste stellen."+
        "BEWEGUNG <br/>"+  
        "Fußleiste nach hinten und oben drücken, Körperhaltung beibehalten. Beinseite wechseln und Ubebung entsprechen wiederholen.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Leg Press",
        image: "../img/task-images/task (2)1.jpeg",
        description: "VORBEREITUNG <br/>"+ 
        "Rückenlehne auf die gewünschte Neigung einstellen. Fußplatte so einstellen, dass Ihre Knie ungefähr einen rechten Winkel bilden. Füße schulterbreit auf die Fußplatte stellen und leicht nach aussen richten. <br/>"+
        "BEWEGUNG <br/>"+
        "Sitz mit den Beinen nach hinten drücken. HINWEIS: Die Knie nicht überstrecken!",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Prone Leg Curl",
        image: "../img/task-images/task (3)1.jpeg",
        description: "VORBEREITUNG <br/>"+
        "Beinpolster bequem hinten oberhalb dem Fußgelenk einstellen. Knie auf die Drehachse ausrichten. Nach vorn gegen das Oberschenkelpolster lehnen, Unterarme auf die Polster auflegen und Griffe umfassen.<br/>"+
        "BEWEGUNG <br/>"+ 
        "Mit den Beinen das Beinpolster gegen das Gesäß ziehen.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Hip",
        image: "../img/task-images/task (4)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Leg Extension",
        image: "../img/task-images/task (5)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Lateral Raise",
        image: "../img/task-images/task (6)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Lat Pulldown",
        image: "../img/task-images/task (7)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Chest Press",
        image: "../img/task-images/task (8)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Overhead Press",
        image: "../img/task-images/task (9)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Plate Loaded Smith",
        image: "../img/task-images/task (10)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Arm / Bicep Curl",
        image: "../img/task-images/task (11)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Fly / Rear Delt",
        image: "../img/task-images/task (12)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Ab Abdominal",
        image: "../img/task-images/task (13)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Arm Tricep",
        image: "../img/task-images/task (14)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Eagle Back Extension",
        image: "../img/task-images/task (15)1.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
]

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

// --------------------------------------------------------------------------
//  Firebase Database Handling

const firebaseConfig = {
    apiKey: "AIzaSyDJtK_EBn0vu_iGBI40TQVL17Rh2ZDF9Fo",
    authDomain: "ksb-fit-d9512.firebaseapp.com",
    databaseURL: "https://ksb-fit-d9512-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ksb-fit-d9512",
    storageBucket: "ksb-fit-d9512.appspot.com",
    messagingSenderId: "916377612326",
    appId: "1:916377612326:web:3b8ff037113373bafab6e7",
    measurementId: "G-GME14G0GC1"
};

firebase.initializeApp(firebaseConfig);

// Reference message collection
var messagesRef = firebase.database().ref('messages');

/*{
"provider": "anonymous",
"uid": "fe2b73cb-86ea-49d1-ba55-0be7d33e492f"
}*/
firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
});

// ready data
let nameV, passwordV, emailV, weightV, heightV;

function setLoginData() {
    nameV = document.getElementById('name-input').value
    emailV = document.getElementById('email-input').value
    passwordV = document.getElementById('password-input').value
    weightV = document.getElementById('weight-input').value
    heightV = document.getElementById('height-input').value

    return !(emailV === "" || passwordV === "") && validateEmail(emailV)
}

function login() {
    if(setLoginData()) { // login
        if (activeTab === 'login') {
            firebase.database().ref('user/'+ emailV.hashCode()).on('value', function(snapshot) {
                try {
                    if (snapshot.val().password === passwordV.hashCode()) {
                        // login successful
                        document.getElementById('login-link').innerHTML = (snapshot.val().name).split(' ')[0];
                        emailHash = emailV.hashCode()
                        window.location.href = "#";
                        loadNotes()
                    } else {
                        alert('Falsche Kombination')
                    }
                } catch (error) {
                    alert('Für diese Email wurde noch kein Konto registriert')
                }
            });
        } else { // signup
            if ((nameV === "") || (weightV === "") || (heightV === "")) {
                alert('Befüllen Sie bitte sämtliche Felder')
            } else {
                firebase.database().ref('user/'+ emailV.hashCode()).set({
                    name:nameV,
                    password:passwordV.hashCode(),
                    weight:weightV,
                    height:heightV
                });
                document.getElementById('login-link').innerHTML = nameV.split(' ')[0];
                emailHash = emailV.hashCode()
                window.location.href = "#";
                loadNotes()
            }
        }
    } else {
        alert('Bitte geben Sie gültige Daten ein')
    }
}

function insertNote(text) {
    if (emailHash !== "") {
        firebase.database().ref('/notes/'+Date.now()).set({
            user:emailHash,
            date:getCurrentDate(true),
            text:text
        });
        loadNotes()
    }
    else {
        alert('Sie müssen angemeldet sein um Notizen zu verfassen.')
    }
}

function getCurrentDate(isSwissFormat) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let connector = isSwissFormat ? '.' : '-'
    return dd + connector + mm + connector + yyyy;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

// Insert 


// --------------------------------------------------------------------------


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

function loadTasks() {
    newTasks = ''
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        newTasks += '<div class="box"> <p>'+task.title+'</p> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg> <img src="'+task.image+'" alt="Leg Extension"> </div>';

        document.getElementById('tasks').innerHTML = newTasks;
    }
}

function loadNotes() {
    document.getElementById('notelist').innerHTML = ''
    firebase.database().ref('/notes/').on('value', function(snapshot) {
        let snapObj = snapshot.val();
        for (const el of Object.entries(snapObj)) {
            for (const note of Object.entries(el)) {
                if (note[1].date !== undefined && note[1].user === emailHash) {
                    document.getElementById('notelist').innerHTML += '<div class="box"> <p> Training vom <b>'+ note[1].date +'</b> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg> </p> </div>';
                }
            }
        }
    });
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
    loadNotes()
}

function switchLogin(tab) {
    let loginClass = document.getElementById('login-tab').className
    document.getElementById('login-tab').className = document.getElementById('signup-tab').className
    document.getElementById('signup-tab').className = loginClass
    if (tab === 'login') {
        activeTab = 'login'
        document.getElementById('name-field').className = 'field hidden'
        document.getElementById('sizes-field').className = 'row hidden'
        document.getElementById('login-btn').innerHTML = 'Anmelden'
    } else if (tab === 'signup') {
        activeTab = 'signup'
        document.getElementById('name-field').className = 'field'
        document.getElementById('sizes-field').className = 'row'
        document.getElementById('login-btn').innerHTML = 'Speichern'
    }
}
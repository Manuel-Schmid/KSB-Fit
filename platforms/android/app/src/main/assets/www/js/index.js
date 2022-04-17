// run: simulate android

let globalvarOS = "";
let basicSelected = true;
let emailHash = '';
let activeTab = 'login';

let tasks = [
    {
        title: "Glute",
        image: "img/task-images/task (1)1.jpeg",
        vorbereitung: "Bauchpolster so einstellen, dass die Unterarme bequem auf den Unterarmpolstern aufliegen. Fußleiste auf die gewünschte Startposition einstellen. Ein Knie und Ellenbogen auf die Polster auflegen und Griffe umfassen. Fuß des anderen Beins an die Fußleiste stellen.",
        bewegung: "Fußleiste nach hinten und oben drücken, Körperhaltung beibehalten. Beinseite wechseln und Uebung entsprechen wiederholen.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Leg Press",
        image: "img/task-images/task (2)1.jpeg",
        vorbereitung: "Rückenlehne auf die gewünschte Neigung einstellen. Fußplatte so einstellen, dass Ihre Knie ungefähr einen rechten Winkel bilden. Füße schulterbreit auf die Fußplatte stellen und leicht nach aussen richten.",
        bewegung: "Sitz mit den Beinen nach hinten drücken. HINWEIS: Die Knie nicht überstrecken!",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Prone Leg Curl",
        image: "img/task-images/task (3)1.jpeg",
        vorbereitung: "Beinpolster bequem hinten oberhalb dem Fußgelenk einstellen. Knie auf die Drehachse ausrichten. Nach vorn gegen das Oberschenkelpolster lehnen, Unterarme auf die Polster auflegen und Griffe umfassen.",
        bewegung: "Mit den Beinen das Beinpolster gegen das Gesäß ziehen.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Hip Abduction / Adduction",
        image: "img/task-images/task (4)1.jpeg",
        vorbereitung: "Hip Abduction - Startposition: Beine eng zusammen, Beinpolster sind an der Aussenseite der Oberschenkel. HINWEIS: Rückenlehne zurückneigen, um eine höhere Belastung des Glutaeus medius zu erzielen. <br/>"+
        "Hip Adduction - Startposition: Beine bilden ein weites V und Beinpolster sind an der Innenseite der Oberschenkel.",
        bewegung: "Drücken Sie die Knie nach Innen, respektive nach aussen.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Leg Extension",
        image: "img/task-images/task (5)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Lateral Raise",
        image: "img/task-images/task (6)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Lat Pulldown",
        image: "img/task-images/task (7)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Chest Press",
        image: "img/task-images/task (8)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Overhead Press",
        image: "img/task-images/task (9)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Plate Loaded Smith",
        image: "img/task-images/task (10)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Arm / Bicep Curl",
        image: "img/task-images/task (11)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Fly / Rear Delt",
        image: "img/task-images/task (12)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Ab Abdominal",
        image: "img/task-images/task (13)1.jpeg",
        vorbereitung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        bewegung: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Arm Tricep",
        image: "img/task-images/task (14)1.jpeg",
        vorbereitung: "Sitzhöhe so einstellen, dass die Oberarme zum Oberkörper einen rechten Winkel bilden, während die Arme auf den Oberarmpolstern aufliegen. Handgriffe umfassen.",
        bewegung: "Griffe nach vorne drücken.",        
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        title: "Back Extension",
        image: "img/task-images/task (15)1.jpeg",
        vorbereitung: "Fußleiste so einstellen, dass die Knie leicht gebeugt sind und das Becken am Lendenpolster stabilisiert ist. Rücken leicht gegen das Rückenpolster stellen.",
        bewegung: "Mit dem oberen Rücken das Rückenpolster nach hinten drücken.<br/>"+
        "Rücken nicht überstrecken!",
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

// document.addEventListener('deviceready', function () {

// }, false);




// --------------------------------------------------------------------------

// ready data
// let nameV, passwordV, emailV, weightV, heightV;

// function setLoginData() {
//     nameV = document.getElementById('name-input').value
//     emailV = document.getElementById('email-input').value
//     passwordV = document.getElementById('password-input').value
//     weightV = document.getElementById('weight-input').value
//     heightV = document.getElementById('height-input').value

//     return !(emailV === "" || passwordV === "") && validateEmail(emailV)
// }

// register (sign-up)
$(document).on('click', '#login-btn', function(){
    if (activeTab === 'login') {
        let email = $("#email-input").val();
        let password = $("#password-input").val();

        if($.trim(email).length>0 & $.trim(password).length>0) {
            $.ajax({
                type:"POST",  //Request type
                url: "http://localhost:63342/KSB-Fit-CMS/includes/requests.php",
                data:{ request:'getUserSalt', email:email },
                cache:false,
                success:function(salt) {
                    if (salt !== 'null') { // user exists and has salt stored in db
                        let hashedPW = getHashedPassword(password, salt) 
                        $.ajax({
                            type:"POST",  //Request type
                            url: "http://localhost:63342/KSB-Fit-CMS/includes/requests.php",
                            data:{ request:'login', email:email, password:hashedPW },
                            cache:false,
                            success:function(loginCorrect) {
                                if (loginCorrect == '1') {
                                    alert('Success: login correct')
                                } else if (loginCorrect == '0') {
                                    alert('Warning: login incorrect')
                                } else {
                                    alert('An error occurred');
                                }
                            }
                        })
                    } else {
                        alert('There is no user registered with this email');
                    }                    
                }
            })
        }
        else {
            alert("Füllen Sie bitte alle Felder aus.");
        }

    } else { // signup
        let email = $("#email-input").val();
        let password = $("#password-input").val();
        let weight = $("#weight-input").val();
        let height = $("#height-input").val();
        let dob = $("#dob-input").val();
        
        if($.trim(email).length>0 & $.trim(password).length>0 & $.trim(weight).length>0 & $.trim(height).length>0 & $.trim(dob).length>0) {
            let salt = generateSalt();
            let hashedPW = getHashedPassword(password, salt) 

            $.ajax({
                type:"POST",  //Request type
                url: "http://localhost:63342/KSB-Fit-CMS/includes/requests.php",
                data:{ request:'registration', email:email, password:hashedPW, salt:salt, weight: weight, height: height, dob: dob }, // parameter für POST ($_POST['xxx'])
                cache:false,
                success:function(data) {
                    alert('successful registration: ' + data)
                }
            })
        }
        else {
            alert("Füllen Sie bitte alle Felder aus.");
        }
    }
});


function login() {
/*
    if(setLoginData()) { // login
        if (activeTab === 'login') {
            // check if login is correct
            // loadNotes()
            // } else {
            //     alert('Falsche Kombination')
            // }
            // } catch (error) {
            //     alert('Für diese Email wurde noch kein Konto registriert')
            // }
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
    
    */
}

function isKSBeMail(email) {
    return email.includes("@ksb-sg.ch");
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

String.prototype.hashCode = function() { // deprecated 
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function getHashedPassword(password, salt) { // return 128-character-string
    return getHash(properties.pepper + salt + password)
}

function getHash(string) { // new
    var shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.update(string);
    var hash = shaObj.getHash("HEX");
    return hash;
}

function generateSalt() {
    return [...Array(10)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

function calcBMI(heightInCm, weight) {
    let bmi = ((weight) / ((heightInCm * heightInCm)/10000))
    return Math.round(bmi * 10) / 10
}

(function($) {
    $(function() {
        "use strict";
        document.addEventListener('deviceready', $.onDeviceReady.bind(this), false);
        if (window.cordova.platformId === 'browser') {
            globalvarOS = 'WINWOWS'; // <- ?? xD
        } else {
            globalvarOS = 'ANDROID';
        }
    });

})(jQuery);
jQuery.extend({
    onDeviceReady: function() {
        $("#home").load("components/Startseite/startseite.html");
        $("#header").load("components/header.html");
        $("#navbar").load("components/navbar.html");
        $("#tasks").load("components/tasks.html");
        $("#training").load("components/training.html");
        $("#notes").load("components/notes.html");
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
        let functionString = `openTaskPopup(false, '`+task.title+`', '`+task.image+`', '`+task.vorbereitung+`', '`+task.bewegung+`', '`+task.videoUrl+`')`;
        newTasks += '<div class="box" onclick="'+functionString+'"> <div class="row"><p class="col s11">'+task.title+'</p> <svg class="col s1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg></div> <img src="'+task.image+'"> </div>';
        
        document.getElementById('tasks-list').innerHTML = newTasks;
    }
}

function openTaskPopup(switchToTab, title, imgUrl, prep, movement, videoUrl) {
    if (switchToTab) goToTasks()
    document.getElementById('task-title').innerHTML = title;
    document.getElementById('task-img').src = imgUrl;
    document.getElementById('task-preparation').innerHTML = prep;
    document.getElementById('task-movement').innerHTML = movement;
    document.getElementById('task-video').href = videoUrl;

    window.location.href = "#task-popup-overlay";
}

function loadNotes() {
    document.getElementById('notelist').innerHTML = ''
    firebase.database().ref('/notes/').on('value', function(snapshot) {
        let snapObj = snapshot.val();
        for (const el of Object.entries(snapObj).reverse()) {
            for (const note of Object.entries(el)) {
                if (note[1].date !== undefined && note[1].user === emailHash) {
                    let functionString = `editNote('`+el[0]+`', '`+note[1].date+`', '`+note[1].text+`')`;
                    document.getElementById('notelist').innerHTML += '<div id="'+el[0]+'" class="box" onclick="'+functionString+'"> <p> Training vom <b>'+ note[1].date +'</b> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg> </p><p id="date-content" class="hidden">'+ note[1].date +'</p> <p id="text-content" class="hidden">'+ note[1].text +'</p></div>';
                }
            }
        }
    });
}

let tmstmp = '';

function createNewNote() {
    tmstmp = '';
    document.getElementById('cur-date').innerHTML = getCurrentDate(true)
    document.getElementById('note-text-area').value = ''
    window.location.href = "#new-note";
}

function editNote(timestamp, date, text) {
    tmstmp = timestamp;
    document.getElementById('cur-date').innerHTML = date
    document.getElementById('note-text-area').value = text
    window.location.href = "#new-note";
}

function saveNote() {
    if (tmstmp === '') { // create new note
        insertNote(document.getElementById('note-text-area').value)
    } else { // update existing note
        updateNote(document.getElementById('cur-date').innerHTML, document.getElementById('note-text-area').value)
    }
    window.location.href = "#";
}

function updateNote(date, text) {
    // console.log(tmstmp +" : "+date+" : "+text);
    firebase.database().ref('/notes/'+tmstmp).set({
        user:emailHash,
        date:date,
        text:text
    });
    // document.getElementById(tmstmp).onclick = editNote(tmstmp, date, text);
    loadNotes()
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

function resetSignup() {
    document.getElementById('signup-form').reset()

}

function switchLogin(tab) {
    // switch active tab
    let loginClass = document.getElementById('login-tab').className
    document.getElementById('login-tab').className = document.getElementById('signup-tab').className
    document.getElementById('signup-tab').className = loginClass
    // clear form
    document.getElementById('signup-form').reset()
    if (tab === 'login') {
        activeTab = 'login'
        document.getElementById('dob-field').className = 'field hidden'
        document.getElementById('sizes-field').className = 'row hidden'
        document.getElementById('login-btn').innerHTML = 'Anmelden'
    } else if (tab === 'signup') {
        activeTab = 'signup'
        document.getElementById('dob-field').className = 'field'
        document.getElementById('sizes-field').className = 'row'
        document.getElementById('login-btn').innerHTML = 'Registrieren'
    }
}

// QR-Scanner

function qrscan() {
    alert("Es wird jetzt der QR Scanner aktiviert");
    // Start a scan. Scanning will continue until something is detected or
    // `QRScanner.cancelScan()` is called.
    // QRScanner.scan(displayContents);
    // Make the webview transparent so the video preview is visible behind it.
    // QRScanner.show(function(status) {
    //     console.log(status);
    // });
    // Be sure to make any opaque HTML elements transparent here to avoid
    // covering the video.
    // QRScanner.cancelScan(function(status) {
    //     console.log(status)
    // });
    // QRScanner.hide(function(status) {
    //     console.log(status);
    // });
}

// function displayContents(err, text) {
//     if (err) {
//         // an error occurred, or the scan was canceled (error code `6`)
//     } else {
//         // The scan completed, display the contents of the QR code:
//         alert(text);
//     }
// }
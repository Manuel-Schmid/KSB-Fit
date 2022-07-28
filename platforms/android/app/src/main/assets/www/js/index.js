// run: simulate android

// document.addEventListener('deviceready', function () {

// }, false);

let globalvarOS = "";
let emailHash = '';
let activeTab = 'login';
let scrollPosition = 0;


// document.addEventListener('deviceready', function () {

// }, false);


// --------------------------------------------------------------------------

// $(document).ready(function(){
//     if (true) { // wenn internetverbindung !!!
//         $.ajax({
//             type:"POST",  //Request type
//             url: properties.requestUrl,
//             data:{ request:'getUserID', email:email, password:hashedPW, salt:salt }, // parameter für POST ($_POST['xxx'])
//             cache:false,
//             success:function(data) {
//                 alert(data)
//             }
//         })
//     }
// });

// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*

$(document).ready(function () {
    
// both for register & login
    $(document).on('click', '#login-btn', function () {
        document.getElementById('signup-error').innerHTML = "";
        document.getElementById('pw-reset__info').innerHTML = "";

        // login
        if (activeTab === 'login') {
            let email = $("#email-input").val();
            let password = $("#password-input").val();

            if ($.trim(email).length > 0 & $.trim(password).length > 0) {
                $.ajax({
                    type: "POST",  //Request type
                    url: properties.requestUrl,
                    data: {request: 'getUserSalt', email: email},
                    cache: false,
                    success: function (salt) {
                        if (salt !== 'null') { // user exists and has salt stored in db
                            let hashedPW = getHashedPassword(password, salt)
                            $.ajax({
                                type: "POST",  //Request type
                                url: properties.requestUrl,
                                data: {request: 'login', email: email, password: hashedPW},
                                cache: false,
                                success: function (userID) {
                                    console.log(userID);
                                    if (userID == '0') {
                                        document.getElementById('signup-error').innerHTML = "Falsches Passwort";
                                        // if (isKSBeMail(email)) { // uncomment this
                                            document.getElementById('pw-reset__info').innerHTML = `Passwort für '<span id="pw-reset__email">` + email + `</span>' zurücksetzen?`;
                                        // }
                                    } else if (userID != '') {
                                        login(userID)
                                    } else {
                                        alert('An error occurred');
                                        // ...
                                    }
                                }
                            })
                        } else {
                            document.getElementById('signup-error').innerHTML = "Diese Email ist noch nicht registriert";
                        }
                    }
                })
            } else {
                document.getElementById('signup-error').innerHTML = "Füllen Sie bitte alle Felder aus";
            }

        } else { // registration (signup)
            let email = $("#email-input").val();
            let password = $("#password-input").val();
            let weight = $("#weight-input").val();
            let height = $("#height-input").val();
            let dob = $("#dob-input").val();

            if ($.trim(email).length > 0 & $.trim(password).length > 0 & $.trim(weight).length > 0 & $.trim(height).length > 0 & $.trim(dob).length > 0) {

                if (!true) { // !isKSBeMail(email) -> check if KSB-eMail <- TODO
                    document.getElementById('signup-error').innerHTML = "Eine KSB E-Mail-Adresse (Endung '@ksb-sg.ch') wird für die Registration benötigt";
                } else {
                    // check if user already exists
                    $.ajax({
                        type: "POST",  // Request type
                        url: properties.requestUrl,
                        data: {request: 'getUserSalt', email: email},
                        cache: false,
                        success: function (salt) {
                            if (salt !== 'null') { // user with this email already exists
                                document.getElementById('signup-error').innerHTML = "Diese Email ist bereits" +
                                 " registriert";

                            } else { // no user with this email exists -> continue registration
                                let salt = generateSalt();
                                let hashedPW = getHashedPassword(password, salt)

                                $.ajax({
                                    type: "POST",  //Request type
                                    url: properties.requestUrl,
                                    data: {
                                        request: 'registration',
                                        email: email,
                                        password: hashedPW,
                                        salt: salt,
                                        weight: weight,
                                        height: height,
                                        dob: dob
                                    }, // parameter für POST ($_POST['xxx'])
                                    cache: false,
                                    success: function (data) {
                                        switchLogin('login')
                                        // send eMail
                                    }
                                })
                            }
                        }
                    })
                }
            } else {
                document.getElementById('signup-error').innerHTML = "Füllen Sie bitte alle Felder aus";
            }
        }
    });

    $(document).on('click', '#pw-reset__info', function () {
        let email = document.getElementById('pw-reset__email').innerHTML

        document.getElementById('signup-error').innerHTML = "";
        document.getElementById('pw-reset__info').innerHTML = "";

        $.ajax({
            type: "POST",  // Request type
            url: properties.requestUrl,
            data: {request: 'resetPassword', email: email},
            cache: false,
            success: function (successful) {
                if (successful == 1) {
                    document.getElementById('pw-reset__info').innerHTML = "Eine E-Mail mit Anweisungen zur Passwortzurücksetzung wurde an '" + email + "' gesendet.";
                }
            }
        })
    });

    $(document).on('click', '#insert-session-btn-id', function () { // insert-session-btn-id  *is a placeholder*
        var sessionExercises = [];
        // make dynamic
        for (var i = 1; i <= 10; i++) {
            sessionExercises.push({
                exerciseID: i,
                weight: (i + 7 + (i * 0.5)),
                reps: ((i * 2) + 15)
            });
        }

        if (sessionExercises.length > 0) {
            let workoutID = 1 // make dynamic

            $.ajax({
                type: "POST",  // Request type
                url: properties.requestUrl,
                data: {request: 'insertSession', workoutID: workoutID, sessionExercises: sessionExercises},
                cache: false,
                success: function (data) {
                    // console.log(data)
                    // ...
                }
            })
        }
    });

// save workout plan -> already new 
    $(document).on('click', '#save-workout-btn-id', function () { // save-workout-btn-id  *is a placeholder*
        let exercises = [21, 25, 29] // [1,5,7,9] (id's)
        let weekdays = ['Mo', 'Fr'] // ['Mo','Tu','Fr']
        let notifications = 1 // $("#cbNotifications").checked ? 1 : 0;
        let title = 'My Workout X.0'
        let userID = document.getElementById('userID').innerHTML != '' ? document.getElementById('userID').innerHTML : 2; // change "2"

        if (weekdays.length > 0 & exercises.length > 0) {
            $.ajax({
                type: "POST",  // Request type
                url: properties.requestUrl,
                data: {
                    request: 'insertWorkout',
                    title: title,
                    userID: userID,
                    notifications: notifications,
                    weekdays: weekdays,
                    exercises: exercises
                },
                cache: false,
                success: function (data) {
                    // console.log(data)
                    // ...
                }
            })
        } else {
            alert("Füllen Sie bitte alle Felder aus");
            // ...
        }
    });

    (function ($) {
        $(function () {
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
            onDeviceReady: function () {
                $("#home").load("components/home.html");
                $("#header").load("components/header.html");
                $("#navbar").load("components/navbar.html");
                $("#exercises").load("components/exercises.html");
                $("#training").load("components/training.html");
                $("#settings").load("components/settings.html");
            }
        }
    );

}); // (document).ready

function login(userID) {
    document.getElementById('userID').innerHTML = userID;
    $('#signup__close').trigger('click'); // closes login popup
    document.getElementById('login-button').innerHTML = "Logout"; // todo ?
}

function isKSBeMail(email) {
    return email.includes("@ksb-sg.ch");
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

function getHashedPassword(password, salt) { // return 128-character-string
    return getHash(conf.pepper + salt + password)
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
    let bmi = ((weight) / ((heightInCm * heightInCm) / 10000))
    return Math.round(bmi * 10) / 10
}

function switchToTab(tabName) {
    // reset scroll position
    window.scrollTo(0, 0);
    // reset other colors
    let icons = document.getElementsByClassName('nav__icon')
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.add('fa-xl');
        icons[i].classList.remove('fa-2xl');
    }
    let selectedTabs = document.getElementsByClassName('nav__text--selected')
    if (selectedTabs.length > 0) {
        for (const el of document.getElementsByClassName('nav__text--selected')) {
            el.className = ""
        }
    }

    // set highlightings
    iconID = tabName + "-icon"
    txtID = tabName + "-txt"
    document.getElementById(iconID).classList.add('fa-2xl');
    document.getElementById(iconID).classList.remove('fa-xl');
    document.getElementById(txtID).classList.add('nav__text--selected');
}

// function changePlan() {
//     basicSelected = !basicSelected
//     if (basicSelected) {
//         document.getElementById('basic-btn').className = 'button is-rounded selected-btn'
//         document.getElementById('advanced-btn').className = 'button is-rounded'
//     } else {
//         document.getElementById('basic-btn').className = 'button is-rounded'
//         document.getElementById('advanced-btn').className = 'button is-rounded selected-btn'
//     }
//     let planElements = document.getElementsByClassName('advanced-check')
//     for (let i = 0; i < planElements.length; i++) {
//         planElements[i].checked = !(planElements[i].checked)
//     }
// }

function displayExercises(galleryView) {
    // load exercises as HTML popups from DB
    $.ajax({
        type: "POST",  //Request type
        url: properties.requestUrl,
        data: {request: 'getExercisesHTML'}, // parameter für POST ($_POST['xxx'])
        cache: false,
        success: function (json_data) {
            let exercises = Object.values(JSON.parse(json_data))
            let exercisesHTMLString = ''
            exercises.forEach(exercise => {

                functionString = "openExercisePopup(false, '" + exercise['title'] + "', '" + exercise['image'] + "', '" + exercise['preparation'] + "', '" + exercise['movement'] + "', '" + exercise['muscleGroups'] + "', '" + exercise['videoURL'] + "')";
                if (galleryView) {
                    exercisesHTMLString += '<div class="box" onclick="' + functionString + '">' +
                        '<div class="row">' +
                        '<p class="col s11">' + exercise['title'] + '</p>' +
                        '<svg class="col s1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg>' +
                        '</div>' +
                        '<div class="exercise-list-img-container">' +
                        '<img class="exercises-list-img" src="' + exercise['image'] + '" alt="Uebung Bild">' +
                        '</div>' +
                        '</div>';
                } else {
                    exercisesHTMLString += '<div class="box" onclick="' + functionString + '">' +
                        '<div class="row">' +
                        '<span class="col s11">' + exercise['title'] + '</span>' +
                        '<svg class="col s1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg>' +
                        '</div>' +
                        '</div>';
                }
            });

            document.getElementById('exercises-list').innerHTML = exercisesHTMLString
        }
    })
}

function displayExerciseCheckboxes() {
    $.ajax({
        type: "POST",  //Request type
        url: properties.requestUrl,
        data: {request: 'getExercisesMinHTML'}, // parameter für POST ($_POST['xxx'])
        cache: false,
        success: function (json_data) {
            let exercises = Object.values(JSON.parse(json_data))
            let exercisesCBHTMLString = ''
            exercises.forEach(exercise => {
                exercisesCBHTMLString += '<img class="grid__item" name="' + exercise['title'] + '||' + exercise['exerciseID'] + '" src="' + exercise['image'] + '" />'
            });

            // exercisesCBHTMLString += '<script> $(".grid__item").imgCheckbox(); </script>'

            document.getElementById('exercise-grid').innerHTML = exercisesCBHTMLString;
            $(".grid__item").imgCheckbox();
        }
    })
}

function openExercisePopup(switchToTab, title, imgUrl, prep, movement, muscleGroups, videoUrl) {
    if (switchToTab) goToExercises() // ? todo
    document.getElementById('exercise-title').innerHTML = title;
    document.getElementById('exercise-img').src = imgUrl;
    updateMuscleInput(muscleGroups);
    document.getElementById('exercise-preparation').innerHTML = prep;
    document.getElementById('exercise-movement').innerHTML = movement;
    document.getElementById('exercise-video').href = videoUrl;

    disableScroll();
    scrollPosition = window.pageYOffset;

    window.location.href = "#exercise-popup-overlay";
}

// function loadNotes() {
//     document.getElementById('notelist').innerHTML = ''
//     firebase.database().ref('/notes/').on('value', function(snapshot) {
//         let snapObj = snapshot.val();
//         for (const el of Object.entries(snapObj).reverse()) {
//             for (const note of Object.entries(el)) {
//                 if (note[1].date !== undefined && note[1].user === emailHash) {
//                     let functionString = `editNote('`+el[0]+`', '`+note[1].date+`', '`+note[1].text+`')`;
//                     document.getElementById('notelist').innerHTML += '<div id="'+el[0]+'" class="box" onclick="'+functionString+'"> <p> Training vom <b>'+ note[1].date +'</b> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path></svg> </p><p id="date-content" class="hidden">'+ note[1].date +'</p> <p id="text-content" class="hidden">'+ note[1].text +'</p></div>';
//                 }
//             }
//         }
//     });
// }

// function createNewNote() {
//     tmstmp = '';
//     document.getElementById('cur-date').innerHTML = getCurrentrimate(true)
//     document.getElementById('note-text-area').value = ''
//     window.location.href = "#new-note";
// }

// function editNote(timestamp, date, text) {
//     tmstmp = timestamp;
//     document.getElementById('cur-date').innerHTML = date
//     document.getElementById('note-text-area').value = text
//     window.location.href = "#new-note";
// }

// function saveNote() {
//     if (tmstmp === '') { // create new note
//         insertNote(document.getElementById('note-text-area').value)
//     } else { // update existing note
//         updateNote(document.getElementById('cur-date').innerHTML, document.getElementById('note-text-area').value)
//     }
//     window.location.href = "#";
// }

// function updateNote(date, text) {
//     // console.log(tmstmp +" : "+date+" : "+text);
//     firebase.database().ref('/notes/'+tmstmp).set({
//         user:emailHash,
//         date:date,
//         text:text
//     });
//     // document.getElementById(tmstmp).onclick = editNote(tmstmp, date, text);
//     loadNotes()
// }

// function loadTrainingPlans() { // <li><input type="checkbox"> checkbox 1</li>
//     newPlans = ''
//     for (let i = 0; i < 9; i++) {
//         // newPlans += '<li><input type="checkbox"> '+ 'exercise' +'</li>';

//         document.getElementById('list-elements').innerHTML = newPlans;
//     }
// }

function goToExercises() {
    // clear old tabs
    document.getElementById('home').className = "obj--hidden"
    document.getElementById('training').className = "obj--hidden"
    document.getElementById('settings').className = "obj--hidden"

    document.getElementById('exercises').className = ""
    switchToTab('exercises')
    displayExercises(true);
}

function goToHome() {
    // clear old tabs
    document.getElementById('exercises').className = "obj--hidden"
    document.getElementById('training').className = "obj--hidden"
    document.getElementById('settings').className = "obj--hidden"

    document.getElementById('home').className = ""
    switchToTab('home')
}

function goToTraining() {
    // clear old tabs
    document.getElementById('home').className = "obj--hidden"
    document.getElementById('exercises').className = "obj--hidden"
    document.getElementById('settings').className = "obj--hidden"

    document.getElementById('training').className = ""
    switchToTab('training')
}

function goToSettings() {
    // clear old tabs
    document.getElementById('home').className = "obj--hidden"
    document.getElementById('exercises').className = "obj--hidden"
    document.getElementById('training').className = "obj--hidden"

    document.getElementById('settings').className = ""
    switchToTab('settings')
    // loadNotes()
}

function resetSignup() {
    document.getElementById('signup-form').reset()
    if (activeTab === 'signup') {
        switchLogin('login')
    }
    document.getElementById('login-button').innerHTML = "Anmelden";
}

function switchLogin(tab) {
    // switch active tab
    let loginClass = document.getElementById('login-tab').className
    document.getElementById('login-tab').className = document.getElementById('signup-tab').className
    document.getElementById('signup-tab').className = loginClass
    document.getElementById('signup-error').innerHTML = "";
    document.getElementById('pw-reset__info').innerHTML = "";
    // clear form
    document.getElementById('signup-form').reset()
    if (tab === 'login') {
        activeTab = 'login'
        document.getElementById('dob-field').className = 'field obj--hidden'
        document.getElementById('sizes-field').className = 'row obj--hidden'
        document.getElementById('login-btn').innerHTML = 'Anmelden'
        document.getElementById('signup-tab').classList.toggle('is-active')
    } else if (tab === 'signup') {
        activeTab = 'signup'
        document.getElementById('dob-field').className = 'field'
        document.getElementById('sizes-field').className = 'row'
        document.getElementById('login-btn').innerHTML = 'Registrieren'
        document.getElementById('login-tab').classList.toggle('is-active')
    }
    console.log(activeTab);
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {32: 1, 37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("scrolling", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// QR-Scanner

// function qrscan() {
// alert("Es wird jetzt der QR Scanner aktiviert");
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
// }

// function displayContents(err, text) {
//     if (err) {
//         // an error occurred, or the scan was canceled (error code `6`)
//     } else {
//         // The scan completed, display the contents of the QR code:
//         alert(text);
//     }
// }






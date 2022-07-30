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
                                    } else if (userID != '') { // login success
                                        login(userID)
                                    } 
                                    // else {
                                    //     alert('An error occurred');
                                    //     // ...
                                    // }
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
                                    },
                                    cache: false,
                                    success: function (userID) {
                                        if (userID == '0') {
                                            document.getElementById('signup-error').innerHTML = "Fehler bei der Registrierung";
                                        } else if (userID != '') {
                                            login(userID)
                                        }
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

    $(document).on('click', '#session_save_btn', function () {
        let errormsg = document.getElementById('session_validation__error');
        errormsg.innerHTML = '';
        // validation
        // if (document.getElementById('session_date').valueAsDate > new Date()) {
        //     errormsg.innerHTML = 'Das Datum darf nicht in der Zukunft liegen'
        // } else {
            let countEmpty = 0;
            for (const el of document.getElementsByClassName('session_exercise__input')) {
                if ($.trim(el.value).length < 1) { countEmpty++; break; }
            };
            if (countEmpty > 0) {
                errormsg.innerHTML = 'Nicht alle Sets & Reps angegeben'
            } else {
                // validation successful 
                let sessionExerciseData = []
                for (const exercise of document.getElementsByClassName('session_exercise__row')) {
                    sessionExerciseData.push({
                        exerciseID: exercise.dataset.id,
                        sets: exercise.getElementsByClassName('session_exercise_sets')[0].value,
                        reps: exercise.getElementsByClassName('session_exercise_reps')[0].value
                    })
                }

                console.log(sessionExerciseData);
                insertSession(sessionExerciseData);
                // redirect & update
            // }
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


function insertSession(sessionExerciseData) {
    let workoutID = document.getElementById('workout_id').innerHTML;
    if (workoutID > 0 && sessionExercises.length > 0) {
        $.ajax({
            type: "POST",  // Request type
            url: properties.requestUrl,
            data: {request: 'insertSession', workoutID: workoutID, sessionExerciseData: sessionExerciseData},
            cache: false,
            success: function (data) {
                // console.log(data)
                // ...
            }
        })
    }
}

function login(userID) {
    document.getElementById('userID').innerHTML = userID;
    $('#signup__close').trigger('click'); // closes login popup
    document.getElementById('login-button').classList.add('obj--hidden')
    document.getElementById('logout-button').classList.remove('obj--hidden')
    // ...
}

function logout() {
    document.getElementById('userID').innerHTML = 0;
    document.getElementById('login-button').classList.remove('obj--hidden')
    document.getElementById('logout-button').classList.add('obj--hidden')
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

function displayTrainings() {
    document.getElementById('create-workout-btn').classList.remove('obj--hidden');
    document.getElementById('trainings-container').classList.remove('obj--hidden');
    document.getElementById('training_info_text').classList.add('obj--hidden');

    $.ajax({
        type: "POST",  //Request type
        url: properties.requestUrl,
        data: {request: 'getWorkoutsHTML', userID: document.getElementById('userID').innerHTML}, // parameter für POST ($_POST['xxx'])
        cache: false,
        success: function (json_data) {
            let workouts = Object.values(JSON.parse(json_data));

            if (workouts != "") { // if user has workouts
                let trainingsHTMLString = ''
                workouts.forEach(workout => {
                    
                    let imageHTML = (workout.color===null) ? '<img src="../img/training.jpg" alt="bild" class="training__image"></img>' : '<div class="training__image" style="background-color:'+workout.color+'"><p class="training__image__text" style="color: '+invertColor(workout.color, true)+'">'+(workout.title.split('')[0]).toUpperCase()+'</p></div>';
                    let nextSessionHTML = (workout.nextSessionDate != 0) ? '<p class="trainings__icon__session">&#8594;&nbsp;'+workout.nextSessionDate+'</p></div>' : '<p class="trainings__icon__session" style="visibility: hidden">&#8594;&nbsp;</p></div>';

                    trainingsHTMLString += 
                        '<div class="card training__default" onclick="openWorkoutPopup('+workout.workoutID+',`'+workout.title+'`,'+workout.sessionCount+','+workout.perfectSessionCount+',`'+workout.nextSessionDate+'`)">'+
                            '<div><div class="content training__content">'+ imageHTML +
                                '<span class="training__name">'+workout.title+'</span><i class="fa-solid fa-chevron-right fa-sm training__chevron"></i></div></div><div class="trainings__icons__row"><div class="trainings__icons__item"><i class="fa-solid fa-calendar-check"></i>'+
                                '<p class="trainings__icon__text">'+workout.sessionCount+'</p></div><div class="trainings__icons__item"><i class="fa-solid fa-crown"></i>'+
                                '<p class="trainings__icon__text">'+workout.perfectSessionCount+'</p></div><div class="trainings__icons__item trainings__icons__item__session">'
                                + nextSessionHTML +
                            '</div>'+
                        '</div>'

                });

                document.getElementById('trainings-container').innerHTML = trainingsHTMLString
            } else {
                document.getElementById('trainings-container').innerHTML = '';
            }
        }
    })
}

function openWorkoutPopup(workoutID, title, sessionCount, perfectSessionCount, nextSessionDate) {
    document.getElementById('training_scroll_container').classList.add('overflow_y_scroll');
    document.getElementById('training_scroll_container').scrollTop = 0;

    document.getElementById('workout_id').innerHTML = workoutID;
    document.getElementById('workout_title').innerHTML = title;
    document.getElementById('workout_sessions').innerHTML = (sessionCount!=1) ? sessionCount+' Sessions' : '1 Session';
    document.getElementById('workout_next_session').innerHTML = (nextSessionDate!=0) ? getWeekday(nextSessionDate) + nextSessionDate : ' --- ';

    window.location.href = "#default-training";
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

function displayExerciseCheckboxes() {
    $.ajax({
        type: "POST",
        url: properties.requestUrl,
        data: {request: 'getExercisesMinHTML'}, // parameter für POST ($_POST['xxx'])
        cache: false,
        success: function (json_data) {
            let exercises = Object.values(JSON.parse(json_data))
            let exercisesCBHTMLString = ''
            exercises.forEach(exercise => {
                exercisesCBHTMLString += '<img class="grid__item" name="' + exercise['title'] + '||' + exercise['exerciseID'] + '" src="' + exercise['image'] + '" />'
            });

            document.getElementById('exercise-grid').innerHTML = exercisesCBHTMLString;
            $(".grid__item").imgCheckbox();
        }
    })
}

function displaySessionExercisesList() {
    let workoutID = document.getElementById('workout_id').innerHTML;
    if (workoutID > 0) {
        $.ajax({
            type: "POST",
            url: properties.requestUrl,
            data: { request: 'getWorkoutExercises', workoutID: workoutID },
            cache: false,
            success: function (json_data) {
                let exercises = Object.values(JSON.parse(json_data))
    
                let exercisesListHTMLString = '';
                if (exercises.length < 1) {
                    exercisesListHTMLString += '<tr><td>Keine Übung im Trainingsplan</td></tr>'
                } else {
                    exercises.forEach(exercise => {
                        exercisesListHTMLString += '<tr class="session_exercise__row" data-id="'+ exercise.exerciseID +'"> <td class="session_exercise__title">' + exercise.title + '</td> <td> <input type="number" class="session_exercise__input session_exercise_sets"> </td> <td> <input type="number" class="session_exercise__input session_exercise_reps"> </td> </tr>'
                    });
                }
    
                document.getElementById('session_exercises_list').innerHTML = exercisesListHTMLString;
            }
        })
    }
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

    if (isLoggedIn()) displayTrainings();
    else {
        document.getElementById('create-workout-btn').classList.add('obj--hidden');
        document.getElementById('trainings-container').classList.add('obj--hidden');
        document.getElementById('training_info_text').classList.remove('obj--hidden');
    }    
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
}

function isLoggedIn() {
    return (document.getElementById('userID').innerHTML > 0)
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

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

const weekdays = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
function getWeekday(date) {
    let dateArr = date.split('.')
    if (dateArr.length !== 3) return '';
    const d = new Date((20+dateArr[2]), (dateArr[1]-1), dateArr[0]);
    return weekdays[d.getDay()] + ", ";
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






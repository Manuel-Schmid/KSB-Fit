/*
(function() {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
function onDeviceReady() {
        $("#uebernahme").click(function() {
            alert('uebernahme');
            meldung('test - Meldung als alert');
        });
    };
function meldung(text) {
        alert(text);
    };
})();
*/
let globalvarOS = "";
let selectedIcon = "home-icon";
let userData = {
    firstName: 'unknown',
    lastName: 'unknown',
    email: 'unknown',
    weight: 'unknown',
    height: 'unknown'
}
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

// --------------------------------------------------------------------------
// Initialize Firebase - Anonymous
// --------------------------------------------------------------------------
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
var userRef = firebase.database().ref('user');

/*{
"provider": "anonymous",
"uid": "fe2b73cb-86ea-49d1-ba55-0be7d33e492f"
}*/
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});


(function($) {
    $(function() {
        "use strict";
        document.addEventListener('deviceready', $.onDeviceReady.bind(this), false);
        if (window.cordova.platformId === 'browser') {
            globalvarOS = 'WINWOWS';
        } else {
            globalvarOS = 'ANDROID';
        }
        // $.start();


        // --------------------------------------------------------------------------
        // Darstellen der Daten
        // --------------------------------------------------------------------------
        // timeout, weil auf Firebase gewartet wird und aktionen so gut sichtbar sind
        // https://console.firebase.google.com/u/1/project/m335-test/database/m335-test/data
        // showData();
        /*getEinDatenSatz(0);
        setTimeout(function() {
            deleteDaten(3);
            setTimeout(function() {
                insertDaten(3);
                setTimeout(function() {
                    updateDaten(3);
                }, 6000);
            }, 6000);
        }, 6000); */
    }); // End Document Ready

})(jQuery); // End of jQuery name space
jQuery.extend({
    onDeviceReady: function() {
        $("#spruch").on("click", function() {
            alert("Es wurde geklickt");
            $.ajax({
                url: 'components/spruchwaehlen.html',
                dataType: 'html',
                success: function(response) {
                    // Wenn error - Meldungen existieren, anzeigen
                    console.log(response);
                    console.info("Test");
                    $("#header").html("Gib bitte hier deinen Wunschtext und deine Adresse ein:");
                    $("#spruch").html("");
                    $("#spruch1").html("");
                    $("#spruch2").html("");
                    $("#spruch3").html("");
                    $("#sprucheingeben").html(response);
                    $('input#input_text, textarea#textarea2').characterCounter();
                }

            });

            $.ajax({
                url: 'components/bestellbutton.html',
                dataType: 'html',
                success: function(response) {
                    // Wenn error - Meldungen existieren, anzeigen
                    console.info("Test");
                    $("#bestellbutton").html(response);
                }

            });

        });

        $("#home").load("../components/Startseite/startseite.html");
        $("#header").load("../components/header.html");
        $("#navbar").load("../components/navbar.html");
        $("#tasks").load("../components/tasks.html");

        $("#bestellbutton").on("click", function() {
            alert("Es wurde geklickt1");
            $.ajax({
                url: 'components/zahlung.html',
                dataType: 'html',
                success: function(response) {
                    console.info("Test");
                    $("#header").html("Bitte überweise jetzt den Betrag an die untenstehende Adresse oder überweise den Betrag einfach per Twint an untenstehende Tel.-Nr.");
                    $("#sprucheingeben").html("");
                    $("#bestellbutton").html("");
                    $("#zahlung").html(response);
                }

            });

        });

        $("#qrcodescannen").on("click", function() {
            alert("Es wurde geklickt2");
            $("#header").html("");
            $("#qrcodescannen").html("");
            qrscan();

        });
        // submit form
        $("#sprucheingeben").submit(function(e) {
            e.preventDefault();
            console.log(123);

            // Get values
            var wunschtext = getInputVal('#wunschtext');
            var vorname = getInputVal('#vorname');
            console.log(vorname);
            var nachname = getInputVal('#nachname');
            var strasse = getInputVal('#strasse');
            var ort = getInputVal('#ort');

            //show alert
            $("#alert").css("display", "block");

            //hide alert after 3 seconds
            setTimeout(function() {
                $("#alert").css("display", "none");
            }, 3000)

        })
    }
    // },
    // start: function() {
    //     alert('APP - gestartet : ' + globalvarOS + ' / ' + globalvarFunc());

    // }

});

function globalvarFunc() {
    return 'globale Function';
}


function bestellen() {
    // Ware wird bestellt und es gibt eine Weiterleitung zur QR Code Seite

}

function getInputVal(id) {
    return $(id).val();
}


/* qrscanner */

function qrscan() {
    alert("Es wird jetzt der QR Scanner aktiviert");
    // Start a scan. Scanning will continue until something is detected or
    // `QRScanner.cancelScan()` is called.
    QRScanner.scan(displayContents);
    // Make the webview transparent so the video preview is visible behind it.
    QRScanner.show(function(status) {
        console.log(status);
    });
    // Be sure to make any opaque HTML elements transparent here to avoid
    // covering the video.
    /*QRScanner.cancelScan(function(status) {
        console.log(status)
    });*/
    QRScanner.hide(function(status) {
        console.log(status);
    });
}

function displayContents(err, text) {
    if (err) {
        // an error occurred, or the scan was canceled (error code `6`)
    } else {
        // The scan completed, display the contents of the QR code:
        alert(text);
        $('body').attr({
            backgroundColor: 'white'
        })
        $.ajax({
            url: 'components/zahlung.html',
            dataType: 'html',
            success: function(response) {
                // Wenn error - Meldungen existieren, anzeigen
                console.info("Test");
                $("#zahlung").html(response);
            }

        });

    }
}


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


// --------------------------------------------------------------------------
// alle Daten mit Mustache darstellen
// --------------------------------------------------------------------------
function showData() {
    $('#info').html('Daten werden geladen.....');
    var ref = firebase.database().ref();
    ref.on("value", function(response) {
        // console.log(response.val());
        // Template in eine Variable speichern
        var template = $('#template').html();
        // Template mit Mustache verbinden
        var html = Mustache.render(template, response.val());
        // Ausgabe anzeigen 
        $('#anzeige').html(html);
    }, function(error) {
        console.log("Error: " + error.message);
    });
}
// --------------------------------------------------------------------------
// nur einen Datensatz anzeigen
// --------------------------------------------------------------------------
function getEinDatenSatz(id) {
    var ref = firebase.database().ref("user/" + id+"/nachname");
    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function(error) {
        console.log("Error: " + error.message);
    });
}
// --------------------------------------------------------------------------
// Firebase delete Daten
// --------------------------------------------------------------------------
function deleteDaten(id) {
    $('#info').html('deleteDaten');
    // Löschen 
    firebase.database().ref("user/" + id + "/").remove();
}
// --------------------------------------------------------------------------
// Firebase insert Daten mit set 
// oder push wenn id automatisch vergeben werden soll
// --------------------------------------------------------------------------
function insertDaten(id) {
    $('#info').html('insertDaten');
    firebase.database().ref("user/" + id + "/").set({
        id: parseInt(id) + 1,
        name: "Ein neuer User " + parseInt(id) + 1,
        hobbies: "keine"
    });
}
// --------------------------------------------------------------------------
// Firebase update von Daten
// --------------------------------------------------------------------------
function updateDaten(id) {
    $('#info').html('updateDaten');
    firebase.database().ref("user/" + id + "/").set({
        id: parseInt(id) + 1,
        name: "Kurt",
        hobbies: "keine"
    });
}


// save user to firebase
function saveUser(wunschtext, vorname, nachname, strasse, ort) {
    var newUserRef = userRef.push();
    newUserRef.set({
        wunschtext: wunschtext,
        vorname: vorname,
        nachname: nachname,
        strasse: strasse,
        ort: ort

    });
}

function login() {
    userData.firstName = 'unknown'
    userData.lastName = 'known'
    userData.email = 'known'
    userData.weight = 'known'
    userData.height = 'known'

    // set name in header
}

function loadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[e]
        newTask = ''

        document.getElementById('tasks-container').innerHTML += newTask
    }
}

function goToTasks() {
    // clear old tabs
    document.getElementById('home').className = "hidden"

    document.getElementById('tasks').className = ""
    switchToTab('tasks')
}

function goToHome() {
    // clear old tabs
    document.getElementById('tasks').className = "hidden"

    document.getElementById('home').className = ""
    switchToTab('home')
}
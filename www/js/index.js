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
var globalvarOS = "";


(function($) {
    $(function() {
        "use strict";
        document.addEventListener('deviceready', $.onDeviceReady.bind(this), false);
        if (window.cordova.platformId === 'browser') {
            globalvarOS = 'WINWOWS';
        } else {
            globalvarOS = 'ANDROID';
        }
        $.start();


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

        $("#header").load("../components/header.html");

        $("#navbar").load("../components/navbar.html");



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
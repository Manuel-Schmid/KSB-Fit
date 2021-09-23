cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-qrscanner.QRScanner",
      "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
      "pluginId": "cordova-plugin-qrscanner",
      "clobbers": [
        "QRScanner"
      ]
    },
    {
      "id": "cordova-plugin-qrscanner.qrScanner",
      "file": "plugins/cordova-plugin-qrscanner/src/windows/lib/qrScanner.js",
      "pluginId": "cordova-plugin-qrscanner",
      "runs": true
    },
    {
      "id": "cordova-plugin-qrscanner.preview",
      "file": "plugins/cordova-plugin-qrscanner/src/windows/lib/preview.js",
      "pluginId": "cordova-plugin-qrscanner",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-qrscanner": "3.0.1"
  };
});
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
      "id": "cordova-plugin-email.EmailComposer",
      "file": "plugins/cordova-plugin-email/www/email_composer.js",
      "pluginId": "cordova-plugin-email",
      "clobbers": [
        "cordova.plugins.email",
        "plugin.email"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-qrscanner": "3.0.1",
    "cordova-plugin-email": "1.2.7"
  };
});
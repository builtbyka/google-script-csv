//Code taken from http://stackoverflow.com/questions/10632792/csv-file-create-in-google-apps

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

function doGet(e){
  return convertRangeToCsvFile();
} 

function convertRangeToCsvFile(sheet) {
  // get available data range in the spreadsheet
  var ss = SpreadsheetApp.openById('1rh_Sk61jzJM7w3mxGRBW12VMnP6McN-xEG4zvW3yNYY');
  var sheet = ss.getSheetByName('exercises');
  var activeRange = sheet.getDataRange();
  try {
    var data = activeRange.getValues();
    var csvFile = undefined;

    // loop through the data in the range and build a string with the csv data
    if (data.length > 1) {
      var csv = "";
      for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = "\"" + data[row][col] + "\"";
          }
        }

        // join each row's columns
        // add a carriage return to end of each row, except for the last one
        if (row < data.length-1) {
          csv += data[row].join(",") + "\r\n";
        }
        else {
          csv += data[row];
        }
      }
      csvFile = csv;
    }
      return ContentService
      .createTextOutput(csvFile)
      .setMimeType(ContentService.MimeType.CSV);
  }
  catch(err) {
    Browser.msgBox(err);
  }
}

function setup() {
   var doc = SpreadsheetApp.getActiveSpreadsheet();
   SCRIPT_PROP.setProperty("key", doc.getId());
}

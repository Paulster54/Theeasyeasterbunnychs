function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    var data = e.parameter;

    // Auto-generate Order Number
    var lastRow = sheet.getLastRow();
    var orderNum = 'EB-' + String(lastRow).padStart(3, '0');

    // Build the row in the correct column order (A through T)
    var row = [
      orderNum,                          // A: Order #
      data.timestamp || '',              // B: Date Submitted
      data.parentName || '',             // C: Full Name
      data.email || '',                  // D: Email
      data.phone || '',                  // E: Phone
      data.street || '',                 // F: Street Address
      data.city || '',                   // G: City
      data.state || '',                  // H: State
      data.zip || '',                    // I: Zip
      data.package || '',                // J: Package
      data.numChildren || '',            // K: # of Children
      data.childrenNames || '',          // L: Children's Names
      data.childrenAges || '',           // M: Children's Ages
      data.allergies || '',              // N: Allergies
      data.hidingLocation || '',         // O: Hiding Location
      data.paymentMethod || '',          // P: Payment Method
      'Pending',                         // Q: Payment Status (default)
      data.notes || '',                  // R: Special Notes
      data.referral || '',               // S: Referral Source
      'New'                              // T: Order Status (default)
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: lastRow + 1 }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'The Easy Easter Bunny order form is active!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

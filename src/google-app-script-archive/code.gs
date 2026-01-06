// Configuration object for form settings
const CONFIG = {
  API_KEY: 'Qu4gMRLjv1GN9vYu1XAfNAUvbBZ0go8A',
  PLUS_ONE_FORM_ID: '18bftQ3sqD1yK7_BQxb9BwcHXxa9AiIDpibbpTCmE9w8',
  SINGLETON_FORM_ID: '183JDJOQL7gnz9ZWWuQhtQkD2X6-jDrSe5B-aLdHhd1A',
  LOG_SHEET_ID: '1ZatZizdRmFeqH_Ud_jzeMJxzykhMillL43ind_r-NkA'
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function logToSheet(message) {
    const sheet = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID).getSheets()[0];
    sheet.appendRow([new Date(), message]);
}

// Helper function to create standardized responses
function createResponse(statusCode, data) {
  return ContentService.createTextOutput(
      JSON.stringify({
        success: statusCode === 200,
        statusCode: statusCode,
        data: data,
        timestamp: new Date().toISOString()
      })
    )
  .setMimeType(ContentService.MimeType.JSON);
}

function validateRequest(params, data) {
  // Validate API key
  if (params.apiKey !== CONFIG.API_KEY) {
    return createResponse(401, { message: 'Invalid Submission' });
  }

  // // Validate Provided Name
  // if (!params.name || !(params.name.toLowerCase() in data)) {
  //   return createResponse(403, { message: 'Name not on guest list.' });
  // }

  // Validate Email
  if (!params.email || !isValidEmail(params.email)) {
    return createResponse(401, { message: 'Email not provided or improperly formatted.' });
  }

  return null;
}

// Add this function to handle OPTIONS requests (preflight)
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, domain');
}

// Main function that handles incoming HTTP requests
function doPost(e) {
  try {
    // Log the entire event object
    logToSheet('Incoming request event:');
    logToSheet(e);
  
    // Log request body
    logToSheet('Request body:');
    logToSheet(e.postData.contents);

    const params = JSON.parse(e.postData.contents);
    wedding_guest_data = loadWeddingGuestData();
    validationResponse = validateRequest(params, wedding_guest_data);
    if (validationResponse) {
      return validationResponse;
    }

    let FORM_ID;
    if (wedding_guest_data[params.name.toLowerCase()]) {
      FORM_ID = CONFIG.PLUS_ONE_FORM_ID;
    } else {
      FORM_ID = CONFIG.SINGLETON_FORM_ID;
    }

    prefillFormResponse = prefillForm(FORM_ID, params.name);

    // Get the prefilled URL
    const prefilledUrl = prefillFormResponse.toPrefilledUrl();

    // Send RSVP Email
    sendRSVPEmail(params.name, params.email, prefilledUrl)
     
    // Return success response with form details
    return createResponse(200, {
      message: 'RSVP Form request successful',
      formUrl: prefilledUrl,
    });
    
  } catch (error) {
    return createResponse(500, { error: error.toString() });
  }
}
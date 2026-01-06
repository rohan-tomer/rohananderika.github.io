function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

function sendRSVPEmail(name, email, prefilledUrl) {
  // Cloud Storage Image URL
  const imageUrl = `https://storage.googleapis.com/henryandminju/SAVE_THE_DATE.PNG`;
  

  // Image GDrive ID
  const imageID = '1CQEfZBeJJuFJr6jvyNprxasgoCT92xal';

  // Get the image file from Google Drive - replace with your image file ID
  const imageFile = DriveApp.getFileById(imageID);
  const imageBlob = imageFile.getBlob();

  // First Name
  firstName = toTitleCase(name.split(" ")[0]);

  // HTML Body
  const htmlBody = `
    <div style="font-family: Georgia, 'Times New Roman', Times, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="color: #333; font-size: 16px; line-height: 1.5;">
            Dear ${firstName},
        </p>

        <p style="color: #333; font-size: 16px; line-height: 1.5;">
            We warmly invite you to our wedding! Please take a moment to RSVP.
        </p>

        <div style="text-align: left; margin: 30px 0;">
            <a href="${prefilledUrl}" style="background-color: #e6b55b; 
                    color: white; 
                    padding: 12px 40px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    font-size: 16px;">
                Fill out RSVP
            </a>
        </div>

        <div>
            <img src="${imageUrl}?nocache=1" style="width: 600px" loading="eager" alt="Wedding Invitation" fetchpriority="high"></img>
        </div>

        <p style="color: #333; font-size: 16px; line-height: 1.5; text-align: left;">
            With love,<br>
            Henry and Minju<br>
            &hearts;
        </p>
    </div>
  `;

  // Send the prefilled form
  MailApp.sendEmail({
    to: email,
    subject: "RSVP to Henry and Minju's Wedding",
    htmlBody: htmlBody,
    // Fallback plain text version
    body: `Please complete our RSVP form: ${prefilledUrl}\n\nWith love,\nHenry and Minju`,
    attachments: [imageBlob],
  });
}

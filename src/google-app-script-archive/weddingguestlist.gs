function loadWeddingGuestData() {
  list = loadWeddingGuestList();

  // Initialize data dictionary
  let data = {};

  // Populate the data dictionary
  list.forEach((row, index) => {
    if (index > 0) {
      let name = (row[0] + ' ' + row[1]).toLowerCase();
      data[name] = row[8];
    }
  });

  // Logger.log(data);

  return data;
}

function loadWeddingGuestList() {
  const WEDDING_GUEST_LIST_ID = '1VN4eW6dts7eYg0EFMfBFvZ1KfGkjmP12Ya9dOtJez1Y';
  const wedding_guest_list = SpreadsheetApp.openById(WEDDING_GUEST_LIST_ID);
  const sheet = wedding_guest_list.getSheets()[0];
  const list = sheet.getDataRange().getValues();
  return list;
}
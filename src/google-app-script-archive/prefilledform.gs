function prefillForm(form_id, name) {
  const form = FormApp.openById(form_id);

  // Create a prefilled URL
  let prefillFormResponse = form.createResponse();

  // Get all form items
  const formItems = form.getItems();

  // Select Name Item and Prefill it
  const nameItem = formItems.find(item => item.getTitle().includes("Full Name"));
  prefillFormResponse.withItemResponse(
    nameItem.asTextItem().createResponse(name)
  );

  // Return the prefilled response
  return prefillFormResponse;
}
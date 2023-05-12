function TestController() { }


TestController.prototype.renderAddTestsModal = function() {
    Logger.log("renderAddTestsModal")
    const addNewTestsHtml = HtmlService
        .createTemplateFromFile('src/views/add-new-tests')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getContent();

    const template = HtmlService.createTemplate(addNewTestsHtml)
        .evaluate()
        .setWidth(600)
        .setHeight(550);

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Tests');
}

function ProblemController() { }


ProblemController.prototype.renderAddProblemModal = function() {

    const addProblemModalHtml = HtmlService
        .createTemplateFromFile('src/views/add-new-problem')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getContent();

    const template = HtmlService.createTemplate(addProblemModalHtml)
        .evaluate()
        .setWidth(600)
        .setHeight(550);

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Problem');
}

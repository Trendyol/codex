function ChallangeController() { }

function processAddChallange() {
    const challangeController = new ChallangeController();
    challangeController.addChallange();
    return true;
}

ChallangeController.prototype.renderAddChallangeModal = function () {

    const scriptProperties = PropertiesService.getScriptProperties();
    const token = scriptProperties.getProperty("token")
    const data = { token: token };

    const addProblemModalHtml = HtmlService
        .createTemplateFromFile('src/views/add-new-challange-modal/add-new-challange-modal')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getContent();

    const dataScript = "<script>window.stringifiedData = " + JSON.stringify(data) + "</script>";
    const template = HtmlService.createTemplate(dataScript + addProblemModalHtml)
        .evaluate()
        .setWidth(800)
        .setHeight(350);

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Challange');
}

ChallangeController.prototype.addChallange = function () {
    return true;
}

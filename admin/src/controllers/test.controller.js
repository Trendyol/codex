function TestController() { }

TestController.prototype.getTestsSelection = function () {
    const testsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tests');
    const activeRange = testsSheet.getActiveRange();
    const activeValues = activeRange.getValues();

    let tests = [];
    for(let row of activeValues){
        tests.push({
            id: row[0],
            input: row[1],
            output: row[2],
            isPublic: row[3],
        })
    }

    return tests;
}

TestController.prototype.renderAddTestsModal = function() {
    
    const addNewTestsHtml = HtmlService
        .createTemplateFromFile('src/views/add-new-tests-modal/add-new-tests-modal')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getContent();
    
    const tests = this.getTestsSelection();
    const scriptProperties = PropertiesService.getScriptProperties();
    const token = scriptProperties.getProperty("token")
    const data = { 
        token: token,
        tests:tests
     };
    const dataScript = "<script>window.stringifiedData = " + JSON.stringify(data) + "</script>";

    const template = HtmlService.createTemplate(dataScript + addNewTestsHtml)
        .evaluate()
        .setWidth(600)
        .setHeight(550);

    

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Tests');
}

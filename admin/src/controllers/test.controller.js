function TestController() { }

function processAddTest() {
    const testController = new TestController();
    testController.addTest();
}

TestController.prototype.getTestsSelection = function () {
    const testsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tests');
    const activeRange = testsSheet.getActiveRange();
    const activeValues = activeRange.getValues();

    let tests = [];
    for(let row of activeValues){
        tests.push({
            input: row[0],
            output: row[1],
            isPublic: row[2],
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
        .setHeight(380);

    

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Tests');
}


TestController.prototype.addTest = function () {
    const testsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tests');
    const activeRange = testsSheet.getActiveRange();
    activeRange.clearContent()
}
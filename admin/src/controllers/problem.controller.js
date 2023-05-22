function ProblemController() { }

function processAddProblem(problem) {
    const problemController = new ProblemController();
    problemController.addProblem(problem);
}

ProblemController.prototype.renderAddProblemModal = function () {

    const scriptProperties = PropertiesService.getScriptProperties();
    const token = scriptProperties.getProperty("token")
    const data = { token: token };

    const addProblemModalHtml = HtmlService
        .createTemplateFromFile('src/views/add-new-problem-modal/add-new-problem-modal')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getContent();

    const dataScript = "<script>window.stringifiedData = " + JSON.stringify(data) + "</script>";
    const template = HtmlService.createTemplate(dataScript + addProblemModalHtml)
        .evaluate()
        .setWidth(1000)
        .setHeight(600);

    SpreadsheetApp.getUi().showModalDialog(template, 'Add New Problem');
}

ProblemController.prototype.addProblem = function (problem) {
    const problemsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Problems');
    const row = [problem.id, problem.title, problem.content, problem.defaultCodes[0].defaultCode, problem.difficulty];
    problemsSheet.appendRow(row);
}

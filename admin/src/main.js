function onOpen() {
    renderMenu();
}

function renderMenu() {

    const ui = SpreadsheetApp.getUi();

    ui.createMenu('Codex Admin')
        .addItem('Add Problem', 'addProblem')
        .addItem('Add Challenge', 'addChallange')
        .addItem('Add Tests', 'addTests')
        .addToUi();
}


function addProblem() {
    const problemController = new ProblemController();
    problemController.renderAddProblemModal();
}

function addChallange() {
    const challangeController = new ChallangeController();
    challangeController.renderAddChallangeModal();
}

function addTests() {
    const testController = new TestController();
    testController.renderAddTestsModal();
}
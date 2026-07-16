const ExcelJs = require("exceljs");

//Workbook -> Worksheet -> Each Row -> Each Cell

async function writeExcel(excelSheetPath, sheetName, searchText, replaceText) {

    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(excelSheetPath);
    const workSheet = workBook.getWorksheet(sheetName);
    const cellToReplace = await readExcel(workSheet, searchText);
    const cell = workSheet.getCell(cellToReplace.row, cellToReplace.column);
    cell.value = Number.parseInt(replaceText);
    await workBook.xlsx.writeFile(excelSheetPath);
}

async function readExcel(workSheet, searchText) {
    let position = { row: 0, column: 0 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === searchText) {
                position.row = rowNumber;
                position.column = columnNumber + 2;
            }
        });
    });
    console.log(position)
    return position;
}


writeExcel("./excelDemoWorkbook.xlsx", "Sheet1", "Mango", "350");
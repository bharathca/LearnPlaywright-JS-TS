const ExcelJs = require("exceljs");

//Workbook -> Worksheet -> Each Row -> Each Cell

async function excelSheet() {
    let position = { row: 1, column: 1 };
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile("./excelDemoWorkbook.xlsx");
    const workSheet = workBook.getWorksheet("Sheet1");
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === 'Banana') {
                position.row = rowNumber;
                position.column = columnNumber;
            }
        })
    })
    const cell = workSheet.getCell(position.row, position.column);
    cell.value = "Republic";
    await workBook.xlsx.writeFile("./excelDemoWorkbook.xlsx");
}

excelSheet();
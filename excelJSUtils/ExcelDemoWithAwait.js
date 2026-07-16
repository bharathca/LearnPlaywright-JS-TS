const ExcelJs = require("exceljs");

//Workbook -> Worksheet -> Each Row -> Each Cell

async function excelSheet() {
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile("./excelDemoWorkbook.xlsx");
        const workSheet = workBook.getWorksheet("Sheet1");
        workSheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, columnNumber) => {
                console.log(cell.value);
            })
        })
}

excelSheet();
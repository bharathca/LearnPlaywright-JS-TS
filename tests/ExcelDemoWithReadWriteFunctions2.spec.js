import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

/* 
workbook
        worksheet
            eachRow
                eachCell
*/

async function writeExcel(searchText, replaceText, fileNameWithPath) {
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(fileNameWithPath);
    const workSheet = workBook.getWorksheet('Sheet1');
    const cellToReplace = await readExcel(workSheet, searchText);
    const cell = workSheet.getCell(cellToReplace.row, cellToReplace.column);
    cell.value = Number(replaceText);
    await workBook.xlsx.writeFile(fileNameWithPath);
}

async function readExcel(workSheet, searchText) {
    let output = { row: 1, column: 1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = columnNumber+2;
            }
        })
    })
    return output;
}

test('Download and Upload Funcationality Test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const waitForDownload = page.waitForEvent("download");
    await page.locator("#downloadButton").click();
    await waitForDownload;
    const download = await downloadPromise;

    const fileName = download.suggestedFileName();

    const filePath = path.join(process.cwd(), 'downloads', fileName);
    await download.saveAs(filePath);
    await writeExcel('Mango', '350', filePath);
})
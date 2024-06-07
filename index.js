const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');


async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.msc.com/en/track-a-shipment');

    const blNumbers = [];

    fs.createReadStream('inputFile.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        blNumbers.push(row.blNumber);
      })
      .on('end', async () => {
        console.log('The CSV file has been successfully loaded');
  
        const results = [];
        
        for (const blNumber of blNumbers) {
          await page.waitForSelector('#trackingNumber', { timeout: 10000 });
          await page.type('#trackingNumber', blNumber);
          await page.keyboard.press('Enter');
  
          await page.waitForSelector('span[x-text="container.PodEtaDate"]');
          
          const etaDate = await page.$eval('span[x-text="container.PodEtaDate"]', element => element.textContent);
  
          results.push({ blNumber, ETA: etaDate });
  
            await page.evaluate(() => document.getElementById('trackingNumber').value = '');
        }
  
        const csvWriter = createObjectCsvWriter({
          path: 'outputFile.csv',
          header: [
            { id: 'blNumber', title: 'blNumber' },
            { id: 'ETA', title: 'ETA' }
          ],
          fieldDelimiter: ';'
        });
  
        await csvWriter.writeRecords(results);
        console.log('The results were saved to the outputFile.csv file');
  
        await browser.close();
      });
  }

run()
const puppeteer = require('puppeteer');
const fs = require('fs')

async function fetchJobInfo() {
  const BoxContainer = '.productitem';
  const Title = '.itemname';
  const Author = '.txt-light.txt-custom-light a';
  const Price = '.price-block';
  const Image = '.item-cover a img';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.naiin.com/category?type_book=best_seller&product_type_id=1&pageNo=1'
  );

  const BoxLimit = await page.$$(BoxContainer);

  const iterateFunc = async (i, target, value) => {
    return await (
      await (
        await page.$(`.product-list ${BoxContainer}:nth-of-type(${i}) ${target}`)
      )?.getProperty(value)
    )?.jsonValue();
  };

  const contentSwarm = [];
  for (let i = 1; i < BoxLimit.length; i++) {
    const title = await (await iterateFunc(i, Title,'textContent'))?.replace(/[\n]/gi, '');
    const author = await (await iterateFunc(i, Author,'textContent'))?.replace(/[\n]/gi, '');
    const price = await (await iterateFunc(i, Price,'textContent'))?.replace(/[\n\t]+/gi, '');
    const image_url = await (await iterateFunc(i, Image,'src'));

    // const salary = await (await iterateFunc(i, Salary))?.replace(/\n/gi, '');
    contentSwarm.push({
      title,
      image_url,
      author,
      price: parseInt(price)
    });
  }
  fs.writeFile(`${__dirname}/../bookData/bookData.json`, JSON.stringify(contentSwarm), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  })

  await browser.close();
}

module.exports = fetchJobInfo;

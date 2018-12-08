import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import { resolve as res } from 'path'
export default async function test() {
  try {
    let url: string = 'http://starwars.com/databank'
    const go: any = await axios(url);
    const body: string = go.data
    const $: any = cheerio.load(body)
    const nms: Array<object> = []

    //then we want to gett all the children under the class that represents each entity we want to crawl
    $('.building-block-wrapper').each( function(i, elemt){
      nms[i] = {
        'title': $(this).find('.long-title').text(),
        'description': $(this).find('.desc').text(),
        'url': $(this).find('.desc-sizer').children('a').attr('href'),
        'image': $(this).find('.image-wrapper').children('.aspect').children('a').children('img').attr('src')
      }
    })

    const filterData = nms.filter(x => x !== undefined)
    const starwarsResistanceFile = await writeFile('resistance.json', filterData)
    console.log(starwarsResistanceFile)


  } catch (error) {
    console.log(`Error making async call`, error)
  }
}


const writeFile = (filename: string, data: any) => new Promise((resolve, reject) => {
  fs.writeFile(res(__dirname, '../src/asset', filename), JSON.stringify(data, null, 4), { flag: 'w+'}, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        reject("File or folder not found. Perhaps its the wrong directory.")
      }
      reject(err)
    }
    resolve("Written")
  })
})

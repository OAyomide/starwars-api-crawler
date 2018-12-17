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

    //then we want to get all the children under the class that represents each entity we want to crawl
    $('.building-block-wrapper').each( function(i, elemt){
      nms[i] = {
        'title': $(this).find('.long-title').text(),
        'description': $(this).find('.desc').text(),
        'url': $(this).find('.desc-sizer').children('a').attr('href'),
        'image': $(this).find('.image-wrapper').children('.aspect').children('a').children('img').attr('src')
      }
    })

    const filterData = nms.filter(x => x !== undefined)
    await writeFile('resistance.json', filterData)


    /**
     * THIS IS EXPERIMENTAL. START CRAWLINF FROM THE SECTION TAG
     */
    const ty: Array<any> = []
    const th: Array<any> = []
     $('.blocks-container').each( function(i, elemt){
      ty[i] = {
        'title': $(this).find('h2').text(),
        'data': $('.building-block-wrapper').each( function(i, elemt){
          th[i] = {
            'title': $('.building-block-wrapper').find('.long-title').text(),
            'description': $('.building-block-wrapper').find('.desc').text(),
            'url': $('.building-block-wrapper').find('.desc-sizer').children('a').attr('href'),
            'image': $('.building-block-wrapper').find('.image-wrapper').children('.aspect').children('a').children('img').attr('src')
          }
        })    
      }
    })

     const filterTy = ty.filter(x => x.title !== null || '')
     console.log(`HERE IS WHERE THINGS GET BEATUIFUL 🦄`, filterTy)
  } catch (error) {
    console.log(`Error making async call`, error)
  }
}


const writeFile = (filename: string, data: any) => new Promise((resolve: any, reject: any) => {
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

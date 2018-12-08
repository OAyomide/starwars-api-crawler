import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function test() {
  try {
    let url: string = 'http://starwars.com/databank'
    const go: any = await axios(url);
    const body: string = go.data
    const $: any = cheerio.load(body)
    const nms: object = []

    //then we want to gett all the children under the class that represents each entity we want to crawl
    $('.building-block-wrapper').each( function(i, elemt){
      nms[i] = {
        'title': $(this).find('.long-title').text(),
        'description': $(this).find('.desc').text(),
        'url': $(this).find('.desc-sizer').children('a').attr('href'),
        'image': $(this).find('.image-wrapper').children('.aspect').children('a').children('img').attr('src')
      }
    })


    console.log(`SCRAPPED SAMPLE DATA IS::`, nms)
    //console.log(`The axios request is::`,body);
  } catch (error) {
    console.log(`Error making async call`, error)
  }
}

import * as express from 'express'

const PORT = process.env.PORT || 6000
const app = express()

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server')
  }
  console.log('Server Started on port ' + PORT)
})
import LinksCrawl from './linkcrawl'

LinksCrawl()
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GIGHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (request, response) => {
  const { code } = request.query

  return response.json(code)
})

app.listen(3333, () => console.log(`Server is running on PORT 3333`))

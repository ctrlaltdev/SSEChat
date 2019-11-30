#!/usr/bin/env node

const app = require('./app.js')

app.listen(process.env.PORT || 3000, (e) => {
  if (e) {
    console.error(e)
  }
  console.info('Server started.')
})

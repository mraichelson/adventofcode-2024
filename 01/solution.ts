import fs from 'fs'

const inputFileContent = fs.readFileSync('./input.txt', 'utf-8')

inputFileContent.split(/\r?\n/).map((line) => {
  console.log('line:', line)
})
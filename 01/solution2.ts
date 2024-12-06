import fs from "fs"

const columnA: number[] = []
const columnB: number[] = []

const inputFileContent = fs.readFileSync("./01/input.txt", "utf-8")

inputFileContent.split(/\r?\n/).map((line) => {
	const splitLine = line.split("   ")
	// This is a cheap hack to deal with the trailing carriage return
	// in the input file.
	if (line.length > 0) {
		columnA.push(parseInt(splitLine[0]))
		columnB.push(parseInt(splitLine[1]))
	}
})

let similarityScore: number = 0

columnA.map((a) => {
	const matches = columnB.filter((b) => b === a).length
	similarityScore = similarityScore + a * matches
})

console.log(similarityScore)

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

// const columnAmax = Math.max(...columnA)
// const columnBmax = Math.max(...columnB)

const columnAsorted = columnA.toSorted()
const columnBsorted = columnB.toSorted()

const calcs: number[] = []

columnAsorted.map((_a: number, index: number) => {
	calcs.push(Math.abs(columnAsorted[index] - columnBsorted[index]))
})

let calcTotal: number = 0

calcs.map((value: number) => {
	calcTotal = calcTotal + value
})
console.log("Calculated total is:", calcTotal)

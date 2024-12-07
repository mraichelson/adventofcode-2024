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

/**
 * Comment added after Day 2 completed:
 *
 * `.toSorted()` without a sorting function isn't reliable here
 * but worked out ONLY because every number in the entire set
 * set for both columns happened to be a 5 digit number.
 *
 * For situations with varying digits [25, 3, 170] items are sorted
 * by the leading digit [170, 25, 3] not numerical value [3, 25, 170].
 *
 * Use `.toSorted((a, b) => a - b)` to sort by numerical value.
 */
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

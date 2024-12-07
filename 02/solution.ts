import fs from "fs"

const inputFileContent = fs.readFileSync("./02/input.txt", "utf-8")

interface Report {
	isSafe: boolean
	readings: number[]
	flags?: {
		isAscending: boolean
		isDescending: boolean
		isWithinVariance: boolean
		numberVariance: number[]
	}
}

const reports: Report[] = []
const processedReports: Report[] = []

inputFileContent.split(/\r?\n/).map((line) => {
	// Address trailing carriage return in input files.
	if (line.length > 0) {
		const tmpObj: Report = {
			isSafe: false,
			readings: [],
		}
		const tmpReadings = line.split(" ")
		tmpReadings.map((reading: string) => {
			tmpObj.readings.push(parseInt(reading))
		})
		reports.push(tmpObj)
	}
})

reports.map((report: Report) => {
	let allNumbersAscending: boolean =
		JSON.stringify(report.readings) ===
		JSON.stringify(report.readings.toSorted((a, b) => a - b))
	let allNumbersDescending: boolean =
		JSON.stringify(report.readings) ===
		JSON.stringify(report.readings.toSorted((a, b) => a - b).reverse())

	let numbersWithinVariance: boolean = true
	const variances: number[] = []

	report.readings.map((_reading: number, index: number) => {
		// compare to next item in array
		if (typeof report.readings[index + 1] === "number") {
			const difference = Math.abs(
				report.readings[index] - report.readings[index + 1]
			)
			variances.push(difference)
		}
	})

	numbersWithinVariance = variances.filter((v) => v < 1).length
		? false
		: numbersWithinVariance
	numbersWithinVariance = variances.filter((v) => v > 3).length
		? false
		: numbersWithinVariance

	// for debugging
	report.flags = {
		isAscending: allNumbersAscending,
		isDescending: allNumbersDescending,
		isWithinVariance: numbersWithinVariance,
		numberVariance: variances,
	}

	report.isSafe =
		(allNumbersAscending || allNumbersDescending) && numbersWithinVariance

	processedReports.push(report)
})

console.log(
	"safe reports:",
	processedReports.filter((report) => report.isSafe).length
)
console.log(
	"unsafe reports:",
	processedReports.filter((report) => !report.isSafe).length
)

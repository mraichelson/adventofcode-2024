import fs from "fs"

const inputFileContent = fs.readFileSync("./input.txt", "utf-8")

inputFileContent.split(/\r?\n/).map((line) => {
	// Address trailing carriage return in input files.
	if (line.length > 0) {
		console.log(line)
	}
})

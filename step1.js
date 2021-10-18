// In step1.js, write a function, cat.

// It should take one argument, path, and it should read the file with that path,
// and print the contents of that file.

// Then, write some code that calls that function, allowing you to specify 
//the path argument via the command line. For example:

// $ node step1.js one.txt
// This is file one.
// If you give it the path of a non-existent file, it should print that error and
// halt the script execution:

// $ node step1.js huh.txt
// Error reading huh.txt:
//  Error: ENOENT: no such file or directory, open 'huh.txt'


const fs= require('fs')
const process=require('process')

//read file at path and print it out
function cat(path){
    fs.readFile(path, 'utf8', function (err, data) {
        if (err){
            console.error(`Error reading: ${path}: ${err}`)
            process.exit(1)// o is no error, 1,2,.. is script error
        }
        else{
            console.log(data)
        }
    });
}

cat(process.argv[2])// argv[0] and argv[1] is paths to node and js file
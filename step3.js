// Copy over your step2.js code to step3.js.

// Add a feature where, on the command line,
// you can optionally provide an argument to output to a file instead of printing 
//to the console.
// The argument should look like this: --out output-filename.txt readfile-or-url.

// Current features should still work the same:

// However, if --out follows your script name, it should take the next argument and use that as the path to write to.

// For example:

// $ node step3.js --out new.txt one.txt
// $ # no output, but new.txt contains contents of one.txt

// $ node step3.js --out new.txt  http://google.com
// $ # no output, but new.txt contains google's HTML
// Make sure you handle errors trying to write to the file:

// $ node step3.js --out /no/dir/new.txt one.txt
// Couldn't write /no/dir/new.txt:
//   Error: ENOENT: no such file or directory, open '/no/dir/new.txt'


const fs= require('fs')
const process=require('process')
const axios= require('axios')

/** handle output: write to file if out given, else print */
function handleOutput(text,out){
    if(out){
        fs.writeFile(out,text, 'utf8', function (err){
            if(err){
                console.error(`Error:could not write ${out}: ${err}`)
                process.exit(1)
            }
            else{
                console.log(text)
            }
        })
    }
}
//read file at path and print it out
function cat(path,out){
    fs.readFile(path, 'utf8', function (err, data) {
        if (err){
            console.error(`Error reading: ${path}: ${err}`)
            process.exit(1)// o is no error, 1,2,.. is script error
        }
        else{
            handleOutput(data, out)
        }
    });
}



async function webCat(url, out){
    try{
        let response = await axios.get(url);
       handleOutput(response.data, out)
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1);
    }
}

let path=process;
let out;

if(process.argv[2]==='--out'){
    out=process.argv[3];
    path=process.argv[4]
}
else{
    path=proess.argv[2]
}

if(path.slice(0,4)==='http'){
    webCat(path,out)
}
else {
    cat(path,out)
}
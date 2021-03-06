# D-line (Web App)

D-line is an analytic webapp for diabetes patients which can handle your medical history and give you insights about your medicine and its effectiveness. The Dline analytics is powered by Machine Learning algorithms in backend to assist its users with predictive results overtime.

## Prerequisites
1. Node.js
2. npm
3. MongoDB 
![Alt text](dl.png "D-line") 

## How to Install D-line locally
1. Clone the D-line repository using `git clone <url>`
2. Run`npm install` from the directory
3. The command line will install necessary pakage files

### Windows XP/7/8/10
1. Start mongod service or run just open `run.bat`
2. Run `node app.js` to start the D-line
3. Open your browser at `localhost:3000`

### Ubuntu 16.04 LTS / Mac OS Sierra + 
1. Make sure you have installed and configured MongoDB at your localmachine
2. Navigate to the d-line-app repository folder and run `bash start.sh`
3. Open your browser at `localhost:3000`

Web demo link: https://shaz13.github.io/demo-d-line/

## Troubleshooting
- If you get an NPM ERR!! code while executing `npm install`. 
- Delete the node_modules directly and follow from Step 2 again

### Note
- Don't run the `npm install xxx --save` with `sudo` permissions on Ubuntu. It will change the permissions of package.json to root and you can't modify it for development purpose unless you run `chmod 755` to own the package.json again. 

![Alt text](dep.png "D reports")


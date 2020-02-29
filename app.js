const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



const getManagerInfo = async () => {

    const manInfo = [
        {
            type: "input",
            message: "What is the Managers name?",
            name: "mName"
        },
        {
            type: "input",
            message: "What is the Managers email?",
            name: "mEmail"
        },
        {
            tyoe: "input",
            message: "What is the managers office number?",
            name: "mOfficeNumber"
        }
    ];

    let response = await inquirer.prompt(manInfo);

    return response;
}

const getTeamInfo = async () => {

    const askNewMember = [
        {
            type: "confirm",
            message: "Would you like to add a team member?",
            name: "addMember"
        }
    ];

    const typePrompt = [
        {
            type: "list",
            message: "Which Team Member are you adding?",
            choices: ["Engineer", "Intern"],
            name: "teamType"
        },
        {

        }
    ];

    let addMember = true;

    while(addMember){

        let res = await inquirer.prompt(askNewMember);

        if(res.addMember){
                
        }
        else{
             addMember = false;
        }
    
      
    }

}

async function init(){

    let manInfo = await getManagerInfo();
    let teamInfo = await getTeamInfo();
}





init();

/*// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!*/
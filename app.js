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



const getManagerInfo = async (currentId) => {

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
            type: "input",
            message: "What is the Managers office number?",
            name: "mOfficeNumber"
        }
    ];

    let res = await inquirer.prompt(manInfo);

    return new Manager(res.mName, currentId++, res.mEmail, res.mOfficeNumber);
}

const getTeamInfo = async (currentId) => {

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
        }
    ];

    const askBasicInfo = [
        {
            type: "input",
            message: "What is there name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is there email?",
            name: "email"
        }
    ];

    const askGithub = [
        {
            type: "input",
            message: "What is there github?",
            name: "github"
        }
    ];

    const askSchool = [
        {
            type: "input",
            message: "What is there school?",
            name: "school"
        }
    ];

    
    let addMember = true;

    let members = [];

    while(addMember){

        let res = await inquirer.prompt(askNewMember); //ask if user wants to add more members

        if(res.addMember){ //if they do

            res = await inquirer.prompt(typePrompt); //ask if its an Engineer or Intern

            if(res.teamType == "Engineer"){ //carry out the code for such below
                console.log("Engineer!");

                let basicInfo = await inquirer.prompt(askBasicInfo); //gets info for engineer

                let githubUserName = await inquirer.prompt(askGithub);

                members.push(new Engineer(basicInfo.name, currentId++, basicInfo.email, githubUserName.github));//adds there data to array
            }
            else if(res.teamType == "Intern"){
                console.log("Intern!");

                let basicInfo = await inquirer.prompt(askBasicInfo);

                let school =  await inquirer.prompt(askSchool);

                members.push(new Intern(basicInfo.name, currentId++, basicInfo.email, school.school));//adds there data to array
            } 
        }
        else{
             addMember = false;
        }
    
      
    }

    return members;

}

async function init(){

    const currentId = 1;

    let managerObj = await getManagerInfo(currentId);
    console.log(managerObj);
    
    let teamArray = await getTeamInfo(currentId);
    console.log(teamArray);

    //Build objects and pass them through to html renderer
    //clean up dry code
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
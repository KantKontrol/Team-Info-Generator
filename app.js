const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const writeHTML = require("./lib/writeHTML");


const getManagerInfo = async (currentId) => {

    const manInfo = [  
                     makeQuestion("input", "What is the Managers name?", "mName"), 
                     makeQuestion("input", "What is the Managers email?", "mEmail"),
                     makeQuestion("input", "What is the Managers office number?", "mOfficeNumber")
                    ];

    let res = await inquirer.prompt(manInfo);

    return new Manager(res.mName, currentId, res.mEmail, res.mOfficeNumber);
}

const getTeamInfo = async (currentId) => {

    //Setting up Question Arrays...

    let askNewMember = [makeQuestion("confirm", "Would you like to add a team member?", "addMember")];

    let typePrompt = [
        {
            type: "list",
            message: "Which Team Member are you adding?",
            choices: ["Engineer", "Intern"],
            name: "teamType"
        }
    ];

    let askBasicInfo = [makeQuestion("input", "What is there name?", "name"), makeQuestion("input", "What is there email?", "email")];
    let askGithub = [makeQuestion("input", "What is there github?", "github")];
    let askSchool = [makeQuestion("input", "What is there school?", "school")];

    //Done setting up question arrays

    let addMember = true;
    let members = [];

    while(addMember){

        let res = await inquirer.prompt(askNewMember); //ask if user wants to add more members

        if(res.addMember){ //if they do

            res = await inquirer.prompt(typePrompt); //ask if its an Engineer or Intern

            if(res.teamType == "Engineer"){ //carry out the code for such below

                let basicInfo = await inquirer.prompt(askBasicInfo); //gets info for engineer

                let githubUserName = await inquirer.prompt(askGithub);

                members.push(new Engineer(basicInfo.name, currentId++, basicInfo.email, githubUserName.github));//adds there data to array
            }
            else if(res.teamType == "Intern"){

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

const makeQuestion = (type, message, name) => {
    return {
        type: type,
        message: message,
        name: name
    }
}

async function init(){

    let currentId = 1;

    let managerObj = await getManagerInfo(currentId);

    currentId++;
    
    let teamArray = await getTeamInfo(currentId);
    
    teamArray.unshift(managerObj);//adds manager to beggining of teamArray

    console.log("Passing data to renderer...");

    //Call to Render HTML
    let renderedHtml = render(teamArray);

    //output html to file
    writeHTML(OUTPUT_DIR, outputPath, renderedHtml);
}

init();
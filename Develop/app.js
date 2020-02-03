const Employee = require("./lib/Employee");
const Manager = require("./lib/Intern");
const Engineer = require("./lib/Manager");
const Intern = require("./lib/Engineer");

var inquirer = require("inquirer")
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

teamPlayers = [];


inquirer.prompt([

    {   type: 'recursive',
        message: 'Add a Team Member?',
        name: "teamMembers",
        prompts: 
    [  

        {
            type: "input",
            name: "name",
            message: "what is your name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
        },

        {
            type: "list",
            message: "What is your role?",
            name: "title",
            choices: [
                "Intern",
                "Manager",
                "Engineer"
                ]
        },

        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },

        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            when: (answers) => answers.title === "Engineer"
        },

        {
            type: "input",
            name: "school",
            message: "What is your alma mater?",
            when: (answers) => answers.title === "Intern"
        },

        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
            when: (answers) => answers.title === "Manager",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        },

        
    ]
    }

    
    
]).then(answers => {
   
    teamPlayers = answers.teamMembers

    // console.log(teamPlayers)

    const manager = teamPlayers.filter(function(teamPlayers) {
        if (teamPlayers.title === "Manager") {
            return new Manager(teamPlayers.name, teamPlayers.id, teamPlayers.email, teamPlayers.github)
        }
    })

    const engineer = teamPlayers.filter(function(teamPlayers) {
        return teamPlayers.title === "Engineer"
    })
    const intern = teamPlayers.filter(function(teamPlayers) {
        return teamPlayers.title === "Intern"
    })
     
    console.log(manager);
    manager.forEach(manageCard => {
       console.log(manageHtml(manageCard)) ;
        
    });

    
    
    console.log(intern);
    console.log(engineer);

});


function manageHtml() {
    return `<!DOCTYPE html>

    <div class="card" style="max-width: 12rem;">
        <div class="card-header bg-primary text-light">
            <h4>Name</h4>
            <h5><i class="fa fa-car mr-2"></i>Manager</h5>
        </div>

        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${this.id}</li>
                <li class="list-group-item">Email: ${this.email}<li>
                <li class="list-group-item">Office #: ${this.officeNumber}</li>
            </ul>
        </div>  
    </div>
    
    `
}
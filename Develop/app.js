const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
var inquirer = require("inquirer")
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

var teamPlayers = [];
var manager = [];
var intern = [];
var engineer = [];
var cards = [];

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
            type: "input",
            name: "id",
            message: "what is your id?",
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

    

    teamPlayers.filter(function(teamPlayers) {
        
        if (teamPlayers.title === "Intern") {
            intern.push(new Intern(teamPlayers.name, teamPlayers.id, teamPlayers.email, teamPlayers.school))
        }
        else if (teamPlayers.title === "Engineer") {
            engineer.push(new Engineer(teamPlayers.name, teamPlayers.id, teamPlayers.email, teamPlayers.github))
        }
        else if (teamPlayers.title === "Manager") {
            manager.push(new Manager(teamPlayers.name, teamPlayers.id, teamPlayers.email, teamPlayers.officeNumber))
        }
    })
        

    // console.log(intern);
    // console.log(manager);
    for (i = 0; i < manager.length; i++) {
        // console.log(manageHtml(manager[i]));
        cards.push(manageHtml(manager[i]));
        // console.log(cards);
    }

    for (i = 0; i < intern.length; i++) {
        // console.log(manageHtml(manager[i]));
        cards.push(internHtml(intern[i]));
        // console.log(cards);
    }

    for (i = 0; i < engineer.length; i++) {
        // console.log(manageHtml(manager[i]));
        cards.push(engineerHtml(engineer[i]));
        // console.log(cards);
    }

    // for (const key of cards) {
        
    //   }
    cards = cards.join(' ');

   html = teamHtml(cards);
   console.log(html);
   writeFileAsync("index.html", html);


});


function manageHtml({name, id, email, officeNumber}) {
    return `<div class="card" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Manager</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">Office #: ${officeNumber}</li>
            </ul>
        </div>
    </div>`}

function internHtml({name, id, email, school}) {
    return `<div class="card margin" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Intern</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
        </div>
    </div>
    `
}

function engineerHtml({name, id, email, github}) {
    return `<div class="card" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Engineer</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">GitHub: ${github}</li>
            </ul>
        </div>
    </div>`
}

function teamHtml() {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Players</title>
    <link  rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <style>
    li {
        font-size: x-small;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="jumbotron text-center bg-danger text-light">
            <h1>Team Players</h1>
        </div>
        <div class="card-group">
            ${cards} 
            
        </div>
    </div>
</body>
</html>`
}

// async function init() {
//     console.log("hi")
//     try {
//       const data = await promptUser();
  
//       const html = generateHTML(answers);
  
//       await writeFileAsync("index.html", html);
  
//       console.log("Successfully wrote to index.html");
//     } catch(err) {
//       console.log(err);
//     }
//   }
  
//   init();
  
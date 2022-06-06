const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const {teamHtml} = require("./templates/templateFunctions");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
var inquirer = require("inquirer");
inquirer.registerPrompt("recursive", require("inquirer-recursive"));

var employees = [];
var cards = [];

const questions = [
  {
    type: "recursive",
    message: "Add a Team Member?",
    name: "teamMembers",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "what is your name?",
        validate: async (input) => {
          if (input == "" || /\s/.test(input)) {
            return "Please enter first or last name.";
          }
          return true;
        },
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
        choices: ["Intern", "Manager", "Engineer"],
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
        },
      },

      {
        type: "input",
        name: "github",
        message: "What is your github username?",
        when: (answers) => answers.title === "Engineer",
      },

      {
        type: "input",
        name: "school",
        message: "What is your alma mater?",
        when: (answers) => answers.title === "Intern",
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
        },
      },
    ],
  },
];

function promptUser(questions) {
  return inquirer.prompt(questions);
}

async function init() {
  console.log("hi");
  try {
    const data = await promptUser(questions);
    var teamPlayers = data.teamMembers;
    console.log(data);
    await teamPlayers.filter(function (teamPlayers) {
      switch (teamPlayers.title) {
        case "Intern":
          employees.push(
            new Intern(
              teamPlayers.name,
              teamPlayers.id,
              teamPlayers.email,
              teamPlayers.school,
            )
          );
          break;
        case "Engineer":
          employees.push(
            new Engineer(
              teamPlayers.name,
              teamPlayers.id,
              teamPlayers.email,
              teamPlayers.github
            )
          );
          break;
        case "Manager":
          employees.push(
            new Manager(
              teamPlayers.name,
              teamPlayers.id,
              teamPlayers.email,
              teamPlayers.officeNumber
            )
          );
          break;
      }
    });

    employees.forEach(employee => {
      cards.push(employee.getCard())
    });

    cards = cards.join(" ");
    html = teamHtml(cards);
    console.log(html);
    writeFileAsync("./output/index.html", html);
  } catch (err) {
    console.log(err);
  }
}

init();
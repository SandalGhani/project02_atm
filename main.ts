#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let mybalance = 100000; //Dollar
let mypin = 2233;
console.log(chalk.blue("\n\tWell Come To Izhar ATM Machine\n\t"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: chalk.yellow("Enter your pin code"),
    type: "number",
  },
]);
if (pinAnswer.pin === mypin) {
  console.log(chalk.green("\t\nlogin successfully!!\t\n"));
  // console.log(`Current Amount Balance is ${mybalance}`);

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "please select option",
      type: "list",
      choices: ["withdraw amount", "check balance"],
    },
  ]);

  if (operationAns.operation === "withdraw amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        message: "Select A Withdrawal method",
        type: "list",
        choices: ["Fast cash", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Fast cash") {
      let fastcashAns = await inquirer.prompt([
        {
          name: "fastCash",
          message: "Select Amount",
          type: "list",
          choices: [1000, 2000, 5000, 10000, 15000, 20000],
        },
      ]);
      if (fastcashAns.fastCash > mybalance) {
        console.log(chalk.red("\t\nInsufficient Balance\t\n"));
      } else {
        mybalance -= fastcashAns.fastCash;
        console.log(`${fastcashAns.fastCash}`, "Withdraw successfully");
        console.log(`Your Remaining balance is:${mybalance}`);
      }
    } else if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          mesage: "enter your amount",
          type: "number",
        },
      ]);
      if (amountAns.amount > mybalance) {
        console.log(chalk.red("\t\ninfficient Balance\t\n"));
      } else {
        mybalance -= amountAns.amount;
        console.log(`${amountAns.amount}`, chalk.green("Withdraw Successfully"));
        console.log(`Your remaining balance is: ${mybalance}`);
      }
    }

    // mybalance -= amountAns.amount;
    // console.log("Your remaining balance is: " + mybalance);
  } else if (operationAns.operation === "check balance") {
    console.log(chalk.blue("your balance is:") + mybalance);
  }
} else {
  console.log(chalk.red("\nPin code is incorrect, try Again\n"));
}
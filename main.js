#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var mybalance = 100000; //Dollar
var mypin = 2233;
console.log(chalk_1.default.blue("\n\tWell Come To Izhar ATM Machine\n\t"));
var pinAnswer = await inquirer_1.default.prompt([
    {
        name: "pin",
        message: chalk_1.default.yellow("Enter your pin code"),
        type: "number",
    },
]);
if (pinAnswer.pin === mypin) {
    console.log(chalk_1.default.green("\t\nlogin successfully!!\t\n"));
    // console.log(`Current Amount Balance is ${mybalance}`);
    var operationAns = await inquirer_1.default.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["withdraw amount", "check balance"],
        },
    ]);
    if (operationAns.operation === "withdraw amount") {
        var withdrawAns = await inquirer_1.default.prompt([
            {
                name: "withdrawMethod",
                message: "Select A Withdrawal method",
                type: "list",
                choices: ["Fast cash", "Enter Amount"],
            },
        ]);
        if (withdrawAns.withdrawMethod === "Fast cash") {
            var fastcashAns = await inquirer_1.default.prompt([
                {
                    name: "fastCash",
                    message: "Select Amount",
                    type: "list",
                    choices: [1000, 2000, 5000, 10000, 15000, 20000],
                },
            ]);
            if (fastcashAns.fastCash > mybalance) {
                console.log(chalk_1.default.red("\t\nInsufficient Balance\t\n"));
            }
            else {
                mybalance -= fastcashAns.fastCash;
                console.log("".concat(fastcashAns.fastCash), "Withdraw successfully");
                console.log("Your Remaining balance is:".concat(mybalance));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            var amountAns = await inquirer_1.default.prompt([
                {
                    name: "amount",
                    mesage: "enter your amount",
                    type: "number",
                },
            ]);
            if (amountAns.amount > mybalance) {
                console.log(chalk_1.default.red("\t\ninfficient Balance\t\n"));
            }
            else {
                mybalance -= amountAns.amount;
                console.log("".concat(amountAns.amount), chalk_1.default.green("Withdraw Successfully"));
                console.log("Your remaining balance is: ".concat(mybalance));
            }
        }
        // mybalance -= amountAns.amount;
        // console.log("Your remaining balance is: " + mybalance);
    }
    else if (operationAns.operation === "check balance") {
        console.log(chalk_1.default.blue("your balance is:") + mybalance);
    }
}
else {
    console.log(chalk_1.default.red("\nPin code is incorrect, try Again\n"));
}

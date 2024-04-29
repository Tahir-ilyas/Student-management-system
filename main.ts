#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

const randomNumber: number = 11000 + Math.floor(Math.random() *12000 ) 
let myBalance: number = 0
const answer = await inquirer.prompt([
    {
        name:"student",
        type:"input",
        message:(chalk.greenBright("Enter the student name:")),
        validate:function (value:string){
            if(value.trim() !== ""){
                return true;
            }
            
            return chalk.greenBright("please enter non-empty value")
        }

    },
    {
        
            name:"course",
            type:"list",
            message:(chalk.greenBright("Choose the course:")),
            choices:["typescript","Python","Mobile & webApplication","next.js","React"]
        
        
        }
        
])

console.log(chalk.yellowBright("Welcome to the school"))
const tuitionFees:{[key:string]:number} = {
    "typescript":5000,
    "Python":5500,
    "Mobile & webApplication":4000,
    "next.js":6000,
    "React":5200,
}
console.log(chalk.greenBright(`\n your tution fees is:${tuitionFees[answer.course]}/-\n`));
console.log(chalk.cyanBright(`Balance: ${myBalance}\n`));

let paymentOption = await inquirer.prompt([
    {
        name:"payment",
        type:"list",
        message:(chalk.redBright("Choose the payment option:")),
        choices:["Bank transfer","jazzCash","easy paisa"]
    },
    {
        name:"amount",
        type:"input",
        message:(chalk.blueBright("Transfer the amount:")),
        validate:function (value){
            if(value.trim()!== ""){
                return true;
            }

            return chalk.redBright("please enter non-empty value")
        },
    }
]);

console.log(chalk.yellowBright( `\n please select the transfer fees option ${paymentOption.payment}\n`));
const courseFee = tuitionFees[answer.course]
const paymentAmount = parseFloat(paymentOption.amount)
if(courseFee === paymentAmount){
    console.log(chalk.magentaBright(`congragulation you have successfully enroled the  ${answer.course} course\n`));

    let ans = await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:(chalk.cyanBright("Do you want to see the status?")),
            choices:["View status","Exit"]
        }
    ]);
    if(ans.select === "View status"){
        console.log(chalk.yellowBright("\n ************** Your status is ****************\n "));
        console.log(chalk.greenBright(` your student name is ${answer.student}`));
        console.log(chalk.magentaBright(` your student id is ${randomNumber}`));
        console.log(chalk.cyanBright(` your course is ${answer.course}`));
        console.log(chalk.redBright(` your course fee is ${courseFee}`));
        console.log(chalk.blueBright(` your payment amount is ${paymentAmount}`));
        console.log(chalk.yellowBright(` your remaining balance is ${myBalance += paymentAmount}`));
        console.log(chalk.cyanBright("\n ********** Thank you for using Student managment system ************ \n"));
    }else if(ans.select === "Exit"){
        console.log(chalk.redBright("Thank you for using our service"));
    }
    
        
}else{
    console.log(chalk.redBright("payment failed"));
};



    




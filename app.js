const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const {dinnerArray} = require('./dinnerRecipes');
const DailyMeal = require("./DailyMeal");
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
// const http = require('node:http');

/**
 * This function takes two parameters, day and mealName, to create a new Meal object, which is later referenced for showing recipes for the week
 * 
 * @param {string} day - Day of the week (Monday thru Sunday)
 * @param {string} mealName - Name of the meal, currently stored in the dinner array
 * @returns DailyMeal object
 */
const createDailyMeal = (day, mealName) => {
    return new DailyMeal(day, mealName);
}

/**
 * This function loops through all of the days of the week and adds a meal to each of the days for that week
 * 
 * @param {array} daysOfWeek - the seven days of the week, starting with Monday and ending with Sunday
 * @param {array} dinnerArray - the array of dinner recipe objects
 * @returns array of DailyMeal objects
 */
const weeklyDinnerAgenda = (daysOfWeek, dinnerArray) => {
    // initialize an agenda array
    let agenda = [];
    // loop through the daysOfWeek array and 
    for (let i = 0; i < daysOfWeek.length; i++) {
        // generate a random index of the dinnerArray
        const randomIndex = Math.floor(Math.random() * dinnerArray.length);
        // select and remove meal from the dinnerArray
        const meal = dinnerArray.splice(randomIndex, 1);
        // call the createDailyMeal function and retrun a new DailyMeal object
        const dailyMeal = createDailyMeal(daysOfWeek[i], meal[0].name);
        agenda.push(dailyMeal);
    }
    console.log(agenda);
    return JSON.stringify(agenda);
};

const Run = () => {
    weeklyDinnerAgenda(DAYS_OF_WEEK, dinnerArray);

    const rl = readline.createInterface({ input, output });
    rl.question('Will you be attending trivia this Wednesday? (y/n) ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank you for your valuable feedback: ${answer}`);

        rl.question('Do you plan on scheduling a date night this week? (y/n) ', (answer) => {
            // TODO: Log the answer in a database
            console.log(`Thank you for your valuable feedback: ${answer}`);
    
            rl.close();
        });
        
    });
}

Run();


// const hostname = '127.0.0.1';
// const port = 3000;

//const weeklyAgenda = weeklyDinnerAgenda(DAYS_OF_WEEK, dinnerArray);

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(weeklyAgenda);
//   });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//   });
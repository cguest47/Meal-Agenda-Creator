const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const {dinnerArray, sundayDinnerArray} = require('./dinnerRecipes');
const DailyMeal = require("./DailyMeal");
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

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
const weeklyDinnerAgenda = (daysOfWeek, dinnerArray, sundayDinnerArray) => {
    // initialize an agenda array
    let agenda = [];
    // loop through the daysOfWeek array
    for (let i = 0; i < daysOfWeek.length; i++) {
        // use weekly dinnerArray
        if (i != 6 ) {
            // generate a random index of the dinnerArray
            const randomIndex = Math.floor(Math.random() * dinnerArray.length);
            // select and remove meal from the dinnerArray
            const meal = dinnerArray.splice(randomIndex, 1);
            // call the createDailyMeal function and retrun a new DailyMeal object
            const dailyMeal = createDailyMeal(daysOfWeek[i], meal[0].name);
            agenda.push(dailyMeal);
        } else { //for Sunday night dinners
            // generate a random index of the sundayDinnerArray
            const randomIndex = Math.floor(Math.random() * sundayDinnerArray.length);
            // select and remove meal from the dinnerArray
            const meal = sundayDinnerArray.splice(randomIndex, 1);
            // call the createDailyMeal function and retrun a new DailyMeal object
            const dailyMeal = createDailyMeal(daysOfWeek[i], meal[0].name);
            agenda.push(dailyMeal);
        }
    }
    return agenda;
};

/**
 * This function resolves a promise that asks a user a question and returns the response asynchronously
 * 
 * @param {readline} rl - readline stream
 * @param {string} questionString - the question the user wants to ask
 * @returns 
 */
const question = (rl, questionString) => {
    return new Promise((resolve, reject) => {
        rl.question(questionString, (answer) => {
            answer = answer.toUpperCase();
            if (answer == "YES") {answer = "Y"};
            console.log(`Thank you for your valuable feedback: ${answer}`);
            resolve(answer);
        });
    })
}

/**
 * Asks the questions and returns the answers
 * 
 * @param {string} triviaQuestion 
 * @param {string} dateNightQuestion 
 * @param {readline} rl - readline stream 
 */
const questions = async (triviaQuestion, dateNightQuestion, rl) => {
    const triviaAnswer = await question(rl, triviaQuestion);
    const dateNightAnswer = await question(rl, dateNightQuestion);
    rl.close();
    return {
        triviaAnswer: triviaAnswer,
        dateNightAnswer: dateNightAnswer
    };
}

/**
 * Asynchronous function that runs the weekly dinner agenda creation, asks questions, processes responses and logs the repsonse to the console
 */
const Run = async () => {
    // fill in this week's agenda with meals and log
    let thisWeeksAgenda = weeklyDinnerAgenda(DAYS_OF_WEEK, dinnerArray, sundayDinnerArray);
    console.log(thisWeeksAgenda);
    // initialize a read/write stream to further refine the output
    const rl = readline.createInterface({ input, output });
    // define questions to ask for nightly activities
    const triviaQuestion = 'Will you be attending trivia this Wednesday? (y/n) ';
    const dateNightQuestion = 'Do you plan on scheduling a date night this Saturday? (y/n) ';
    // call ascynchronous function that returns the 
    const answers = await questions(triviaQuestion, dateNightQuestion, rl);
    if (answers.triviaAnswer == "Y") {
        thisWeeksAgenda[2].mealName = "Eating out for trivia";
    }
    if (answers.dateNightAnswer == "Y") {
        thisWeeksAgenda[5].mealName = "Date night, baby!";
    }
    console.log(thisWeeksAgenda);
}

Run();
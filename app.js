const http = require('node:http');
const {dinnerArray} = require('./dinnerRecipes');

const hostname = '127.0.0.1';
const port = 3000;

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const createWeeklyMeal = (day, mealName) => {
    return {
        day: day,
        mealName: mealName
    }
}

const weeklyDinnerAgenda = (daysOfWeek, dinnerArray) => {
    let agenda = [];
    for (let index = 0; index < daysOfWeek.length; index++) {
        const currentDay = daysOfWeek[index];
        const currentRandomIndex = Math.floor(Math.random() * dinnerArray.length);
        const currentMeal = dinnerArray.splice(currentRandomIndex, 1);
        const newMeal = createWeeklyMeal(currentDay, currentMeal[0].name);
        agenda.push(newMeal);
    }
    console.log(agenda);
    return JSON.stringify(agenda);
};

const weeklyAgenda = weeklyDinnerAgenda(daysOfWeek,dinnerArray);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(weeklyAgenda);
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


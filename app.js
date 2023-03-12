const dinnerArray = [
    {name: 'Butter Chicken'},
    {name: 'Ramen'},
    {name: 'Frozen Pizza'},
    {name: 'Chicken and Rice'},
    {name: 'Steaks'},
    {name: 'Chili'},
    {name: 'Spaghetti'},
    {name: 'Tacos'},
    {name: 'Kelsee\'s Tortellini'},
    {name: 'Stir Fry'}
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const createWeeklyMeal = (day, meal) => {
    return {
        day: day,
        meal: meal
    }
}

const weeklyDinnerAgenda = (daysOfWeek, dinnerArray) => {
    let agenda = [];
    for (let index = 0; index < 7; index++) {
        const currentDay = daysOfWeek[index];
        const currentMeal = dinnerArray[Math.floor(Math.random() * dinnerArray.length)].name;
        const newMeal = createWeeklyMeal(currentDay, currentMeal);
        agenda += newMeal;
        console.log(newMeal);
    }
    return agenda;
};

const weeklyAgenda = weeklyDinnerAgenda(daysOfWeek,dinnerArray);

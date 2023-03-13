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

const createWeeklyMeal = (day, mealName) => {
    return {
        day: day,
        mealName: mealName
    }
}

const weeklyDinnerAgenda = (daysOfWeek, dinnerArray) => {
    let agenda = [];
    for (let index = 0; index < 7; index++) {
        const currentDay = daysOfWeek[index];
        const currentRandomIndex = Math.floor(Math.random() * dinnerArray.length);
        const currentMeal = dinnerArray.splice(currentRandomIndex, 1);
        const newMeal = createWeeklyMeal(currentDay, currentMeal[0].name);
        agenda += newMeal;
        console.log(newMeal);
    }
    return agenda;
};

const weeklyAgenda = weeklyDinnerAgenda(daysOfWeek,dinnerArray);

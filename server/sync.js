// sync.js
const db = require('./models');
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error("An error occurred while creating the table:", err.message);
    });

const mongoose = require("mongoose");

const URI = process.env.URI;

const connectToDB = () => {
    mongoose.connect(URI).then(()=>{
        console.log("DB Connected");
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    })
};

module.exports = connectToDB;
import mongoose from "mongoose";

const URL_DB = `mongodb+srv://admin:Admin123@cluster0.g2hcgno.mongodb.net/Testdb?retryWrites=true&w=majority`;

async function connect() {
    try {
        await mongoose.connect(URL_DB);
        console.log("Database connected successfuly");
    } catch (error) {
        console.log("Error to connect Database");
        console.log(error);
    }
}

export {connect}; 
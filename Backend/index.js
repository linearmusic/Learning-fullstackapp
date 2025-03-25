require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/user", userRouter);

async function main(){
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
main()
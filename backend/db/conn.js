const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/redux-backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection successful"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

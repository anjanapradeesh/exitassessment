const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://anjanapradeesh:anjanamongo123@cluster0.93gov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  })
  
  
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports=mongoose;
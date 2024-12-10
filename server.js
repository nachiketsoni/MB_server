require("@babel/register");
const mongoose = require("mongoose");
const { server } = require("./app");


const connectDatabase = async () => {
  try {
    const options = {
      connectTimeoutMS: 200000,
      socketTimeoutMS: 2000000,
      keepAlive: true,
      useNewUrlParser: true,
      maxPoolSize: 10,
      useUnifiedTopology: true
    };
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URL, options);
    console.log("Database connected successfully on " ,process.env.MONGODB_URL)
    const port = process.env.PORT || 3000;

    server.listen(port, () => { console.log(`App running on port 127.0.0.1:${port}`)});
    console.log("Server is running on", process.env.NODE_ENV ,"mode"  )
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

module.export = server;

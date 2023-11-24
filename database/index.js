import mongoose from "mongoose";

export const dbConnectionMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://diegobronc1508:mongodbnosql@diegobronc.gmneksw.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error ("Se rompió")
  }

};
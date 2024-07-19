import mongoose from "mongoose";
import { env } from "process";
const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const connectToDB = async () => {
  if (!CONNECTION_STRING) return;

  mongoose.set("strictQuery", true);
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
    console.log("already connected!");
    return;
  }
  try {
    const connection = await mongoose.connect(CONNECTION_STRING, {
      dbName: "inventaryMangmentSys",
    });
    console.log("connected");
    return connection;
  } catch (err) {
    console.error(err);
    throw new Error("fail to connect to database");
  }
};
export default connectToDB;

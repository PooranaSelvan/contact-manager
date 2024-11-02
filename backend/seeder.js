import User from "./model/userSchema.js";
import users from "./data/users.js";

import connectDB from "./config/db.js";

connectDB();

const importData = async () => { 

     try{
          await User.deleteMany();

          const createUser = await User.insertMany(users);
          console.log("User Added");
          process.exit();
     } catch(err){
          console.log(err);
          process.exit(1);
     }
}

importData();
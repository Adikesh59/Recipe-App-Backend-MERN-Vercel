import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.js';
import recipeRouter from './routes/recipe.js';
const app = express();
import cors from 'cors';

//For read json data / For parsing data
app.use(express.json())
//This line tells your Express app to automatically read JSON data that comes in requests.

//Using Cors to connect backend to frontend
// app.use(cors({
//   origin:true,
//   methods:["GET","POST","PUT","DELETE"],
//   credentials:true
// }))

//Vercel change start
// ✅ Correct CORS setup (frontend URL fix)
app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://recipe-app-frontend-mern.vercel.app" // ✅ your deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// ✅ Default route (for testing backend connection)
// app.get("/", (req, res) => {
//   res.send("Backend is live and connected successfully!");
// });
//Vercel change end

//userRouter
// app.use('/backend', userRouter)
/*Tells the app to use all the routes from userRouter,
and make them available under the /backend path. */

//recipeRouter
// app.use('/backend', recipeRouter)

//Vercel change
app.use("/backend/user", userRouter);
app.use("/backend/recipe", recipeRouter);
//end

mongoose.connect("mongodb+srv://root:root@cluster0.radrflo.mongodb.net/", {
  dbName: "Recipe_App_MERN",
})
  .then(() => {
    console.log("MongoDb is Connected Successfully...!");
  })
  .catch((err) => {
    console.log(err.message);
  });


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server is started at http://localhost:${PORT}`);
});

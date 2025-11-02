import express from 'express';
import { add, getSavedRecipe, savedRecipeById} from '../controllers/recipe.js';
import { getRecipeByUserId } from '../controllers/recipe.js';
import { getAllRecipe } from '../controllers/recipe.js';
import { getRecipeById } from '../controllers/recipe.js';
//auth
import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

//Create Recipe
router.post('/add', Authenticate, add)

//Getting All Recipe
router.get('/', getAllRecipe) 

//Get All saved recipe
router.get("/saved",getSavedRecipe)

//Get recipe by Id
router.get('/:id', getRecipeById )

//Get recipe by User Id
router.get('/user/:id', getRecipeByUserId)

//save recipe by Id
router.post("/:id", Authenticate, savedRecipeById)
export default router;
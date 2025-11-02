import { Recipe } from "../Models/Recipe.js";
import { SavedRecipe } from "../Models/SavedRecipe.js";

//For add recipe and save to database
export const add = async (req, res) => {
  const { title, inst, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgUrl } = req.body;

  try {

    const recipe = await Recipe.create({ title, inst, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgUrl, user: req.user})
    res.json({ message: "Recipe added Successfully!", recipe })

  } catch (error) {
    res.json({ message: error.message })
  }
}

//For get recipe
export const getAllRecipe = async (req, res) => {
  const recipe = await Recipe.find();
  res.json({recipe})
}

//For get recipe by Id
export const getRecipeById = async (req, res) => {
  const id = req.params.id
  try {
    let recipe = await Recipe.findById(id)
    if(!recipe) return res.json({message: "Recipe not found !"});
    res.json({recipe})

  } catch (error) {
    res.json({message: error.message})
  }
}

//For get recipe by userId

export const getRecipeByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const recipe = await Recipe.find({ user: userId });
    if (recipe.length === 0) return res.json({ message: "Recipe not found!" });
    res.json({ message: "Recipe by userId", recipe });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//For save recipe by Id
export const savedRecipeById = async (req, res) => {
  const id = req.params.id;
  try {
   let recipe = await SavedRecipe.findOne({recipe:id});
   if(recipe) return res.json({message: "Recipe already saved"});
   recipe = await SavedRecipe.create({recipe:id})
   res.json({message: "Recipe saved successfully"})
  } catch (error) {
    res.json({message: error.message})
  }
}

//get saved Recipe
export const getSavedRecipe = async (req, res) => {
  try {
      const savedRecipe = await SavedRecipe.find();
    // const savedRecipe = await SavedRecipe.find().populate("recipe");
    res.json({ savedRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
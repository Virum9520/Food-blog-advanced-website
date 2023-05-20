require('../models/database')

const Category = require("../models/Category")

// /**
//  * GET /
//  * Homepage 
// */


exports.homepage = async(req, res) => {
    res.render('index', {title: 'Cooking Blog - Home'})
}

exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj } );
}


exports.submitRecipeOnPost = async(req, res) => {
  console.log(req.body);
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files were uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }
  async function insertDymmyRecipeData(){
      try {
        await Recipe.insertMany([
          { 
            "name": "Recipe Name Goes Here",
            "description": `Recipe Description Goes Here`,
            "email": "recipeemail@raddy.co.uk",
            "ingredients": [
              "1 level teaspoon baking powder",
              "1 level teaspoon cayenne pepper",
              "1 level teaspoon hot smoked paprika",
            ],
            "category": "American", 
            "image": "southern-friend-chicken.jpg"
          },
          { 
            "name": "Recipe Name Go6es Here",
            "description": `Recipe Description Goes Here`,
            "email": "recipeemail@raddy.co.uk",
            "ingredients": [
              "1 level teaspoon baking powder",
              "1 level teaspoon cayenne pepper",
              "1 level teaspoon hot smoked paprika",
            ],
            "category": "American", 
            "image": "southern-friend-chicken.jpg"
          },
        ]);
      } catch (error) {
        console.log('err', + error)
      }
    }
    
  insertDymmyRecipeData();
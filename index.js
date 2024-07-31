import express from "express";
import axios from "axios";

const app = express();
const num = Math.floor(Math.random() * 100);

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/generate", (req, res) => {
    res.redirect("/");
})


app.post("/generate", async (req, res) => {
    try{
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const result = response.data;

        res.render("index.ejs", {
            cocktail: result.drinks[0].strDrink,
            alcohol: result.drinks[0].strAlcoholic,
            instructions: result.drinks[0].strInstructions,
            category: result.drinks[0].strCategory,
            image: result.drinks[0].strDrinkThumb,
        });
    } catch (error) {
        console.error("Failed to fetch data", error.message);
    }
})

app.post("/generate1", async (req, res) => {
    try{
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic");
        const result = response.data;

        
        res.render("index.ejs", {
            cocktail: result.drinks[num].strDrink,
            alcohol: result.drinks[num].strAlcoholic,
            instructions: result.drinks[num].strInstructions,
            category: result.drinks[num].strCategory,
            image: result.drinks[num].strDrinkThumb,
        });
        
    } catch (error) {
        console.error("Failed to fetch data", error.message);
    }
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})
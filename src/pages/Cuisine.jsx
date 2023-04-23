import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  useEffect(() => {
    const cuisine = JSON.parse(localStorage.getItem(params.type));
    if (cuisine) {
      setCuisine(cuisine);
    } else {
      getCuisine(params.type);
    }
  }, [params.type]);

  async function getCuisine(name) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_WEATHER_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
    localStorage.setItem(name, JSON.stringify(recipes.results));
  }

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((recipe) => (
        <Card key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;

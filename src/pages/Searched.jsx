import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  async function getSearched(name) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_WEATHER_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
    console.log(recipes.results);
  }

  return (
    <Grid>
      {searchedRecipes.map((recipe) => (
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;

  @media (max-width: 390px) {
    grid-template-columns: 1fr;
  }
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

export default Searched;

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  const [recipe, setRecipe] = useState();
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();

  useEffect(() => {
    fetchDetails(params.id);
  }, [params.id]);

  async function fetchDetails(id) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_WEATHER_API_KEY}`
    );
    const detailData = await data.json();
    setRecipe(detailData);
  }

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe?.title}</h2>
        <img src={recipe?.image} alt={recipe?.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: recipe?.summary }}></div>
            <div
              dangerouslySetInnerHTML={{ __html: recipe?.instructions }}
            ></div>
          </>
        ) : (
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background-color: #52796f;
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #52796f;
  background-color: white;
  border: 2px solid #52796f;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;

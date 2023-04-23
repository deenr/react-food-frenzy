import { useEffect, useState } from "react";
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
      <Presentation>
        <h2>{recipe?.title}</h2>
        <img src={recipe?.image} alt={recipe?.title} />
      </Presentation>
      <InfoSection>
        <InfoButton>
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
        </InfoButton>

        <InfoDetails>
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
        </InfoDetails>
      </InfoSection>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 960px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }

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
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #52796f;
  background-color: white;
  border: 2px solid #52796f;
  font-weight: 600;
  width: 100%;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 960px) {
    justify-content: space-between;
  }
`;

const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Presentation = styled.data`
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export default Recipe;

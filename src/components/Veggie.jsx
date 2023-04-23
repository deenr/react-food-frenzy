import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  async function getVeggie() {
    const veggie = localStorage.getItem("veggie");

    if (veggie) {
      setVeggie(JSON.parse(veggie));
      console.log(JSON.parse(veggie));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_WEATHER_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            gap: "5rem",
            breakpoints: {
              960: {
                perPage: 2,
              },
              520: {
                perPage: 1,
              },
            },
          }}
        >
          {veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={`/recipe/${recipe.id}`}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
                <div className="gradient"></div>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    .gradient {
      z-index: 100;
      background-color: azure;
    }
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, 0);
    color: white;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;

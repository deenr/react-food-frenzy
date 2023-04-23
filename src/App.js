import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <Logo to={"/"}>
            <GiKnifeFork />
            Food Frenzy
          </Logo>
        </Nav>
        <Content>
          <Search />
          <Category />
          <Pages />
        </Content>
      </BrowserRouter>
    </div>
  );
}

const Content = styled.div`
  padding: 0 3rem;

  @media (max-width: 960px) {
    padding: 0 2rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  justify-content: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  color: white;
`;

const Nav = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #52796f;

  svg {
    font-size: 2rem;
  }

  @media (max-width: 960px) {
    padding: 1rem 2rem;
  }
`;

export default App;

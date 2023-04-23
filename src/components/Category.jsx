import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <StyledNavLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </StyledNavLink>
      <StyledNavLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </StyledNavLink>
      <StyledNavLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </StyledNavLink>
      <StyledNavLink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </StyledNavLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2rem 0;
  gap: 2rem;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    gap: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  gap: 0.5rem;
  text-decoration: none;
  background-color: #52796f;
  width: 6rem;
  height: 6rem;
  cursor: pointer;

  @media (max-width: 640px) {
    flex-direction: row;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    margin: 0.5rem 0;
  }

  h4 {
    color: white;
    font-size: 0.8rem;

    @media (max-width: 320px) {
      display: none;
    }
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &.active {
    background: linear-gradient(#354f52, #2f3e46);
  }
`;

export default Category;

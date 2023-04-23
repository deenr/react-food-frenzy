import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    navigate(`/searched/${input}`);
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <FaSearch />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  position: relative;
  width: 100%;
  margin: 2rem 0;

  input {
    border: none;
    background-color: #2f3e46;
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1.5rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;

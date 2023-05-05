import { useState, useEffect } from "react";

function MainContent() {
  const [pokeApi, setPokeApi] = useState([]);

  useEffect(() => {
    displayPokemon();
  }, []);

  const displayPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setPokeApi(result.results);
  };

  const pokemonMap = pokeApi.map((data, index) => {
    return (
      <li key={index}>
        {data.name}
        {data.sprites}
      </li>
    );
  });
  return (
    <>
      <h2>All Pokemon</h2>
      {pokemonMap}
    </>
  );
}

export default MainContent;

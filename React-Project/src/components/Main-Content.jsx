import { useState, useEffect } from "react";
import "./Main-Content.css";
import PokemonTeam from "./PokemonTeam";
import NavBar from "./NavBar";

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function MainContent() {
  document.body.className = "maincontent-page";
  const [pokeApi, setPokeApi] = useState([]);
  const [yourPokemonTeam, setYourPokemonTeam] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");

  useEffect(() => {
    displayPokemon();
  }, []);

  const displayPokemon = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=1008"
    );
    const result = await response.json();
    setPokeApi(result.results);
  };

  const fetchPokemonData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      name: data.name,
      sprite: data.sprites.front_default,
      types: data.types.map((typeData) => typeData.type.name),
    };
  };

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await Promise.all(
        pokeApi.map(async (pokemon) => {
          const pokemonData = await fetchPokemonData(pokemon.url);
          return pokemonData;
        })
      );
      setPokeApi(data);
    };
    getPokemonData();
  }, [pokeApi]);

  const handleAddToTeam = (pokemon) => {
    if (yourPokemonTeam.length >= 6) {
      return;
    }
    setYourPokemonTeam((prevTeam) => [...prevTeam, pokemon]);
  };

  const handleSearch = (event) => {
    const debouncedSearch = debounce(() => {
      setPokeSearch(event.target.value.toLowerCase());
    }, 500);
    debouncedSearch();
  };

  const filteredPokemon = pokeApi.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokeSearch)
  );

  const pokemonList = filteredPokemon.map((pokemon, index) => (
    <div id="card" key={index} onClick={() => handleAddToTeam(pokemon)}>
      <div id="pokeName">
        <b>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
      </div>
      <div id="pokeImage">
        <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
      </div>
    </div>
  ));

  return (
    <div className="main-content">
      <NavBar />
      <PokemonTeam
        pokemonTeam={yourPokemonTeam}
        setYourPokemonTeam={setYourPokemonTeam}
      />
      <div>
        <h2 id="allpoke">All Pokemon</h2>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search Pokemon Here"
          onChange={handleSearch}
        />
      </div>
      {pokemonList}
    </div>
  );
}

export default MainContent;

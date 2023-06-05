import { useState, useEffect } from "react";

function PokemonTeam({ pokemonTeam, setYourPokemonTeam }) {
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const deletePokemon = (index) => {
    const newTeam = pokemonTeam.filter((_, i) => i !== index);
    setYourPokemonTeam(newTeam);
  };

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const types = await Promise.all(
        pokemonTeam.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await response.json();
          return data.types.map((type) => type.type.name);
        })
      );
      setPokemonTypes(types);
    };
    fetchPokemonTypes();
  }, [pokemonTeam]);

  const teamList = pokemonTeam.map((pokemon, index) => (
    <div id="card" key={index} onClick={() => deletePokemon(index)}>
      <div id="pokeName">
        <b>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
      </div>
      <div id="pokeImage">
        <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
      </div>
      <div id="pokeType">
        {pokemonTypes[index] && pokemonTypes[index].length > 0 ? (
          pokemonTypes[index].map((type, i) => (
            <div key={i} className={`type ${type}`}>
              {type === "grass" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/7/74/GrassIC_Big.png"
                  alt="Grass Type Icon"
                />
              ) : type === "water" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/5/56/WaterIC_Big.png"
                  alt="Water Type Icon"
                />
              ) : type === "fire" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/2/26/FireIC_Big.png"
                  alt="Fire Type Icon"
                />
              ) : type === "electric" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/4/4a/ElectricIC_Big.png"
                  alt="Electric Type Icon"
                />
              ) : type === "bug" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/c/c8/BugIC_Big.png"
                  alt="Bug Type Icon"
                />
              ) : type === "normal" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/3/39/NormalIC_Big.png"
                  alt="Normal Type Icon"
                />
              ) : type === "poison" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/3/3d/PoisonIC_Big.png"
                  alt="Poison Type Icon"
                />
              ) : type === "ground" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/8/8f/GroundIC_Big.png"
                  alt="Ground Type Icon"
                />
              ) : type === "flying" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/c/cb/FlyingIC_Big.png"
                  alt="Flying Type Icon"
                />
              ) : type === "psychic" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/6/60/PsychicIC_Big.png"
                  alt="Psychic Type Icon"
                />
              ) : type === "fighting" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/6/67/FightingIC_Big.png"
                  alt="Fighting Type Icon"
                />
              ) : type === "rock" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/c/ce/RockIC_Big.png"
                  alt="Rock Type Icon"
                />
              ) : type === "ghost" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/7/73/GhostIC_Big.png"
                  alt="Ghost Type Icon"
                />
              ) : type === "ice" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/6/6f/IceIC_Big.png"
                  alt="Ice Type Icon"
                />
              ) : type === "dragon" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/4/48/DragonIC_Big.png"
                  alt="Dragon Type Icon"
                />
              ) : type === "fairy" ? (
                <img src="https://archives.bulbagarden.net/media/upload/7/73/FairyIC_Big.png" />
              ) : type === "dark" ? (
                <img src="https://archives.bulbagarden.net/media/upload/5/56/DarkIC_Big.png" />
              ) : type === "steel" ? (
                <img
                  src="https://archives.bulbagarden.net/media/upload/d/d4/SteelIC_Big.png"
                  alt="Steel Type Icon"
                />
              ) : (
                type
              )}
            </div>
          ))
        ) : (
          <div>No types available</div>
        )}
      </div>
    </div>
  ));

  return (
    <>
      <div>
        <h2 id="pokeTeam">Your Pokemon Team</h2>
      </div>
      {teamList}
    </>
  );
}

export default PokemonTeam;

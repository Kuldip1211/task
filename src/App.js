import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./PokemonList";
import SearchBar from "./SearchBar";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const allPokemons = response.data.results;

        const pokemonData = await Promise.all(
          allPokemons.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Gallery</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;

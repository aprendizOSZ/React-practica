import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';


function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
      const getPokemon = async () => {
          try {
              const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
              const data = await response.json();

              const detailedPokemon = await Promise.all(
                  data.results.map(async (p) => {
                      const res = await fetch(p.url);
                      const details = await res.json();
                      return {
                          id: details.id,
                          name: details.name,
                          sprite: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
                      };
                  })
              );

              setPokemon(detailedPokemon);
          } catch (error) {
              console.error('Error al obtener los Pokemon:', error);
          }
      };

      getPokemon();
  }, []);

  return (
      <div className="p-4">
          <h1 
            className="text-4xl font-bold mb-6 text-center text-yellow-400"
            style={{
              fontFamily: 'var(--pokefont)',
              WebkitTextStroke: '2px #2a4b8d',
              letterSpacing: '2px',
              textShadow: '3px 3px 0 #2a4b8d, -1px -1px 0 #2a4b8d, 1px -1px 0 #2a4b8d, -1px 1px 0 #2a4b8d, 1px 1px 0 #2a4b8d'
            }}
          >
            BIENVENIDOS A LA POKEDEX DE KANTO
          </h1>
          <PokemonList pokemon={pokemon} onSelect={setSelectedPokemon} />

          {selectedPokemon && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
                  <h2 className="text-2xl font-semibold capitalize mb-4">
                      {selectedPokemon.name}
                  </h2>
                  <img 
                      src={selectedPokemon.sprite} 
                      alt={selectedPokemon.name}
                      className="mx-auto w-48 h-48 object-contain"
                      onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
                      }}
                  />
              </div>
          )}
      </div>
  );
}

export default Pokedex;
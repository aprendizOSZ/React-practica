import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const Info = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonResponse.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const pokemonData = await pokemonResponse.json();
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        const descriptionData = speciesData.flavor_text_entries.find(
          entry => entry.language.name === 'es'
        ) || speciesData.flavor_text_entries[0];
        setPokemon({
          ...pokemonData,
          description: descriptionData?.flavor_text || 'Descripción no disponible'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Cargando información del Pokémon...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error: {error}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const getPokemonImage = () => {
    if (!pokemon) return '';
    
    if (isShiny) {
      return pokemon.sprites.other['official-artwork'].front_shiny || 
             pokemon.sprites.front_shiny ||
             pokemon.sprites.other['official-artwork'].front_default ||
             pokemon.sprites.front_default;
    }
    
    return pokemon.sprites.other['official-artwork'].front_default || 
           pokemon.sprites.front_default;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header con nombre, número y switch shiny */}
        <div className="bg-red-600 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
              <span className="text-xl">#{pokemon.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${!isShiny ? 'text-yellow-300' : 'text-gray-300'}`}>
                Normal
              </span>
              <button
                onClick={() => setIsShiny(!isShiny)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                  isShiny ? 'bg-yellow-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`${
                    isShiny ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
              <span className={`text-sm font-medium ${isShiny ? 'text-yellow-300' : 'text-gray-300'}`}>
                Shiny
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 md:flex gap-6">
          {/* Imagen del Pokémon */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img
              src={getPokemonImage()}
              alt={`${pokemon.name} ${isShiny ? 'shiny' : ''}`}
              className="w-full h-auto max-w-xs mx-auto"
            />
          </div>

          {/* Información del Pokémon */}
          <div className="md:w-2/3">
            {/* Tipos */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Tipo</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
              <div className="space-y-2">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-32 font-medium capitalize">{stat.stat.name}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 w-8 text-right">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="whitespace-pre-line">
                {pokemon.description?.replace(/\f/g, ' ') || 'Descripción no disponible'}
              </p>
            </div>         
          </div>
        </div>

        <div className="p-4 bg-gray-50 text-center">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para obtener colores según el tipo de Pokémon
function getTypeColor(type) {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#777';
}

export default Info;
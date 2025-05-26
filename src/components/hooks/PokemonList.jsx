import React from 'react';
import { Link } from 'react-router-dom';

const PokemonList = ({ pokemon = [], onSelect }) => {
  if (pokemon.length === 0) {
    return <p className="text-center text-gray-500">Cargando Pokémon...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {pokemon.map((p) => (
        <Link
          key={p.id}
          to={`/info/${p.id}`}
          className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow text-center"
        >
          <img
            src={p.sprite}
            alt={p.name}
            className="w-20 h-20 mx-auto mb-2"
          />
          <p className="font-medium capitalize font-pokemon">{p.name}</p>
          <p className="text-sm text-gray-500 font-pokemon">#{p.id.toString().padStart(3, '0')}</p>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
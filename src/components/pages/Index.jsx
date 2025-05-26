import React from 'react';
import  Pokedex  from '../hooks/Pokedex';
import  PokemonList  from '../hooks/PokemonList';

export const Index = () => {
  return (
    <div className="p-4">
      <Pokedex/>
      <PokemonList/>
    </div>
  );
};
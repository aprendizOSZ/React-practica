import React from 'react';

export const Header = () => {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold font-pokemon" >
          Pokédex
        </h1>
      </div>
    </header>
  );
};

export default Header;
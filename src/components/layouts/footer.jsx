import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p> {new Date().getFullYear()} Pokédex - Todos los derechos reservados a <span className="font-bold">Nintendo</span></p>
      </div>
    </footer>
  );
};

export default Footer;

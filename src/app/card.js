'use client'
import { getImageUrl } from './utils.js';
import React from "react";


export default function PokemonList({ pokemonsObject }) {
  return (
    <div>
      {pokemonsObject.map(pokemon => (
        <div className="card" key={pokemon.id}>
          <h2 className="name">{pokemon.id}</h2>
          <h2 className="name">{pokemon.name}</h2>
          <img
            src={getImageUrl(pokemon.id)}
            alt={pokemon.name}
            width={70}
            height={70}
          />
        </div>
      ))}
    </div>
  )
}


  

  
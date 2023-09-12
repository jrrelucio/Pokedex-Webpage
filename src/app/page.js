'use client'

import PokemonList from './card.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './style.css'

function addNewPokemon() {
  const udpatePokemons = [
    ...pokemons,
    {
      name: "charmander",
      id: '002'
    }
  ];
  setPokemonList(updatePokemons);
}
 


export default function Pokedex() {

  const [pokemonName, setPokemonName] = useState([])
  const [pokemonId, setPokemonId] = useState([1])
  const [pokemonsObject, setPokemonsObject] = useState([])
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
  const [pokemonsObjectUpdate, setPokemonsObjectUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemonRange, setPokemonRange] = useState(10)

  //After retrieving pokemon names and ids on the api, pokemonsObject is initialized to store pokemon names and id.
  function initializePokemon(pokemonName, pokemonId) {
    let count_pokemon = pokemonName.length
    let pokemonsObject = []
    for (let i = 0; i < count_pokemon; i++) {
      //handle cases where id < 100
      if (pokemonId[i][0] === 'n') {
        pokemonId[i] = "00" + pokemonId[i][2]
      }
      else if (pokemonId[i][0] === '/') {
        pokemonId[i] = "0" + pokemonId[i].slice(1,3)
      }
      
      let pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName[i]
      let arrTypes = []
      axios.get(pokemonURL).then(res => {
        let pokemonTypes = res.data.types
        
        for (let i = 0; i < pokemonTypes.length; i++) {
          let type = pokemonTypes[i]
          arrTypes.push(type.type.name)
        }
      })
      pokemonsObject.push({name: pokemonName[i], id: pokemonId[i], types: arrTypes})
    }
    setPokemonId(pokemonId)
    return pokemonsObject
  }
  
  useEffect(() => {
    setPokemonsObjectUpdate(true)
    setLoading(true)
    axios.get(currentPageUrl).then(res => {
      setLoading(false)
      setPokemonName(res.data.results.map(p => p.name))
      setPokemonId(res.data.results.map(p => p.url.slice(-4,-1)))
    }) //gets all pokemon list
    setPokemonsObject(initializePokemon(pokemonName, pokemonId))
  }, [loading]);

  function showMore() {
    setPokemonRange(pokemonRange+10)
    setPokemonsObjectUpdate(true)
    console.log("Clicked")
  }
  console.log(pokemonsObjectUpdate)
  console.log(pokemonRange)
  console.log(pokemonsObject)
  
  if (loading) {
    return (
      <h1 className="header">Loading...</h1>
    )
  }
  return (
    <div>
      <h1 className="header">Pokedex</h1>
      <input className="searchbar"
        type="text"
        placeholder="Search Pokemon Here"
      />
      <PokemonList 
      pokemonsObject = {pokemonsObject.slice(0,pokemonRange)} //change index to render next set of pokemons
      />
      <button className="showMore" onClick={showMore}>Show More</button>
    </div>
  );
}
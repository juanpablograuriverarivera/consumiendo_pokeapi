//Components
import Button from "./Components/Button";
import Card from "./Components/Card";
// Styles
import './sass/App.scss'
// Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
// Hooks
import { useState,useEffect } from "react";

const App = () =>{

  const [pokemonId, setPokemonId] = useState(1)
  const [pokemonevolutions, setpokemonevolutions] = useState([])

  useEffect(() =>{
    getEvolutions(pokemonId);
    })

  async function getEvolutions(id){

    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data =await response.json()



    let pokemonEvoArray = []

    let pokemonv1 = data.chain.species.name
    let pokemonv1Img = await getPokemonImgs(pokemonv1)
    pokemonEvoArray.push([pokemonv1,pokemonv1Img])

    if(data.chain.evolves_to.length !==0){
      let pokemonv2 = data.chain.evolves_to[0].species.name;
      let pokemonv2Img = await getPokemonImgs(pokemonv2)
      pokemonEvoArray.push([pokemonv2,pokemonv2Img])

      if(data.chain.evolves_to[0].evolves_to.length !==0){
        let pokemonv3 = data.chain.evolves_to[0].
        evolves_to[0].species.name;
      let pokemonv3Img = await getPokemonImgs(pokemonv3)
      pokemonEvoArray.push([pokemonv3,pokemonv3Img])
      setpokemonevolutions(pokemonEvoArray)
    }
  }

  async function getPokemonImgs(name){

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default;


  }




  return(
  <>

    <div className="card_container">

      {pokemonevolutions.map(pokemon =>
         <Card
         key={pokemon[0]}
         name={pokemon[0]}
         img={pokemon[1]}
         />
         )}

    </div>

  <div className="container_btn">
  <Button
  icon={<TiArrowLeftOutline />}
  manejaClick ={()=>{
    (pokemonId === 1)?
      setPokemonId(1):
      setPokemonId(pokemonId - 1)
  }}
   />


  <Button
  icon={<TiArrowRightOutline/>}
  manejaClick ={()=>{setPokemonId(pokemonId + 1)}}
  />
  </div>
  </>
)

}
}
export  default App


import pokemonApi from '../api/pokemonApi'

const getPokemonOptions = async() => {
    let arr = []
    while(arr.length < 4){
        let num = Math.floor(Math.random() * 651)
        if(!arr.includes(num)){
            arr.push(num)
        }
    }
    const pokemons = await getPokemonNames(arr)
    
    return pokemons
}

const getPokemonNames = async( [pokemon1,pokemon2,pokemon3,pokemon4] = [] ) => {

    const promiseArr = [
        pokemonApi.get(`/${ pokemon1 }`),
        pokemonApi.get(`/${ pokemon2 }`),
        pokemonApi.get(`/${ pokemon3 }`),
        pokemonApi.get(`/${ pokemon4 }`),
    ]


    const [ pokemon_1, pokemon_2, pokemon_3, pokemon_4 ] = await Promise.all( promiseArr )
    
    return [
        { name: pokemon_1.data.name, id: pokemon_1.data.id },
        { name: pokemon_2.data.name, id: pokemon_2.data.id },
        { name: pokemon_3.data.name, id: pokemon_3.data.id },
        { name: pokemon_4.data.name, id: pokemon_4.data.id },
    ]

}



export default getPokemonOptions




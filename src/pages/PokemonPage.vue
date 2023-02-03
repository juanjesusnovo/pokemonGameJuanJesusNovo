<template>
    <h1 v-if="!pokemon">Wait a second pls...</h1>
    <div v-else>
        <h1>Who's that Pokemon?</h1>
        <h1>Correct answers : {{ points }}</h1>
        <PokemonPicture 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon" 
        />

        <PokemonOptions 
            :pokemons="pokemonArr"
            @selection-pokemon="checkAnswer"
        />
        <h1>{{ lives }}</h1>
        <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newPokemon">
                New Game
            </button>
        </template>
    </div>
    
</template>

<script>
import PokemonOptions from "../components/PokemonOptions.vue"
import PokemonPicture from "../components/PokemonPicture.vue"

import getPokemonOptions from "../helpers/getPokemonOptions"


export default {
    components: { PokemonOptions, PokemonPicture },

    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            points: 0,
            lives: "❤❤❤",
            message: ""
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()
            this.pokemon = this.pokemonArr[ Math.floor( Math.random() * 4 ) ]
        },
        checkAnswer( selectedId ) {
            this.showPokemon = true
            this.showAnswer = true

            if( selectedId === this.pokemon.id ) {
                this.message = `Correct, the Pokemon is ${ this.pokemon.name }`
                this.points ++
            } else {
                this.message = `Wrong answer, the correct answer is ${ this.pokemon.name }`
                this.lives = this.lives.substring(1)
                if(this.lives.length === 0){
                    alert("You lose :C \n New Game Starting")
                    this.newGame()
                }
            }
        },
        newPokemon() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.mixPokemonArray()            
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.lives = "❤❤❤"
            this.mixPokemonArray()  
        }
    },
    mounted() {
        this.mixPokemonArray()
    }

}
</script>

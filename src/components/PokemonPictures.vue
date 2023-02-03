<template>
    <div class="pokemon-container">
        <img v-if="!showPokemon" :src="image" alt="pokemon" class="hidden-pokemon"/>
        <img v-else :src="image" alt="pokemon" class="fade-in" v-if="showPokemon"/>
    </div>
</template>

<script>
    export default {
        props: {
            pokemonId :{
                type: Number,
                required: true
            },
            showPokemon :{
                type: Boolean,
                required: true,
                default: false
            }
        },
        computed: {
            image(){
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
            }
        }
    }
</script>

<style>
.pokemon-container {
    height: 200px;
    position: relative;
}

img {
    height: 200px;
    position: absolute;
    left: 50%;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;

    transform: translateX(-50%);
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>
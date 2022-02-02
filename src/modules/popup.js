import { selector, selectorAll } from './tools.js';
import { appendCommentItem } from './create_listcomment';

export const popupInit = (connector) => {
  selectorAll('button[id^="comment-"], .popup-close').forEach((element) => {
    element.addEventListener('click', async (event) => {
      if (selector('.popup-modal').classList.contains('popup-hidden')) {
        const idPokemon = event.target.id.match(/\d+/g)[0];
        const pokemon = await connector.getPokemonFromId(idPokemon);
        selector('#pokemon_name').innerHTML = pokemon.name;
        selector('#pokemon_image').src = pokemon.url;
        selector('#pokemon_height').innerHTML = pokemon.height;
        selector('#pokemon_weight').innerHTML = pokemon.weight;
        selector('#idPokemon').value = idPokemon;

        const comments = await connector.getComments(idPokemon);
        if (comments.length > 0) {
          comments.forEach(appendCommentItem);
        } else {
          selector('.pokemon-comments').innerHTML = 'No comment yet.';
        }
      } else {
        selector('.pokemon-comments').innerHTML = '';
      }
      selector('.popup-modal').classList.toggle('popup-hidden');
    });
  });
};

export default popupInit;

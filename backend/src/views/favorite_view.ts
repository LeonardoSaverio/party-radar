import Favorite from '../models/Favorite';
export default {
  render(favorite: Favorite) {
    return {
      id: favorite.id,
      isFavorited: favorite.isFavorited,
      party_name: favorite.party.party_name,
      type_party: favorite.party.type_party,
    }
  },

  renderMany(favorites: Favorite[]) { 
    return favorites.map(favorite => this.render(favorite));
  }
}
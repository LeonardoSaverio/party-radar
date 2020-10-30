import Party from '../models/Party';

export default {
  renderMyParty(party: Party) {
    return {
      id: party.id,
      party_name: party.party_name,
      type_party: party.type_party,
    }
  },

  renderManyMyPartys(partys: Party[]) {
    return partys.map(party => this.renderMyParty(party))
  },
}
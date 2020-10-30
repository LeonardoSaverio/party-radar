import Party from '../models/Party';

export default {
  renderDetail(party: Party) {
    return {
      id: party.id,
      whatsapp: party.whatsapp,
      uf: party.uf,
      city: party.city,
      party_name: party.party_name,
      type_party: party.type_party,
      description: party.description,
      date_time: party.date_time,
    };
  },

  renderParty(party: Party) {
    return {
      id: party.id,
      party_name: party.party_name,
      latitude: party.latitude,
      longitude: party.longitude
    }
  },

  renderManyPartys(partys: Party[]) {
    return partys.map(party => this.renderParty(party))
  }
  
}
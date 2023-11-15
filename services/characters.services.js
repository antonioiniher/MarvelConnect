const axios = require('axios')

let timestamp = process.env.TIMESTAMP;
let apiKey = process.env.API_KEY;
let hashValue = process.env.HASHVALUE;

class MarvelService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://gateway.marvel.com:443/v1/public'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get(`/characters?limit=75&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }
    getCharacterByName(name) {
        return this.axiosApp.get(`/characters?nameStartsWith=${name}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

    getCharacterBySerie(serie) {
        return this.axiosApp.get(`/series?titleStartsWith=${serie}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

}




const marvelService = new MarvelService()

module.exports = marvelService
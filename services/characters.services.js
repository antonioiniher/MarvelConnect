const axios = require('axios')


class MarvelService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://gateway.marvel.com:443/v1/public',
            params: {
                apikey: process.env.API_KEY,
                ts: process.env.TIMESTAMP,
                hash: process.env.HASHVALUE
            }
        })
    }

    getAllCharacters() {
        return this.axiosApp.get(`/characters?limit=75`)
    }
    getCharacterByName(name) {
        return this.axiosApp.get(`/characters?nameStartsWith=${name}`)
    }

    getCharacterBySerie(serie) {
        return this.axiosApp.get(`/series?titleStartsWith=${serie}`)
    }

    getAllSeries() {
        return this.axiosApp.get(`/series?limit=75`)
    }
    getSeriesByName(name) {
        return this.axiosApp.get(`/series?titleStartsWith=${name}`)
    }

    getSeriesById(id) {
        return this.axiosApp.get(`/series/${id}`)
    }

    getAllComics() {
        return this.axiosApp.get(`/comics?limit=75`)
    }
    getComicsByName(name) {
        return this.axiosApp.get(`/comics?titleStartsWith=${name}`)
    }

}




const marvelService = new MarvelService()

module.exports = marvelService
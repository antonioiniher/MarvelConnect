const axios = require('axios')

let timestamp = process.env.TIMESTAMP;
let apiKey = process.env.API_KEY;
let hashValue = process.env.HASHVALUE;

class MarvelService {


    // TODO: DECIDIR SOBRE PARAMS
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://gateway.marvel.com:443/v1/public',
            // params: {
            //     apiKey: process.env.API_KEY,
            //     ts: process.env.TIMESTAMP,
            //     hash: process.env.HASHVALUE
            // }
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

    getAllSeries() {
        return this.axiosApp.get(`/series?limit=75&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }
    getSeriesByName(name) {
        return this.axiosApp.get(`/series?titleStartsWith=${name}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

    getSeriesById(id) {
        return this.axiosApp.get(`/series/${id}?&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

    getAllComics() {
        return this.axiosApp.get(`/comics?limit=75&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }
    getComicsByName(name) {
        return this.axiosApp.get(`/comics?titleStartsWith=${name}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

}




const marvelService = new MarvelService()

module.exports = marvelService
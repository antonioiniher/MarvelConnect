const axios = require('axios')

let timestamp = "1681802982683";
let apiKey = "365228bc85ed39b3f177f3c66a89e36a";
let hashValue = "d82d67528f926be55e17cc7bbaa06484";

class MarvelService {

    constructor() {
        this.axiosApp = axios.create({                              //porque un create?
            baseURL: 'https://gateway.marvel.com:443/v1/public'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get(`/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`)
    }

}



const marvelService = new MarvelService()

module.exports = marvelService
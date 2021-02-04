import { Dimensions } from "react-native"

export const API_KEY = "70aa31a1529fcca9641d65cbe997a1e2"
export const REQUEST_EXAMPLE = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&&page=1&language=en-US`
export const GENRE_REQUEST = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
export const TRENDING_REQUEST = `https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}&language=en-US`
export const LANGUAGES_REQUEST = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`
export const MAX_WIDTH = Dimensions.get("window").width
export const MAX_HEIGHT = Dimensions.get("screen").height
import { API_KEY } from "./constants";

export const Originals = `/discover/tv?api_key=${API_KEY}&with_networks=213`;
export const Trending =`/trending/all/week?api_key=${API_KEY}&language=en-US`;
export const Popular = `/movie/popular?api_key=${API_KEY}&language=en-US`;

export const Action =`/discover/movie?api_key=${API_KEY}&with_genres=28`;
export const Fantasy =`/discover/movie?api_key=${API_KEY}&with_genres=14`;
export const Adventure = `/discover/movie?api_key=${API_KEY}&with_genres=12`;
export const Animation = `/discover/movie?api_key=${API_KEY}&with_genres=16`;
export const Crime = `/discover/movie?api_key=${API_KEY}&with_genres=80`;
export const Drama = `/discover/movie?api_key=${API_KEY}&with_genres=18`;
export const Family = `/discover/movie?api_key=${API_KEY}&with_genres=10751`;
export const Science_fiction = `/discover/movie?api_key=${API_KEY}&with_genres=878`;
export const Mystery = `/discover/movie?api_key=${API_KEY}&with_genres=9648`;
export const Thriller = `/discover/movie?api_key=${API_KEY}&with_genres=53`;
export const Comedy = `/discover/movie?api_key=${API_KEY}&with_genres=35`;
export const Horror = `/discover/movie?api_key=${API_KEY}&with_genres=27`;
export const Romance = `/discover/movie?api_key=${API_KEY}&with_genres=10749`;

export const LocationDetails = `https://ipapi.co/json/`;


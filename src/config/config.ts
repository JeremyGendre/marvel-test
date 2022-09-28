//constantes de config, dont les clés qui se basent sur un fichier d'environnement
export const BASE_URL = `https://gateway.marvel.com`;
export const API_KEY = process.env.REACT_APP_API_KEY as string;
export const API_HASH = process.env.REACT_APP_HASH as string;
export const TIMESTAMP = 1;

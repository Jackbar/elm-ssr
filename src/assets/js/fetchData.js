import {paramToString, resolveFetch} from './utils';
import axios from 'axios'
let http = "https://mainsite-restapi.ele.me";


const getshoplist = (e) => {
  return axios.get(http + "/shopping/restaurants?" + paramToString(e))

  // return fetch(http + "/shopping/restaurants?" + paramToString(e)).then(resolveFetch)
  //  return fetch(http + "/shopping/restaurants?latitude=22.572909&longitude=113.86192&offset="+offset+"&limit=20&extras[]=activities&terminal=h5").then(resolveFetch)
}

export {getshoplist}

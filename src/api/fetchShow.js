import axios from "axios";

export async function fetchShow (){
  try{
  const data = await axios.get("https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes");
  return data
  }
  catch(err){
  console.log(err.message);
  }
}
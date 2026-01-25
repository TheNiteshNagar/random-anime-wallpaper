async function getAnime(){
  const randoCategory = getImagesCategories()
  const data = await fetch(`https://nekos.best/api/v2/${randoCategory}`)
  const response = await data.json()
  return response.results[0].url
}

function getImagesCategories(){
  const randomIndex = Math.floor(Math.random()*4)
  const images = ['husbando', 'kitsune', 'neko', 'waifu']
  return images[randomIndex]
}

document.querySelector('body').addEventListener('click', async ()=>{
  const animeURL = await getAnime()
  document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`
})


window.addEventListener('DOMContentLoaded', async () =>{
  const animeURL = await getAnime()
  document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`
})
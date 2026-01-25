// generate a random category
function getImagesCategories() {
  const randomIndex = Math.floor(Math.random() * 4)
  const images = ['husbando', 'kitsune', 'neko', 'waifu']
  return images[randomIndex]
}

// get a anime url
async function getAnime() {
  const randoCategory = getImagesCategories()
  const data = await fetch(`https://nekos.best/api/v2/${randoCategory}`)
  const response = await data.json()
  const animeURL = response.results[0].url
  return animeURL
}

// show anime image when dom content loaded
window.addEventListener('DOMContentLoaded', async () => {
  const animeURL = await getAnime()
  document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`
})

// get a new anime image user click on album element
document.querySelector('.album').addEventListener('click', async () => {
  const animeURL = await getAnime()
  document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`    
})

// get a new anime image user click on album next button
document.querySelector('.next-button').addEventListener('click', async () => {
  const animeURL = await getAnime()
  document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`    
})

// enter in full screen mode when click on full screen button
document.querySelector('.full-screen-button').addEventListener('click', ()=>{
  if(document.fullscreenElement){
    document.exitFullscreen()
  } else{
    document.body.requestFullscreen()
  }
})
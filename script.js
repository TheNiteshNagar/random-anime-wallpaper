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

// preload image to ensure it's downloaded 
async function preloadImage(url) {
  return new Promise((resolve, reject) =>{
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = reject
    img.src = url
  })
}

// store a next image url
let nextImageURL = null

// fetch and cache the next image dumb as$
async function fetchNextImage() {
  try {
    const url = await getAnime()    // wait for image to download
    await preloadImage(url)
    nextImageURL = url
  } catch (error) {
    console.log('Failed to prefetch image: ', error)
  }
}

// display image and start fetching the next one
async function displayImage(url) {
  document.querySelector('.anime-pic').style.backgroundImage = `url(${url})`
  fetchNextImage()    // start fetching next image in background
}

// show anime image when dom content loaded
window.addEventListener('DOMContentLoaded', async () => {
  const animeURL = await getAnime()
  await preloadImage(animeURL)    // preload first image
  displayImage(animeURL)
})

// get a uwu when user click on album element
document.querySelector('.album').addEventListener('click', async () => {
  const uwu = new Audio('./public/audio/uwu-sound.mp3')
  uwu.currentTime = 0
  uwu.play()  
})

// get a new anime image user click on album next button
document.querySelector('.next-button').addEventListener('click', async () => {
  if(nextImageURL) {
    displayImage(nextImageURL)
    nextImageURL = null    // clear cache
  } else {
    // fallback if prefetch hasn't completed
    const animeURL = await getAnime()
    await preloadImage(animeURL)
    displayImage(animeURL)
  }

  // old method - track your old mistakes 
  // const animeURL = await getAnime()
  // document.querySelector('.anime-pic').style.backgroundImage = `url(${animeURL})`    
})

// enter in full screen mode when click on full screen button
document.querySelector('.full-screen-button').addEventListener('click', ()=>{
  if(document.fullscreenElement){
    document.exitFullscreen()
  } else{
    document.body.requestFullscreen()
  }
})
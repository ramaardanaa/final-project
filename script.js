let cards = document.querySelectorAll('.card-inner')
let firstClick = false
let count = 0
let cardPair = []
let move = document.querySelector('#move').innerHTML
let score = document.querySelector('#score').innerHTML

function check() {
  if (count == 2) {
    if (cardPair[0].querySelector('img').src === cardPair[1].querySelector('img').src) {
      matched()
    } else {
      unmatched(cardPair[0], cardPair[1])
    }
  }
}

function nameAlias(){
  var username = document.getElementById("myusername").value;
  document.querySelector('#nama').innerHTML = `Hello ${username}!`
}


function matched() {
  cardPair[0].state = 'blocked'
  cardPair[1].state = 'blocked'
  count = 0
  cardPair = []

  score++
  document.querySelector('#score').innerHTML = score
  move++
  document.querySelector('#move').innerHTML = move
  if (score === 12) {
    clearInterval(time)
    document.querySelector('#menang').style.display = 'block'
  }
}

function unmatched(x, y) {
  setTimeout(() => {
    x.style.transform = 'rotateY(0deg)'
    y.style.transform = 'rotateY(0deg)'
  }, 750)
  cardPair[0].state = 'unclicked'
  cardPair[1].state = 'unclicked'
  move++
  document.querySelector('#move').innerHTML = move
  count = 0
  cardPair = []
}

function time() {
  let detik = 0
  let menit = 0
  let SS
  let MM

  time = setInterval(() => {
    detik++
    if (detik == 60) {
      detik = 0
      menit++
    }
    detik < 10 ? SS = `0${detik}` : SS = `${detik}`
    menit < 10 ? MM = `0${menit}` : MM = `${menit}`
    document.querySelector('#time').innerHTML = `${MM}:${SS}`
  }, 1000);
}

function shuffle() {
  let images = document.querySelectorAll("img")
  let srcs = ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg', './images/9.jpg', './images/10.jpg', './images/11.jpg', './images/12.jpg', './images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg', './images/9.jpg', './images/10.jpg', './images/11.jpg', './images/12.jpg']

  for (let i = srcs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = srcs[i]
    srcs[i] = srcs[j]
    srcs[j] = temp
  }

  for (let i = 0; i < images.length; i++) {
    images[i].src = srcs[i]
  }

}


cards.forEach((card) => {
  card.state = 'unclicked'
});

shuffle()

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    if (!firstClick) {
      time()
    }
    firstClick = true
    if (cards[i].state == 'unclicked') {
      cards[i].style.transform = 'rotateY(180deg)'
      cards[i].state = 'clicked'
      count++
      cardPair.push(cards[i])
      check()
    } else if (cards[i].state === 'clicked') {
      cards[i].style.transform = 'rotateY(0deg)'
      cards[i].state = 'unclicked'
      count--
      cardPair = []
    }
  })
}

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
  if (!username) {
    modal.classList.toggle("show-modal")
  }
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);




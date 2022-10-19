let coresDb = []
let artDb = []
let size = 5;
if (localStorage.getItem("boardSize")) {
  size = localStorage.getItem("boardSize");
}

const container = document.querySelector(".container");


const titulo = document.createElement("h1");
titulo.id = "title"
titulo.innerText = "Paleta de Cores"
container.appendChild(titulo)


const paletaCores = document.createElement("div");
paletaCores.id = "color-palette";
container.appendChild(paletaCores);

function createDiv() {
  for (let index = 0; index < 1; index += 1) {
    const createDiv = document.createElement("input");
    createDiv.type = "color"
    const color = document.getElementById("color-palette");
    createDiv.className = "color";
    color.appendChild(createDiv);
  }
}


function colorir () {
  const color = document.querySelectorAll(".color");
  color[0].style.backgroundColor = "black";
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = randomColor();
  }
}


const btnRandom = () => {
  const botao = document.createElement("button");
  botao.addEventListener("click", function (){
    coresDb = []
    colorir();
    const getPalet = document.getElementsByClassName("color");
    for (let index = 0; index < getPalet.length; index += 1) {
     coresDb.push(getPalet[index].style.backgroundColor);  
    }
    localStorage.setItem("colorPalette", JSON.stringify(coresDb)); 
  })
  botao.innerText = "Cores Aleatórias";
  botao.id = "button-random-color";
  botao.className = "btn";
  // container.appendChild(botao);
}



function addColorStorage () {
  if (localStorage.getItem("colorPalette")=== null) {
    colorir()
    const getPalet = document.getElementsByClassName("color");
    for (let index = 0; index < getPalet.length; index += 1) {
     coresDb.push(getPalet[index].style.backgroundColor);  
    }
    localStorage.setItem("colorPalette", JSON.stringify(coresDb)); 
  } else {
    const getPalet = document.getElementsByClassName("color");
    const callStorage = JSON.parse(localStorage.getItem("colorPalette"))
    for (let index = 0; index < getPalet.length; index += 1) {
      getPalet[index].style.backgroundColor = callStorage[index];
  }
}
    coresDb = []
}


function pixelBoard(size) {
  let boardPix = document.createElement ("div");
  boardPix.setAttribute ("id", "pixel-board");
  for (let index = 0; index < size * size; index += 1) {
    let pixels = document.createElement("div");
    pixels.style.border = "1px solid black";
    pixels.style.width = "40px";
    pixels.style.height = "40px";
    pixels.style.backgroundColor = "white";
    pixels.setAttribute ("class", "pixel");
    boardPix.appendChild (pixels);
    boardPix.style = `grid-template-columns: repeat(${size}, 40px)`;
    document.body.appendChild (boardPix);
    localStorage.setItem("boardSize", size);
  }
  }
  
  function getPixel () {
    const board = document.getElementById("color-palette");
    board.addEventListener("click", function(pix){
      const selected = document.querySelector(".selected")
      selected.classList.remove("selected")
      pix.target.classList.add("selected")
    })
  }
  
  function pixelPaint () {
    const getBoard = document.getElementById("pixel-board");
    getBoard.addEventListener("click", function(element){
      const getPalet = document.getElementsByClassName("pixel");
  element.target.style.backgroundColor = document.getElementsByClassName("selected")[0].value
      artDb = []
    for (let index = 0; index < getPalet.length; index += 1) {
     artDb.push(getPalet[index].style.backgroundColor);  
    }
    localStorage.setItem("pixelBoard", JSON.stringify(artDb));
})
}

function colorOne () {
  const colorBlack = document.getElementsByClassName("color")[0]
  colorBlack.classList.add("selected");    
  
}

const getBoardPixel = document.getElementById("clear-board");
getBoardPixel.addEventListener("click",btnRemove);


function btnRemove () {
  const getPixel = document.getElementsByClassName('pixel');
  for(let index = 0; index < getPixel.length; index += 1) {
    getPixel[index].style.backgroundColor = 'white';
  }
}


function colorArt () {
  const color = document.querySelectorAll(".pixel");
  for (let index = 0; index < color.length; index += 1) {
    color[index].style.backgroundColor = "white";
  }
}

function addColorArt () {
  if (localStorage.getItem("pixelBoard")=== null) {
    colorArt()
    const getArt = document.getElementsByClassName("pixel");
    for (let index = 0; index < getArt.length; index += 1) {
      artDb.push(getArt[index].style.backgroundColor);  
    }
    localStorage.setItem("pixelBoard", JSON.stringify(artDb)); 
  } else {
    const getArt = document.getElementsByClassName("pixel");
    const callStorage = JSON.parse(localStorage.getItem("pixelBoard"))
    for (let index = 0; index < getArt.length; index += 1) {
      getArt[index].style.backgroundColor = callStorage[index];
  }
}
  artDb = []
}

const creatButton = document.getElementById("generate-board");
creatButton.addEventListener("click", valor);
function valor() {
  const creatPixel = document.getElementById("board-size").value;
  console.log(creatPixel);
  if (creatPixel === "") {
    window.alert("Board inválido!")

  } else if(creatPixel < 5){
    size = 5;
    removeBoardPixel();
  } else if(creatPixel > 50){
    size = 50;
    removeBoardPixel();
  } else {
    size = creatPixel;
    removeBoardPixel();
  }
}

function removeBoardPixel() {
  const tutelar = document.getElementById("pixel-board");
  tutelar.outerHTML = "";
   
  pixelBoard(size)
  pixelPaint()
}

const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value/2) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});


var player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

var playpause = function () {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

playbtn.addEventListener("click", playpause);

player.onplay = function () {
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}

player.onpause = function () {
  playbtn.classList.add("fa-play");
  playbtn.classList.remove("fa-pause");
}

player.ontimeupdate = function () {
  let ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  //progress
  let duration = player.duration;
  prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
}

function timeFormat(ct) {
  minutes = Math.floor(ct / 60);
  seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0"+seconds;
  }

  return minutes + ":" + seconds;
}






// Call Functions


  createDiv()

  btnRandom()
  
  addColorStorage()
  
  pixelBoard(size)
    
  getPixel()
    
  pixelPaint()
    
  colorOne()
    
  btnRemove()

  addColorArt()
  

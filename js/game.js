
//Friend Image

var fReady = false;

var santa = new Image();
var gift = new Image();
var cart =  new Image();
var gameOver =  new Image();
var giftGone = false;
var giftCaught = false;
var giftCollected = 0;
var giftLost = 0;
var canvas = document.getElementById("myCanvas");
var x = document.getElementById("myAudio");


function playAudio() {
  x.play();
}



santa.onload = function(){
      fReady = true;
}
santa.src="./img/santa-clause.svg";
gift.src ="./img/gift.png";
cart.src ="./img/cart.png";
gameOver.src ="./img/gameOver.gif"

var then = 0;
//Game objects
var santaObj = {
     speed:50,
     x:100,
     y:10
};
var giftObj = {
    speed:80,
    x:200,
    y:150
};
var cartObj = {
    speed:200,
    x:200,
    y:600
};

var keysDown = {};
addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true;
    e.preventDefault();
}, false);
addEventListener("keyup", function(e){
        delete keysDown[e.keyCode];
         e.preventDefault();
}, false);


function moveCart(modifier){
    if(37 in keysDown && cartObj.x > 0){
        cartObj.x -= cartObj.speed * modifier;
    }
    if(39 in keysDown && cartObj.x+200 < canvas.width){
        cartObj.x += cartObj.speed * modifier;
    }
}

function resetGiftObj(){
    giftObj.y = 150
    giftObj.x = Math.floor((Math.random() * 800) + 50);
    santaObj.x = giftObj.x - 50;
}
function moveGift(){
    var dy = 2
   // console.log(giftObj , cartObj)
    if(giftObj.y + dy > canvas.height-100) {
        resetGiftObj();
        giftLost ++;
    }
    if(giftObj.x >= cartObj.x && giftObj.x < cartObj.x+100 && giftObj.y >= cartObj.y && giftObj.y < cartObj.y + 50){
        giftCaught = true;
        giftCollected ++;
        playAudio();
        resetGiftObj();
        console.log("gift caught", giftCollected);
    }
    giftObj.y  += dy;

}

function drawScoreBoard(ctx){
      ctx.font = "30px Comic Sans MS";
      ctx.fillStyle = "red";
      //ctx.textAlign = "center";
      ctx.fillText("Gift Caught "+ giftCollected, (canvas.width-200), 40);
      ctx.fillText("Gift Lost "+ giftLost, (canvas.width-205), 90);
}


function drawSanta(c){
    if(fReady == true){
        c.drawImage(santa,santaObj.x,santaObj.y,150,150);
    }
}
function drawGift(c) {
    if(fReady == true && !giftGone){
        c.drawImage(gift,giftObj.x,giftObj.y,50,50);
    }
}

function drawCart(c) {
    if(fReady == true){
        c.drawImage(cart,cartObj.x,cartObj.y,200,200);
    }
}

function drawGameOver(ctx) {
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game  Over", (canvas.width)/2, (canvas.height)/2);
}

function setImage(){
    var ctx = canvas.getContext("2d");
    var now = Date.now();
    var delta = now-then;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScoreBoard(ctx);
    if(giftLost < 3){
        drawSanta(ctx);
        drawGift(ctx);
        drawCart(ctx);
        //drawScoreBoard(ctx);
        moveCart(delta/1000);
        moveGift();
    }else{
        drawGameOver(ctx);
    }
    then = now;
    requestAnimationFrame(setImage);

}
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function start(){
    console.log('starting');
    then = Date.now();
    setImage();
}

start();
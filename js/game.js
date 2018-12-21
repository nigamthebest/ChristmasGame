
//Friend Image
var fReady = false; 
var santa = new Image();
var gift = new Image();
var cart =  new Image();
var giftGone = false;
var giftCollected = 0;
var canvas = document.getElementById("myCanvas");
santa.onload = function(){
      fReady = true;
}
santa.src="./img/santa-clause.svg";
gift.src ="./img/gift.png";
cart.src ="./img/cart.png";
var then = 0;
//Game objects
var santaObj = {
     speed:100,
     x:100,
     y:10
};
var giftObj = {
    speed:100,
    x:200,
    y:150
};
var cartObj = {
    speed:100,
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

function moveGift(){
    var dy = 2
   // console.log(giftObj , cartObj)
    if(giftObj.y + dy > canvas.height-100) {
        giftGone = true;
    }
    if(giftObj.x == cartObj.x && giftObj.y == cartObj.y){
        giftGone = true;
      
    }
    
    if(!giftGone){
        giftObj.y  += dy;
    }
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


function setImage(){    
    var ctx = canvas.getContext("2d");
    var now = Date.now();
    var delta = now-then;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSanta(ctx);
    drawGift(ctx);
    drawCart(ctx);
    moveCart(delta/1000);
    moveGift();
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
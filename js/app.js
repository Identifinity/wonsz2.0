let ctx, cW, cH;
const size = 20, inv = 200;
let points = 0;
let snake, fruit;
let state = 0; //0 - menu 1 - game 2 - restart menu
let alpha = 0;

//texts

function init(){
  ctx = $("canvas").get(0).getContext('2d');
  cW = $("canvas").width();
  cH = $("canvas").height();

  fruit = new Fruit();
  snake = new Snake(16,16);

	draw();
	setInterval(update, inv);
  setInterval(draw, 16);
}

function update(){
	if(state == 1)
  	snake.update();
}

function draw(){
  //delete current canvas
  ctx.fillStyle = "dimgray";
  ctx.fillRect(0,0,cW,cH);

	//main menu
	if(state == 0){
		ctx.fillStyle = "red";
		ctx.font = "bold 100px Lato";
		ctx.fillText("Wonsz 2.0", 125,200);
	}
	//restart menu
	if(state == 2){
		ctx.fillStyle = "red";
		ctx.font = "bold 100px Lato";
		ctx.fillText("Game Over!", 90,200);
		ctx.fillStyle = "yellow";
		ctx.font = "60px Lato";
		ctx.fillText("Punkty: " + points, 225,300);
	}
	//game on
	if(state == 1){
		//create grid
		ctx.globalAlpha = alpha;
		ctx.strokeStyle = `rgb(140,140,140)`;
		ctx.lineWidth = 1;
		for(let row = 0; row < 35; row++){
			for(let col = 0; col < 35; col++){
				ctx.strokeRect(row*size, col*size, size, size);
			}
		}

		fruit.render(ctx);
		snake.render(ctx);
	}
}

//Event handlers

$("canvas").ready(() => {
  init();
});

$(document).on('keydown', (e) => {
  //38 up, 40 down, 39 right, 37 left
	if(state != 1)
		return;

  switch (e.which) {
    case 37:
      snake.setDirection(-1,0);
      break;
    case 38:
      snake.setDirection(0,-1);
      break;
    case 39:
      snake.setDirection(1,0);
      break;
    case 40:
      snake.setDirection(0,1);
      break;
    default:
      break;
  }
});

function restart(){
	snake.setDirection(0,0);
	snake.x = 16;
	snake.y = 16;
	snake.tail.length = 0;

	state = 2;
	alpha = 0;

	$(".op:nth-child(n+2)").hide();
	$("body > div").fadeIn(600);
}

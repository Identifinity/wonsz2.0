//PowerUp
class PowerUp {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.lifeTIme = setTimeout(this.evaporate, 1000);
  }

  evaporate() {
    console.log("Evaporated");
  }
}

//Fruit
class Fruit {
  constructor(x = Math.floor(Math.random() * 35), y = Math.floor(Math.random() * 35)){
    this.x = x;
    this.y = y;
  }

  render(ctx){
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 2, size - 2);
  }
}

//Snake
class Snake {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.tail = [];

    this.vx = 0;
    this.vy = 0;
  }

  update(){
    let lastX = this.x;
    let lastY = this.y;

    this.x += this.vx;
    this.y += this.vy;

		for(let i = this.tail.length - 1; i >= 0; i--){
			if(this.tail[i].x == this.x && this.tail[i].y == this.y){
				restart();
			}
		}

    for(let i = this.tail.length - 1; i >= 0; i--){
        if(i >= 1){
					this.tail[i].x = this.tail[i-1].x;
					this.tail[i].y = this.tail[i-1].y;
				}
				else {
					this.tail[i].x = lastX;
					this.tail[i].y = lastY;
				}
    }

    if(this.x == fruit.x && this.y == fruit.y){
      points += 10;

      fruit = new Fruit();
      this.addTail();
    }
  }

  render(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 2, size - 2);

    ctx.fillStyle = "green";
    for(let t = 0; t < this.tail.length; t++){
      ctx.fillRect(this.tail[t].x * size + 1, this.tail[t].y * size + 1, size - 2, size - 2);
    }
  }

  setDirection(x, y){
    this.vx = x;
    this.vy = y;
  }

  addTail(){
    //dla dalszych segmentow, bo i tak będą nadpisywane
    if(this.tail.length > 0){
      this.tail.push({x: undefined, y: undefined});
      return;
    }

    //dla 1 segmentu, żeby wiedzieć po ktorej stronie ma się znaleźć
    if(this.vx > 0)
      this.tail.push({
        x: this.x - (this.tail.length + 1),
        y: this.y
      });

    if(this.vx < 0)
      this.tail.push({
        x: this.x + (this.tail.length + 1),
        y: this.y
      });

    if(this.vy > 0)
      this.tail.push({
        x: this.x,
        y: this.y - (this.tail.length + 1)
      });

    if(this.vy < 0)
      this.tail.push({
        x: this.x,
        y: this.y + (this.tail.length + 1)
      });
  }
}

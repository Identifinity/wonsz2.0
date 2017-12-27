let powerups = [];

//PowerUp
class PowerUp {
  constructor(x = Math.floor(Math.random() * 35), y = Math.floor(Math.random() * 35)){
    this.x = x;
    this.y = y;
		this.alpha = 1;

		this.timeLeft = Math.floor(Math.random() * (30-15) + 15);

    this.lifeTime = setInterval(() => {
			this.timeLeft -= 1;

			if(this.timeLeft <= 0){
				let i = setInterval(() => {
					this.alpha -= 0.02;
					if(this.alpha <= 0){
						powerups.splice(powerups.indexOf(this), 1);
						clearInterval(i);
					}
				}, 1);

				clearInterval(this.lifeTime);
			}
		}, 1000);

		powerups.push(this);
  }

	render(ctx){
		ctx.globalAlpha = this.alpha;

    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 2, size - 2);

		ctx.font = "11px Lato";
		ctx.fillStyle = "black";
		let posX = this.x*size + (size - ctx.measureText(this.timeLeft).width)/2;
		ctx.fillText(this.timeLeft, posX, this.y * size + 14);

		ctx.globalAlpha = 1;
  }

	evaporate(){
		powerups.splice(powerups.indexOf(this), 1);
		clearInterval(this.lifeTime);
	}

	addPower(snake){
		let r = Math.random();

		if(r < 0.95){
			snake.tail.length = Math.floor(snake.tail.length/2);
			return "-1/2 ogona!";
		} else {
			new PowerUp();
			new PowerUp();
			return "PowerUpy!";
		}
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

		this.text = "";
  }

  update(){
		//zapis do shiftu ogonu
    let lastX = this.x;
    let lastY = this.y;

		//ruch
    this.x += this.vx;
    this.y += this.vy;

		//kolizja z ogonem
		for(let i = this.tail.length - 1; i >= 0; i--){
			if(this.tail[i].x == this.x && this.tail[i].y == this.y){
				restart();
			}
		}

		//kolizja z punktem
    if(this.x == fruit.x && this.y == fruit.y){
      points += 10;

      fruit = new Fruit();
      this.addTail();
    }

		//kolizja z powerupem
		for(let p = 0; p < powerups.length; p++){
			if(this.x == powerups[p].x && this.y == powerups[p].y){
				this.text = powerups[p].addPower(this); //nazwa powera w return addPower()
				powerups[p].evaporate();

				setTimeout(() => { this.text = ""; }, 2000);
			}
		}

		//shiftowanie ogona
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
  }

  render(ctx){
		//głowa wonsza
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 2, size - 2);

		//ogon wonsza
    ctx.fillStyle = "green";
    for(let t = 0; t < this.tail.length; t++){
      ctx.fillRect(this.tail[t].x * size + 1, this.tail[t].y * size + 1, size - 2, size - 2);
    }

		//tekst nad głową wonsza
		ctx.fillStyle = "white";
		ctx.font = "20px Lato";
		ctx.fillText(
			this.text,
			this.x*size + (size - ctx.measureText(this.text).width)/2,
			this.y*size - 5);
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

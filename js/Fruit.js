function Fruit(x = Math.floor(Math.random() * 35), y = Math.floor(Math.random() * 35)){
  this.x = x;
  this.y = y;
  this.iksde = 1;
};

Fruit.prototype.render = function(ctx) {
  ctx.fillStyle = "cyan";
  ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 2, size - 2);
};

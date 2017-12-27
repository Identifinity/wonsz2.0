$(document).ready(() => {
	
});


$(".op:nth-child(1)").click(() => {
	//fade menu
	$("#menu").fadeOut(600);
	//zmiana stanu gry na aktywny
	state = 1;
	//włączenie rekursywnego generatora powerupow
	generatePowerups();
	//test - SKASOWAĆ
	//new PowerUp(15,15);
	snake.setDirection(0,1);

	//globalny 'fadeIn' dla planszy gry
	let i = setInterval(() => {
		alpha += 0.02
		if(alpha >= 1)
			clearInterval(i);
	}, 1);
});

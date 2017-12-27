$(".op:nth-child(1)").click(() => {
	$("body > div").fadeOut(600);

	state = 1;
	let i = setInterval(() => {
		alpha += 0.02
		if(alpha >= 1)
			clearInterval(i);
	}, 1);
});

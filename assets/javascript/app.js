// Variables
var game = [
	{question: "What school did Harry Potter attend?",
	answer: "Hogwarts",
	firstInc: "Durmstrang",
	secondInc: "Malory Towers",
	thirdInc: "Hailsham",
	correct: "",
	incorrect: ""},

	{question: "What is Harry Potter profession?",
	answer: "Wizard",
	firstInc: "Carpenter",
	secondInc: "Writer",
	thirdInc: "Waiter",
	correct: "",
	incorrect: ""},

	{question: "What kind of weapon does Harry Potter uses?",
	answer: "Wand",
	firstInc: "Staff",
	secondInc: "Knife",
	thirdInc: "Pheonix Talon",
	correct: "",
	incorrect: ""},

	{question: "What did Harry Potter lose when he was a kid?",
	answer: "His Parents",
	firstInc: "Pokemon Cards",
	secondInc: "Blue Eyes White Dragon",
	thirdInc: "Sorting Hat",
	correct: "",
	incorrect: ""},

	 
];

var choices = ["answer", "firstInc", "secondInc", "thirdInc"]; // stores choiceserties  for game object

var numCor = 0;
var numInc = 0;
var numNone = 0;

var timeLeft = 60;
var counter;

// Functions
function displayTrivia() { // displays trivia page with timer, questions, answers, & done button
	$("#game").empty(); // clears out start button
	$("#game").html('<div id="time"><h2>Time Left: ' + timeLeft + ' seconds</h2></div><div id="questions"></div>');

	for(i=0; i < game.length; i++){
		$("#questions").append('<div id="ask">' + game[i].question + "</div>"); // adds question

		randomSort();

		for(j=0; j < choices.length; j++){ // loops however many answers there are
			var choicesType = choices[j]; // stores value from choices[]
			var choicesVal = game[i][choicesType]; // stores value from game array/object

			if (choicesType.toString() === "answer"){ // if it's the answer, give it an id of "answer"
				var value = $('<div class="radio"><input id="answer" type="radio" name="' + i + '"><label for="answer">' + choicesVal + "</label></div>")
			}
			else { // incorrect choices get an id of "incorrect"
				var value = $('<div class="radio"><input id="incorrect" type="radio" name="' + i + '"><label for="answer">' + choicesVal + "</label></div>")
			}

			$("#questions").append(value)
		} //end for-loop
	} //end for-loop

	$("#game").append("<button id='donebtn'>Done!</button>");
	selection();

} //end function

function randomSort() { // randomizes answer order 
	choices.sort(function(a, b){return 0.5 - Math.random()});
}

function start() {
	$("#startbtn").on("click", function() {
	displayTrivia();
	startTimer();
	})
}

function startTimer() {
	counter = setInterval(decreaseTime, 1000);
}

function decreaseTime() {
	$("#time").html("<h2>Time Left: " + timeLeft + " seconds</h2>");
	timeLeft--;
	if (timeLeft === 0) {
		done();
	}
}

function selection(){
	$("input:radio").on("click", function() {

		var clicked = $(this).attr("id");
		var position = $(this).attr("name");


		if(clicked === "answer"){
			game[position].incorrect = "";
			game[position].correct = "yes";
		}
		else if(clicked === "incorrect"){
			game[position].correct = "";
			game[position].incorrect = "yes";
		}
	})

	$("#donebtn").on("click", function() {
		done();
	})

}

function done() {
	for(i=0; i < game.length; i++){
		if(game[i].correct === "yes"){
			numCor++;
		}
		else if(game[i].incorrect === "yes"){
			numInc++;
		}
		else if($("input:radio[name=" + i + "]:checked").length === 0){
			numNone++;
		}
	}

	$("#game").empty()
	.html("<h2>All done!</h2><br><p>Correct: " + numCor + "</p><br><p>Incorrect: " + numInc + "</p>" + "</p><br><p>Unanswered: " + numNone + "</p>");
}




// Code to execute
start();


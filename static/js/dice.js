
var turn = "";
var playerScoreArray = [];
var opponentScoreArray = [];
var playerScore = 0;
var opponentScore = 0;
var oppTurnCounter = 0;
var round = 0;


function newGame() {
	// hide contents of gameInfo div
	$("#gameInfo").hide();

	// populate with proper game controls
	resetScoreTable();
	$("#scoreTable").show();

	// show play buttons, etc
	$("#playButtons").show();
	$("#endRoundButton").show();
	$("#rollDiceButton").show();
	$("#statusText").html("Your turn!");
	$("#diceDisplay").html("");

	turn = "player";
	playerScoreArray = [0, 0, 0];
	opponentScoreArray = [0, 0, 0];
	playerScore = 0;
	opponentScore = 0;
	round = 0;

}

// Only utilzing a single roll currently, even though
// roll dice function allows for multiple dice
function rollSuccess(rolls) {
	// retrieve word representation of number
	numString = numToString(rolls[0]);
	// display image for appropriate dice roll
	$("#diceDisplay").append(buildHTML("img", {
		src: "/static/images/" + numString + ".png",
		width: "50"
	}));

	if (turn == "player") {
		// if player rolled a one, end round and award 0 points for the round
		if (numString == "one") {
			playerScore = 0;
			$("#statusText").html("Bust! You rolled a one, and receive 0 points for this round.<br>Current round: "
				+ (round + 1).toString() + "<br>Round score: " + playerScore);
			$("#rollDiceButton").hide();
		}
		// otherwise, increment player score for this round
		else {
			playerScore += parseInt(rolls[0], 10);
			$("#statusText").html("You rolled a " + numString + ".<br>Current round: "
				+ (round + 1).toString() + "<br>Round score: " + playerScore);
		}
	}
	else {
		// if opponent rolled a one, end round and award 0 points for the round
		if (numString == "one") {
			opponentScore = 0;
			$("#statusText").html("Bust! Opponent rolled a one, they receive 0 points for this round.<br>Current round: "
				+ (round + 1).toString() + "<br>Round score: " + opponentScore);
			$("#endRoundButton").show();
		}
		// otherwise, increment opponent score and turn counter for this round
		else {
			oppTurnCounter += 1;
			opponentScore += parseInt(rolls[0], 10);
			$("#statusText").html("Opponent rolled a " + numString + ".<br>Current round: "
				+ (round + 1).toString() + "<br>Round score: " + opponentScore);

			// opponent AI logic - super simple for now
			if (opponentScore > 15) {
				setTimeout(function(){endRound()}, 2000);
			}
			else if (oppTurnCounter > 3 && opponentScore > 10) {
				setTimeout(function(){endRound()}, 2000);
			}
			else {
				setTimeout(function(){rollDice(1)}, 1000);
			}
			// ----------------------------------------
		}
	}
}

function endRound() {
	// opponent ended the round...
	if (turn != "player") {
		$("#diceDisplay").html("");
		turn = "player";
		opponentScoreArray[round] = opponentScore;
		updateScoreTable();
		opponentScore = 0;
		if (round == 2) {
			endGame();
		}
		else {
			round += 1;
			$("#rollDiceButton").show();
			$("#endRoundButton").show();
			$("#statusText").html("Your turn!<br>Current round: " + (round + 1).toString() + "<br>Round score: 0");
		}
	}
	// player ended the round...
	else {
		$("#diceDisplay").html("");
		turn = "opp";
		playerScoreArray[round] = playerScore;
		updateScoreTable();
		playerScore = 0;
		$("#endRoundButton").hide();
		$("#rollDiceButton").hide();
		$("#statusText").html("Opponent's turn!<br>Current round: " + (round + 1).toString() + "<br>Round score: 0");
		rollDice(1);
	}
}

function endGame() {
	$("#diceDisplay").html("");
	$("#endRoundButton").hide();
	if (parseInt($("#p1tot").html(), 10) > parseInt($("#p2tot").html(), 10)) {
		$("#statusText").html("Congrats, you won! Press new game button to play again.");
	}
	else if (parseInt($("#p1tot").html(), 10) < parseInt($("#p2tot").html(), 10)) {
		$("#statusText").html("You lost! Press new game button to play again.");
	}
	else {
		$("#statusText").html("It's a tie! Press new game button to play again.");
	}
}

// update the scoring table values
function updateScoreTable() {
	$("#r1p1").html(playerScoreArray[0].toString());
	$("#r1p2").html(opponentScoreArray[0].toString());
	$("#r2p1").html(playerScoreArray[1].toString());
	$("#r2p2").html(opponentScoreArray[1].toString());
	$("#r3p1").html(playerScoreArray[2].toString());
	$("#r3p2").html(opponentScoreArray[2].toString());
	$("#p1tot").html(sumScore(playerScoreArray).toString());
	$("#p2tot").html(sumScore(opponentScoreArray).toString());
}

// sum the values of an array (i.e. score array)
function sumScore(arr) {
	score = 0
	for (i = 0; i < arr.length; i++) {
		score += arr[i];
	}
	return score;
}

function resetScoreTable() {
	$("#r1p1").html("0");
	$("#r1p2").html("0");
	$("#r2p1").html("0");
	$("#r2p2").html("0");
	$("#r3p1").html("0");
	$("#r3p2").html("0");
	$("#p1tot").html("0");
	$("#p2tot").html("0");
}

// calls dice roll api for a given number of dice and 
// returns an array of the results
function rollDice(numDice) {
	$.ajax({
		type: "GET",
		url: '/api/v1/dice_roll/' + numDice.toString(),
		success: function(data, status) { rollSuccess(data["rolls"]); },
		error: function(data, status) {}
	});
}

// takes in an integer (or string representation of an int)
// and returns a string representing that integer as a word
function numToString(num) {
	numString = "";
	switch (parseInt(num, 10)) {
		case 1:
			numString = "one";
			break;
		case 2:
			numString = "two";
			break;
		case 3:
			numString = "three";
			break;
		case 4:
			numString = "four";
			break;
		case 5:
			numString = "five";
			break;
		case 6:
			numString = "six";
			break;
	};
	console.log("String representation of number:");
	console.log(numString);
	return numString;
}

window.onload = function() {
	// change html --> console.log($("#r1p1").html("0"));
	// retrieve html --> console.log($("#r1p1").html());
	$("#scoreTable").hide();
	$("#playButtons").hide();
}


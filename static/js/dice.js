
var turn = "";
var playerScoreArray = [];
var opponentScoreArray = [];
var playerScore = 0
var opponentScore = 0
var round = 0;


function newGame() {
	// hide contents of gameInfo div
	$("#gameInfo").hide();

	// populate with proper game controls
	resetScoreTable();
	$("#scoreTable").show();

	// show play buttons
	$("#playButtons").show();

	turn = "player";
	playerScoreArray = [0, 0, 0];
	opponentScoreArray = [0, 0, 0];
	playerScore = 0;
	opponentScore = 0;
	round = 1;
}

function rollSuccess(rolls) {
	if (turn == "player") {
		for (i = 0; i < rolls.length; i++) {

		}
	}
	else {

	}
}

function endRound() {
	// opponent ended last round...
	if (round == 3 && turn != "player") {
		endGame();
	}
	// player ended the round...
	else if (turn == "player") {
		turn = "";
		$("#playButtons").hide();
	}
	// opponent ended the round...
	else {
		turn = "player";
		round += 1;
	}
}

function endGame() {

	$("#statusText").html("Game Over! Play Again?")
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
		success: function(data, status) { rollSuccess(data); },
		error: function(data, status) {}
	});
}

window.onload = function() {
	// change html --> console.log($("#r1p1").html("0"));
	// retrieve html --> console.log($("#r1p1").html());
	$("#scoreTable").hide();
	$("#playButtons").hide();
}


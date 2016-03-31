$(document).ready(function(){
// Generate the Winning Number when page opens
	var randomNum
	var playersNum

	function GenerateNum() {
		return Math.floor(Math.random() * (100) + 1);
	};
	
	randomNum = GenerateNum();

//add counter and set to zero


// Fetch the Players Guess	
//check that the user entered a number
	function playersGuessSubmission(){
		playersNum = $("input").val();
	//	debugger;
// Check if the Player's Guess is the winning number 
	if(playersNum===randomNum){
		//add winning message and select new randomNum
	} 
// Determine if the next guess should be a lower or higher number
	else if(playersNum>randomNum){
		//add message to guess lower
		//increase counter
	} else{
		//add message to guess higher
		//increase counter
		}
	}
// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again
function playAgain(){
	// add code here
}
//Event handlers
$("#guess").on("click", "button", playersGuessSubmission)


});
$(document).ready(function(){

	var winningNumber
	var playersGuess
	var guessArray=[];

	function generateWinningNumber() {  //Generate the Winning Number when page opens
		return Math.floor(Math.random() * (100) + 1);
	}	
	winningNumber = generateWinningNumber();

	function guessSubmissionStart(){ //Fetches the Players Guess and checks that the Player entered a value
		playersGuess = +$("#userGuess").val();

		if(playersGuess === 0){ alert("Please input a number in the input field.");
		} else if(playersGuess>100 || playersGuess<1){			
			$("#userGuess").val('');  	
			alert("Please input a number between 1 and 100")
	} else{
			$('#feedback').css({'display':'block'});
			playersGuessSubmission();
		}
	}
	function playersGuessSubmission(){ //updates the array and clears out guess once submitted
		if(guessArray.indexOf(playersGuess) == -1 || guessArray.length==0){ //checking if guess is a duplicate
			guessArray.push(playersGuess);
			$("#userGuess").val('');  	
			checkGuess();			
		} else{
			$('#feedback').text("You have already guessed that number, try again.");
		}
	}
	function checkGuess(){  //Check if the Player's Guess is the winning number 
		if(playersGuess===winningNumber){  // Check if winning number guessed
			//***need to make this more obvious
			$('#end_win').css({'display':'block'});
			$('#feedback').text("YOU GUESSED CORRECTLY, CONGRATS!!!!!  Click New Session to play again");
		} else if(guessArray.length>=5){  //if out of guesses
			//***do something sad?
			$('#end_lose').css({'display':'block'});
			$('#feedback').text("Sorry, that was your last guess, click New Session to play again");
		} else{  //If not winning number and have guesses remaining
			guessMessage();
		}
	}
function guessMessage(){
	var messageStr = lowerOrHigher();
	var directionStr = messageStr[0];
	var distanceStr = messageStr[1];	
	$('#feedback').text("You are "+ distanceStr +". Try guessing "+ directionStr +" this time. "+ (5 - guessArray.length) +" guess(es) left");
}
function lowerOrHigher(){  // Determine if the next guess should be a lower or higher number
	((playersGuess>winningNumber) ? str1 = "lower" : str1 = "higher"); //Determines if too high or too low
	//Determines if hot or cold
	((Math.abs(playersGuess - winningNumber) <= 10) ? str2 = "hot (within 10 of the winning number)" : str2 = "cold (futher than 10 from the winning number)");
	return [str1, str2];
}
function provideHint(){ // Create a provide hint button that provides additional clues to the "Player"
	var hintExcludes = guessArray.slice(0); 
	hintExcludes.push(winningNumber);  //Array of numbers to not choose for hint (those already guessed and the winning num)		
	var hintArray = [winningNumber]; //starting hint Array with winning number
	for(var i = 1; i < 3; i++){  	//Loop to produce two hint numbers
		hintArray[i] = hintGenerator(); 
		hintExcludes.push(hintArray[i]); //push hint number to exclude array to ensure it doesn't get picked again
	}
	var hintString = hintArray.sort(function(a, b){return a-b}).join(", "); //Sorting hint arrray and return string
	$('#feedback').text("The winning number is one of these numbers: " + hintString);
	
	function hintGenerator(){ //generates random number (will rerun if the winning number, any previous guess or other random number is picked)
		var check = 0;
		while(check != -1){
			num = Math.floor(Math.random() * (100) + 1);
			check = hintExcludes.indexOf(num); //if generated number is found in the exclude array, generate new number
		}
		return num;
	}
}
function playAgain(){ // Allow the "Player" to Play Again
	generateWinningNumber;
	guessArray=[];
	$('#feedback').text("");
	//updated
	$('#feedback').css({'display':'none'});
	$('#end_win').css({'display':'none'});
	$('#end_lose').css({'display':'none'});
}

//Event handlers
	$(".guessSection").on("click", "button", guessSubmissionStart)  //Submit Guess click handler
	
	$(document).keypress(function(e) {  //Enter handler - submits guess
	    if(e.which == 13) {
			guessSubmissionStart();
	    }
	});

	$(".again").on("click", "button", playAgain)  //Hint button handler
	
	$(".hint").on("click", "button", provideHint) //Play again handler
	
});

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevSum;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		// Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		// Display the result
		document.getElementById('dice-1').style.display = 'block';
	  document.getElementById('dice-2').style.display = 'block';

		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


		// Update the round score IF the rolled number is NOT one

		activePlayer === 0 ? document.querySelector('#info-1').textContent = 'Get ready!' : document.querySelector('#info-0').textContent = 'Get ready!';

		if (dice1 === 6 && dice2 === 6) {
			document.querySelector('#info-' + activePlayer).textContent = 'Double \'six\'!';
			// Next player
			nextPlayer();
		} else if (dice1 === 1 || dice2 === 1) {
			document.querySelector('#info-' + activePlayer).textContent = '\'One\' - Sorry!';
			// Next player
			nextPlayer();
		} else {
			// Add score
			var sum = dice1 + dice2;
			roundScore += sum;

			if (prevSum === sum) {
				document.querySelector('#info-' + activePlayer).textContent = sum +' points again!';
				nextPlayer();
			} else {
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				document.querySelector('#info-' + activePlayer).textContent = 'Roll again!';
				prevSum = sum;
			}
		}		
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		scores[activePlayer] >= 90 ? document.querySelector('#info-' + activePlayer).textContent = 'Almost there!' : document.querySelector('#info-' + activePlayer).textContent = 'Wait!';

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			activePlayer === 0 ? document.querySelector('#info-1').textContent = 'Next time!' : document.querySelector('#info-0').textContent = 'Next time!';
			document.querySelector('#info-' + activePlayer).textContent = 'Congrats!!!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		prevSum = 0;

	document.querySelector('#info-' + activePlayer).textContent = 'You\'re up!!';

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.getElementById('dice-1').style.display = 'none';
	//document.getElementById('dice-2').style.display = 'none';
}

function init() {
	gamePlaying = true;

	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	prevSum = 0;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('info-0').textContent = 'Fire it up!';
	document.getElementById('info-1').textContent = 'Get Ready';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

/*document.querySelector('#current-' + activePlayer).textContent = dice;
*/
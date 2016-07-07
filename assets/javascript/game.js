var bands = ["Thrice", "Finch", "Beartooth", "Enter Shikari", "The Starting Line", "La Dispute", "The Dear Hunter", "Dance Gavin Dance"];
var chosenBand;
var lettersGuessed;
var correctLetters;
var correctLettersGuessed;
var numberOfGuesses;
var numberOfWins;

var chooseRandomBand = function()
{
	return bands[Math.floor(Math.random()*bands.length)];
}

var initHangMang = function()
{
	lettersGuessed = new Set();
	correctLettersGuessed = new Set();
	chosenBand = chooseRandomBand();
	
	correctLetters = new Set(chosenBand.toLowerCase().split(''));
	correctLetters.delete(' ');
	resetGuesses();

	var wordSpace = '';
	for(var i = 0; i < chosenBand.length; i++)
	{
		if(chosenBand.charAt(i) === ' ')
			wordSpace += '&nbsp;'
		else
			wordSpace += '_';
	}

	document.getElementById('word').innerHTML = wordSpace;
}

var populateWordSpace = function(letter)
{
	var wordSpace = document.getElementById('word').textContent;
	var newWordSpace = '';

	for(var i = 0; i < chosenBand.length; i++)
	{
		var character = wordSpace.charAt(i);
		if(/\s/g.test(character))
			newWordSpace += '&nbsp;'
		else if(wordSpace.charAt(i) === chosenBand.charAt(i))
			newWordSpace += wordSpace.charAt(i);
		else if(wordSpace.charAt(i) === '_' && (letter.toUpperCase()) === chosenBand.charAt(i).toUpperCase())
			newWordSpace += chosenBand.charAt(i);
		else
			newWordSpace += '_';
	}

	document.getElementById('word').innerHTML = newWordSpace;
}

document.onkeyup = function(keyboardEvent)
{
	var letter = keyboardEvent.key;

	if(!isLetter(letter.toLowerCase()))
	{
		return;
	}
	if(chosenBand.toUpperCase().includes(letter.toUpperCase()))
	{
		populateWordSpace(letter);
		correctLettersGuessed.add(letter);
		if(correctLettersGuessed.size == correctLetters.size)
		{
			alert('You won mang!');
			incrementeWins();
			initHangMang();
			return;
		}
	}
	else if(!noop(letter))
	{
		decrementGuesses();
		if(numberOfGuesses == 0)
		{
			alert('You lost mang!');
			initHangMang();
			return;
		}
		lettersGuessed.add(letter);
		populateLettersGuessed();
	}	
};

var decrementGuesses = function()
{
	var numberOfGuessesElement = document.getElementById('numberOfGuessesLeft');
	numberOfGuesses = parseInt(numberOfGuessesElement.innerHTML);
	numberOfGuessesElement.innerHTML = --numberOfGuesses;
}

var incrementeWins = function()
{
	var numberOfWinsElement = document.getElementById('wins');
	numberOfWins = parseInt(numberOfWinsElement.innerHTML);
	numberOfWinsElement.innerHTML = ++numberOfWins;
}

var populateLettersGuessed = function()
{
	var lettersGuessedElement = document.getElementById('lettersGuessed');
	lettersGuessedElement.innerHTML = Array.from(lettersGuessed);
}

var noop = function(letter)
{
	return lettersGuessed.has(letter);
}

var resetGuesses = function()
{
	var numberOfGuessesElement = document.getElementById('numberOfGuessesLeft');
	numberOfGuessesElement.innerHTML = '10';

	var lettersGuessedElement = document.getElementById('lettersGuessed');
	lettersGuessedElement.innerHTML = '';
}

function isLetter(character)
{
	return character.length === 1 && character.match(/[a-z]/i);
}
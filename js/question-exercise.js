var QuestionExercise = (function(){
	/**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

	function QuestionExercise( options ){
		this.JSON_KEY_STATEMENT = 'statement';
		this.JSON_KEY_QUESTION = 'question';
		this.JSON_KEY_NEGATION = 'negation';
		this.JSON_KEY_DISTRACTORS = 'distractors';
		this.JSON_KEY_TAG_QUESTION = 'tag_question';
		this.JSON_KEYS = [
			this.JSON_KEY_STATEMENT,
			this.JSON_KEY_QUESTION,
			this.JSON_KEY_NEGATION,
			this.JSON_KEY_DISTRACTORS,
			this.JSON_KEY_TAG_QUESTION
		];
		this.questions = options.questions;
	}

	QuestionExercise.prototype.generateWordBank = function(question){
		var wordCounts = [];
		
		// Count the word occurances for each statement
		for(var i=0, l=this.JSON_KEYS.length; i<l; i+=1 ){
			var jsonKey = this.JSON_KEYS[i];
			// NOTE: we're leaving punctuation and capitalization in for now
			// var cleanQuestion = question[jsonKey].toLowerCase().replace(/[\.,-\/#\?!$%\^&\*;:{}=\-_`~()]/g,"");
			var cleanQuestion = question[jsonKey];
			var statement = cleanQuestion.replace(/\s+/g,' ');
			var words = statement.split(' ');
			var frequencies = {};
			for( var j=0, jl=words.length; j<jl; j+=1 ){
				var word = words[j];
				frequencies[word] = frequencies[word] || 0;
				frequencies[word] += 1;
			}
			wordCounts.push(frequencies);
		}

		// Combine the word counts taking the maximum count of a word
		var combined = {};
		for( var i=0, l=wordCounts.length; i<l; i+=1 ){
			var frequencies = wordCounts[i];
			var words = Object.keys(frequencies);
			for( var j=0, jl=words.length; j<jl; j+=1 ){
				var word = words[j];
				combined[word] = combined[word] || 0;
				combined[word] = Math.max(combined[word],frequencies[word]);
			}
		}

		// Create the word bank as a list of words
		var wordBank = [];
		var uniqueWords = Object.keys(combined);
		for( var i=0, l=uniqueWords.length; i<l; i+=1 ){
			var word = uniqueWords[i];
			// sometimes we get empty words, remove them
			if( word == '' ){
				continue;
			}
			for( var j=0, jl=combined[word]; j<jl; j+=1 ){
				wordBank.push(word);
			}
		}

		return wordBank;
	};

	QuestionExercise.prototype.generateHtml = function(question, promptStatement, promptKey, answerKey){
		var html = '';
		html += '<div class="sentence-builder-exercise">';
		html += '<div class="sentence-builder-prompt">';
		html += '<span class="muted">'+promptStatement+'</span>';
		html += question[promptKey];
		html += '</div>';
		html += '<div class="sentence-builder-answer">';
		html += question[answerKey];
		html += '</div>';
		html += '<div class="sentence-builder-sentence">';
		html += '<div class="sentence-builder-empty">Click the words below to make a sentence here.</div>';
		html += '</div>';
		html += '<div class="sentence-builder-feedback">';
		html += '<div class="sentence-builder-divider"></div>';
		html += '<div class="sentence-builder-button active">Check</div>';
		html += '</div>';
		html += '<div class="sentence-builder-bank">';
		html += '<div class="sentence-builder-empty">Click a word above to remove it.</div>';
		var wordBank = this.generateWordBank(question);
		shuffle(wordBank);
		for( var i=0, l=wordBank.length; i<l; i+=1 ){
			html += '<span class="sentence-builder-word">'+wordBank[i]+'</span>';
		}
		html += '</div>';
		html += '</div>';
		return html;
	};

	QuestionExercise.prototype.setupUiInteractions = function( checkPrompt, correctPrompt, errorPrompt ){
		$('.sentence-builder-exercise').on('click', '.sentence-builder-word', function(ev){
			var $t = $(this);
			var parent = $t.parent();
			var group = $t.closest('.sentence-builder-exercise');
			if(parent.hasClass('sentence-builder-bank')){
				var other = group.find('.sentence-builder-sentence');
				other.append($t);
			}else if(parent.hasClass('sentence-builder-sentence')){
				var other = group.find('.sentence-builder-bank');
				other.append($t);
			}
			var button = group.find('.sentence-builder-button');
			button.addClass('active');
			button.removeClass('correct wrong');
			button.html(checkPrompt);
		});
		$('.sentence-builder-button').on('click', function(ev){
			var $t = $(this);
			if( ! $t.hasClass('active') ){
				return;
			}
			var parent = $t.parent();
			var group = $t.closest('.sentence-builder-exercise');
			var correctAnswer = group.find('.sentence-builder-answer').text();
			var input = group.find('.sentence-builder-sentence .sentence-builder-word').text();
			$t.removeClass('correct wrong active');
			// We remove all spaces when checking the words because we
			// dont add whitespace when generating the word bank and each
			// word is divided by spans (not spaces).
			if( input.replace(/\s+/g,'').trim() == correctAnswer.replace(/\s+/g, '').trim() ){
				$t.html(correctPrompt);
				$t.addClass('correct');
			}else{
				$t.html(errorPrompt);
				$t.addClass('wrong');
			}
		});
	};
	
	return QuestionExercise;
})();

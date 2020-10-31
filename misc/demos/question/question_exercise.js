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
        var cleanQuestion = question[jsonKey].replace(/[\.,-\/#\?!$%\^&\*;:{}=\-_`~()]/g,"");
        var statement = cleanQuestion.toLowerCase().replace(/\s+/g,' ');
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
}

function highlight_guess( text, words, premark, postmark ){
	var new_text = text;
	for( var i=0, l=words.length; i<l; i+=1 ){
		var re = new RegExp( '\\b'+words[i]+'\\b', 'gi' );
		new_text =  new_text.replace(re,function(capture){return premark+capture+postmark});
	}
	return new_text;
}

function parse_text( text, tokens ){

	var replace_function = function(match, text, identifier, offset, string){
		var ids = identifier.split(',');
		var result = text;
		for( var i=0, l=ids.length; i<l; i+=1 ){
			var ident = ids[i];
			if( ! tokens.hasOwnProperty( ident ) ){
				throw ('Identifier: ['+ident+'] is unknown.');
			}
			result = tokens[ident].replace('|',result);
		}
		
		return result;
	};

	var single_word_regexp = /(\w+?)\[(.+?)\]/g;
	var parenthetical_regexp = /\((.+?)\)\[(.+?)\]/g;
	var curly_bracket_regexp = /\{(.+?)\}\[(.+?)\]/g;
	var regexps = [
		/\(0(.+?)0\)\[(.+?)\]/g,
		/\(1(.+?)1\)\[(.+?)\]/g,
		/\(2(.+?)2\)\[(.+?)\]/g,
		/\(3(.+?)3\)\[(.+?)\]/g,
		/\(4(.+?)4\)\[(.+?)\]/g,
		/\(5(.+?)5\)\[(.+?)\]/g,
		/\(6(.+?)6\)\[(.+?)\]/g,
		/\(7(.+?)7\)\[(.+?)\]/g,
		/\(8(.+?)8\)\[(.+?)\]/g,
		/\(9(.+?)9\)\[(.+?)\]/g,
		/\{0(.+?)0\}\[(.+?)\]/g,
		/\{1(.+?)1\}\[(.+?)\]/g,
		/\{2(.+?)2\}\[(.+?)\]/g,
		/\{3(.+?)3\}\[(.+?)\]/g,
		/\{4(.+?)4\}\[(.+?)\]/g,
		/\{5(.+?)5\}\[(.+?)\]/g,
		/\{6(.+?)6\}\[(.+?)\]/g,
		/\{7(.+?)7\}\[(.+?)\]/g,
		/\{8(.+?)8\}\[(.+?)\]/g,
		/\{9(.+?)9\}\[(.+?)\]/g,
		single_word_regexp,
		parenthetical_regexp,
		curly_bracket_regexp
	];
	
	var output = text;
	for( var i=0, l=regexps.length; i<l; i+=1 ){
		output = output.replace( regexps[i], replace_function );
	}
	
	return output.replace(/\n\n/g,'<br/>');
}

$(function(){
	setInterval( function(){
		$('#text-preview').html( parse_text( $('#text-input').val(), tokens ) );
	}, 50 );

	$('#btn-toggle-size').on('click',function(){
		$('#text-preview').toggleClass('full-width');
	});

	$('#btn-automark').on('click',function(){
		// highlight_guess( text, words, premark, postmark )
		var always_xwords_single = 'could would should shall must might may'.split(' ');
		var always_xwords_group = "couldn't won't wouldn't shouldn't don't doesn't didn't haven't hasn't hadn't".split(' ');
		var sometimes_xwords_single = "can will have has had am is are was were".split(' ');
		var sometimes_xwords_group = "can't isn't aren't wasn't weren't".split(' ');
		var somehow_i_missed_these_xwords_single = 'do dont does doesnt did didnt cant couldnt wont wouldnt shouldnt'.split(' ');
		var linkers_single = "however,unfortunately,fortunately,obviously,meanwhile,nowadays,finally".split(',');
		var linkers_group = "for example,for instance".split(",");
		var joiners_single = "but".split(" ");
		var subjects_single = "I you".split(" ");
		var contractions_xwords = "'m 're 've 's".split(" ");

		var txt = highlight_guess( $('#text-input').val(), always_xwords_single, '', '[x]' );
		txt = highlight_guess( txt, always_xwords_group, '(', ')[x]' );
		txt = highlight_guess( txt, sometimes_xwords_group, '(', ')[x]' );
		txt = highlight_guess( txt, sometimes_xwords_single, '', '[x]' );
		txt = highlight_guess( txt, somehow_i_missed_these_xwords_single, '', '[x]' );
		txt = highlight_guess( txt, linkers_single, '', '[l]' );
		txt = highlight_guess( txt, linkers_group, '(', ')[l]' );
		txt = highlight_guess( txt, joiners_single, '', '[j]' );
		txt = highlight_guess( txt, subjects_single, '', '[s]' );
		txt = highlight_guess( txt, contractions_xwords, '(', ')[x]' );

		$('#text-input').val(txt);
	});

	$('#btn-clear-markdown').on('click',function(){
		var txt = $('#text-input').val();
		txt = txt.replace( /\(0/gi, '' );
		txt = txt.replace( /\(1/gi, '' );
		txt = txt.replace( /\(2/gi, '' );
		txt = txt.replace( /\(3/gi, '' );
		txt = txt.replace( /\(4/gi, '' );
		txt = txt.replace( /\(5/gi, '' );
		txt = txt.replace( /\(6/gi, '' );
		txt = txt.replace( /\(7/gi, '' );
		txt = txt.replace( /\(8/gi, '' );
		txt = txt.replace( /\(9/gi, '' );
		txt = txt.replace( /0\)/gi, '' );
		txt = txt.replace( /1\)/gi, '' );
		txt = txt.replace( /2\)/gi, '' );
		txt = txt.replace( /3\)/gi, '' );
		txt = txt.replace( /4\)/gi, '' );
		txt = txt.replace( /5\)/gi, '' );
		txt = txt.replace( /6\)/gi, '' );
		txt = txt.replace( /7\)/gi, '' );
		txt = txt.replace( /8\)/gi, '' );
		txt = txt.replace( /9\)/gi, '' );
		txt = txt.replace( /\{0/gi, '' );
		txt = txt.replace( /\{1/gi, '' );
		txt = txt.replace( /\{2/gi, '' );
		txt = txt.replace( /\{3/gi, '' );
		txt = txt.replace( /\{4/gi, '' );
		txt = txt.replace( /\{5/gi, '' );
		txt = txt.replace( /\{6/gi, '' );
		txt = txt.replace( /\{7/gi, '' );
		txt = txt.replace( /\{8/gi, '' );
		txt = txt.replace( /\{9/gi, '' );
		txt = txt.replace( /0\}/gi, '' );
		txt = txt.replace( /1\}/gi, '' );
		txt = txt.replace( /2\}/gi, '' );
		txt = txt.replace( /3\}/gi, '' );
		txt = txt.replace( /4\}/gi, '' );
		txt = txt.replace( /5\}/gi, '' );
		txt = txt.replace( /6\}/gi, '' );
		txt = txt.replace( /7\}/gi, '' );
		txt = txt.replace( /8\}/gi, '' );
		txt = txt.replace( /9\}/gi, '' );
		txt = txt.replace( /\(/gi, '' );
		txt = txt.replace( /\)/gi, '' );
		txt = txt.replace( /\{/gi, '' );
		txt = txt.replace( /\}/gi, '' );
		txt = txt.replace( /\[.*?\]/gi, '' );
		$('#text-input').val(txt);
	});

	$('#btn-error-check').on('click',function(){
		var found_error = false;
		var txt = $('#text-input').val();

		// Look for mistyped text in [] brackets:
		var bracket_test = function(match, identifier, offset, string){
			if( found_error ){ return }
			if( ! tokens.hasOwnProperty( identifier ) ){
				var problem_characters = '(){} '.split('');
				for( var i=0, l=problem_characters.length; i<l; i+=1 ){
					if( identifier.indexOf(problem_characters[i]) > -1 ){
						if( identifier.length > 10 ){
							alert( '"['+identifier.slice(0,10)+'..." appears to be missing a closing bracket: ]' );
							found_error = true;
							return;
						}else{
							alert( '"['+identifier+' appears to be missing a closing bracket: ]' );
							found_error = true;
							return;
						}
					}
				}
				alert( 'Is "['+identifier+']" mispelled? Here are the available options: '+Object.keys(tokens) );
				found_error = true;
				return;
			}
			return match;
		};
		txt.replace( /\[(.+?)\]/g, bracket_test );
		
		// Look for closing brackets that are not labeled
		var label_test = function(match,offset,string){
			if( found_error ){ return; }
			found_error = true;
			alert( 'The text: "' +match+ '" appears to not be labelled (to correct add [x] or [v] to the end, for example)' );
		};
		txt.replace( /\{[^}]+?\}[^[]/g, label_test );
		txt.replace( /\([^)]+?\)[^[]/g, label_test );
		
		// Look for punctation before a [marker]
		var punctation_test = function(match,word,marker,offset,string){
			if( found_error ){ return; }
			found_error = true;
			alert( 'The text: "'+match+'" has a punction before a [label]. Please enclose it like: ('+word+')['+marker+']' );
		}
		txt.replace( /(\S+?)[,.:;?]\[([^]*?)\]/g, punctation_test );

		// Look for newlines in brackets
		var newline_test = function(match,offset,string){
			if( found_error ){ return; }
			found_error = true;
			alert( 'The text: "'+match+'" has a newline within the brackets. Please remove the newline.' );
		}
		txt.replace( /\[[^\n]+?\n[^\n]+?\]/gm, newline_test );
		txt.replace( /\{[^\n]+?\n[^\n]+?\}/gm, newline_test );
		txt.replace( /\([^\n]+?\n[^\n]+?\)/gm, newline_test );

		if( found_error === false ){
			alert( 'No errors found!' );
		}

	});

});

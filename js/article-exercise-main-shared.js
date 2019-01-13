
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
	
	// Replace smart quotes with dumb ones
	output = output.replace(/“/g, '"');
	output = output.replace(/”/g, '"');
	
	// We have to replace the quotation marks first.
	// The behavior is that inline quotes become italicized AND keep their quotation marks.
	var quote_regexp = /"([^"]+)"/g;
	var useSmartQuotes = false;
	if( useSmartQuotes ){
		output = output.replace( quote_regexp, '“<span class="inline-quote">$1</span>”' );
	}else{
		output = output.replace( quote_regexp, '"<span class="inline-quote">$1</span>"' );
	}
	
	// Do all the custom regular expressions
	for( var i=0, l=regexps.length; i<l; i+=1 ){
		output = output.replace( regexps[i], replace_function );
	}

	// Convert all style newlines to \n (Unix newlines) by removing the \r
	output = output.replace( /\r/g, '' );
	// Join multiple blank lines into a single one
	output = output.replace( /\n\n+/g, '\n\n' );
	// Split the output at newlines
	var paragraphs = output.split( /\n\n/g );
	
	// wrap all of the paragraphs
	var h1_regex = /^# (.*)/;
	var h2_regex = /^## (.*)/;
	var h3_regex = /^### (.*)/;
	var list_regex = /^ - /;
	for( var i=0, l=paragraphs.length; i<l; i+=1 ){
		var p = paragraphs[i];
		if( h1_regex.test(p) ){
			p = p.replace(h1_regex,'<h3>$1</h3>\n');
		}else if( h2_regex.test(p) ){
			p = p.replace(h2_regex,'<h4>$1</h4>\n');
		}else if( h3_regex.test(p) ){
			p = p.replace(h3_regex,'<h5>$1</h5>\n');
		}else if( list_regex.test(p) ){
			p = p.replace(/^ - (.*)$/gm,'\t<li>$1</li>\n');
			p = '<ul>'+p+'</ul>\n';
		}else{
			console.info( 'P' );
			p = '<p>'+p+'</p>';
		}
		paragraphs[i] = p;
	}

	return paragraphs.join('\n');
}

function FindTheWord( options ){
	this.classFind = options.classFind;
	this.classFound = options.classFound;
	this.classSummary = options.classSummary || '.xw-paragraph-summary';
	this.label = options.label || 'xwords';
}
FindTheWord.prototype.setup = function(content){
	var that = this;
	$(content).on('click.findTheWord','.'+this.classFind,function(){
		$(this).addClass( that.classFound );
		that.updateCounts( content ); // ???
	});
};
FindTheWord.prototype.total = function( content ){
	return $(content).find('.'+this.classFind).length;
};
FindTheWord.prototype.numberFound = function( content ){
	return $(content).find( '.'+this.classFound ).length;
};
FindTheWord.prototype.updateCounts = function(content){
	// Update global word count
	//var total = XWords.total(content);
	//$('#x-words-total').html( total );
	//$('#x-words-found').html( XWords.numberFound(content) );
	// Update per-paragraph word count
	$(content).find('span').remove('.'+this.classSummary);
	var that = this;
	$(content).find('p, li').each(function(i,node){
		var total = that.total( node );
		if( total === 0 ){ return; }
		var found = that.numberFound( node );
		$( node ).append( '<span class="'+that.classSummary+'"><br/>'+found+' of '+total+' '+that.label+' found</span>' );
	});
};


function FindTheWordMulti( findTheWords ){
	this.games = findTheWords;
}
FindTheWordMulti.prototype.setup = function( content ){
	for( var i=0, l=this.games.length; i<l; i+=1 ){
		this.games[i].setup(content);
	}
}
FindTheWordMulti.prototype.total = function( content ){
	var total = 0;
	for( var i=0, l=this.games.length; i<l; i+=1 ){
		total += this.games[i].total(content);
	}
	return total;
}
FindTheWordMulti.prototype.updateCounts = function( content ){
	for( var i=0, l=this.games.length; i<l; i+=1 ){
		this.games[i].updateCounts(content);
	}
}

var XWords = new FindTheWord({
	classFind: 'xword',
	classFound: 'xword-found',
	classSummary: 'xword-paragraph-summary',
	label: 'xwords'
});

var HiddenXWords = new FindTheWord({
	classFind: 'xword-hidden',
	classFound: 'xword-hidden-found',
	classSummary: 'xword-hidden-paragraph-summary',
	label: 'hidden xwords'
});
var Verbs = new FindTheWord({
	classFind: 'verb',
	classFound: 'verb-found',
	classSummary: 'verbs-paragraph-summary',
	label: 'verbs'
});
var Subjects = new FindTheWord({
	classFind: 'subject',
	classFound: 'subject-found',
	classSummary: 'subject-paragraph-summary',
	label: 'subjects'
});
var Infinitives = new FindTheWord({
	classFind: 'infinitive',
	classFound: 'infinitive-found',
	classSummary: 'infinitive-paragraph-summary',
	label: 'infinitives'
});
var Trunks = new FindTheWord({
	classFind: 'trunk',
	classFound: 'trunk-found',
	classSummary: 'trunks-paragraph-summary',
	label: 'trunks'
});
var Linkers = new FindTheWord({
	classFind: 'linker',
	classFound: 'linker-found',
	classSummary: 'linkers-paragraph-summary',
	label: 'linkers'
});
var ExtraInfo = new FindTheWord({
	classFind: 'extra-information',
	classFound: 'extra-information-found',
	classSummary: 'extra-information-paragraph-summary',
	label: 'extra information'
});
var ShifterTime = new FindTheWord({
	classFind: 'shifter-time',
	classFound: 'shifter-time-found',
	classSummary: 'shifter-time-paragraph-summary',
	label: 'time shifter'
});
var ShifterPlace = new FindTheWord({
	classFind: 'shifter-place',
	classFound: 'shifter-place-found',
	classSummary: 'shifter-place-paragraph-summary',
	label: 'place shifter'
});
var ShifterReason = new FindTheWord({
	classFind: 'shifter-reason',
	classFound: 'shifter-reason-found',
	classSummary: 'shifter-reason-paragraph-summary',
	label: 'reason shifter'
});
var ShifterCondition = new FindTheWord({
	classFind: 'shifter-condition',
	classFound: 'shifter-condition-found',
	classSummary: 'shifter-condition-paragraph-summary',
	label: 'condition shifter'
});
var ShifterContrast = new FindTheWord({
	classFind: 'shifter-contrast',
	classFound: 'shifter-contrast-found',
	classSummary: 'shifter-contrast-paragraph-summary',
	label: 'contrast shifter'
});
var XV = new FindTheWordMulti([XWords,Verbs]);
var XVS = new FindTheWordMulti([XWords,Verbs,Subjects]);
var XS = new FindTheWordMulti([XWords,Subjects]);

// Handled by the class, except for 
function updateCounts(content){
	// Update global word count
	var total = XWords.total(content);
	$('#x-words-total').html( total );
	$('#x-words-found').html( XWords.numberFound(content) );
	// Update per-paragraph word count
	$(content).find('span').remove('.xw-paragraph-summary');
	$(content).find('p, li').each(function(i,node){
		var total = XWords.total( node );
		if( total === 0 ){ return; }
		var found = XWords.numberFound( node );
		$( node ).append( '<span class="xw-paragraph-summary"><br/>'+found+' of '+total+' xwords found</span>' );
	});
}

function titleCase( text ){
	return text.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

// http://x-words.com/x-find/animals/a-hawk-in-queens -> animals/a-hawk-in-queens
/*
var path = window.location.href.split(window.location.host)[1].split('#')[0].split('?')[0];
var pathParts = path.split('/');
var nParts = pathParts.length - 1;
for( var i=nParts; i<3; i+=1 ){
	pathParts.push('');
}
nParts=3;
var articleUrl = pathParts.slice(nParts-2).join('/');
var exercise = titleCase( pathParts[nParts-3].replace(/-/g,' ') );
var category = titleCase( pathParts[nParts-2].replace(/-/g,' ') );
var article = titleCase( pathParts[nParts-1].replace(/-/g,' ') );
// $('#breadcrumb-category').html( category )[0].href = '../../#'+pathParts[nParts-2];
$('#breadcrumb-article').html( article );
$('#article-title').html( article );
$('title').html( article +' - X-Words Grammar' );
*/
// http://x-words.com/articles/#/a-hawk-in-queens?extra_stuff=useless_crap -> a-hawk-in-queens
var path = window.location.href.split(window.location.host)[1].split('#')[1];
try{
	var options = JSON.parse('{"' + decodeURI( window.location.href.split('?')[1].split('#')[0] ).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}catch(e){
	var options = {};
}
var article = titleCase( path.replace(/-/g,' ') );
$('#breadcrumb-article').html( article );
$('#article-title').html( article );
$('title').html( article +' - X-Words Grammar' );
$.get( path+'/content.txt', function(response){
	var parsed = parse_text( response, tokens );
	$('.x-words-content').html( parsed );
	$('#article-image')[0].src = path+'/image.jpg';
	$('#article-icon')[0].src = path+'/image.jpg';
	var exercise = XWords;
	if( options.hasOwnProperty('exercise') ){
		options.exercise = options.exercise.replace(/[- _]/g,'').toLowerCase();
		if( options.exercise === 'xwords' ){
			exercise = XWords;
		}else if( options.exercise === 'hiddenxwords' ){
			exercise = HiddenXWords;
		}else if( options.exercise === 'verbs' ){
			exercise = Verbs;
		}else if( options.exercise === 'subjects' ){
			exercise = Subjects;
		}else if( options.exercise === 'infinitives' ){
			exercise = Infinitives;
		}
	}
	exercise.setup( '.x-words-content' );
	exercise.updateCounts( '.x-words-content' );
} );

function load_content_find_words( content, game, title ){
	$.get( content, function(response){
		var parsed = parse_text( response, tokens );
		$('.x-words-content').html( parsed );
		$('.x-words-content').off('click.findTheWord');
		if( game.total( '.x-words-content' ) === 0 ){
			alert( 'There are no examples of '+game.label+' in this article. Please choose a different exercise' );
		}
		//$('#article-image')[0].src = '../../../articles/'+articleUrl+'image.jpg';
		//$('#article-icon')[0].src = '../../../articles/'+articleUrl+'image.jpg';
		game.setup( '.x-words-content' );
		game.updateCounts( '.x-words-content' );
		$('.main.menu .ui.dropdown').dropdown('hide');
		$('#exercise-title').html(title);
	} );
}

function load_content_make_questions( content, game, title ){
	$.get( content, function(response){
		var parsed = parse_text( response, tokens );
		$('.x-words-content').html( '' );
		extract_trunks( parsed );
	});
}
function extract_trunks( html ){
	var trunks = $(html).find('.trunk');
	// Why do i need to manually convert a node list or jquery
	// object to an array?
	var nodes = trunks;
	var containers = [];
	for( var i=0, l=nodes.length; i<l; i+=1 ){
		$(nodes[i]).addClass('xw-drag-sentence').find('span').addClass('xw-drag-word');
		containers.push( nodes[i] );
	}

	$('.x-words-content').append( trunks );
	
	// Capitalize stuff properly
	$('.trunk').each(function(i,el){
		var $words = $(el).find('.xw-drag-word');
		$words[0].innerHTML = $words[0].innerHTML.charAt(0).toUpperCase() + $words[0].innerHTML.substr(1).toLowerCase();
	});
	
	// Put a period at the end of each statement
	$('.trunk').each(function(i,el){
		el.innerHTML = el.innerHTML.replace(/[.?,;] *$/,'<span class="xw-drag-word-end">.</span>');
	});
	
	dragula( containers, {
	}).on('drop', function (el) {
		var sentence = $(el).parent();

		// make all the contained words lower case
		var $words = sentence.find('.xw-drag-word');
		$words.each( function(i,el){
			el.innerHTML = el.innerHTML.toLowerCase();
		} );

		// Capitalize the first letter
		$words[0].innerHTML = $words[0].innerHTML.charAt(0).toUpperCase() + $words[0].innerHTML.substr(1).toLowerCase();

		// Determine if sentence or question
		var subjectPlace = -1;
		var xWordPlace = -1;
		for( var i=0, l=$words.length; i<l; i+=1 ){
			if( $($words[i]).hasClass( 'subject' ) && subjectPlace < 0 ){
				subjectPlace = i;
			}
			if( $($words[i]).hasClass( 'xword' ) && xWordPlace < 0 ){
				xWordPlace = i;
			}
		}
		if( xWordPlace < subjectPlace ){
			sentence.find('.xw-drag-word-end').html('?');
		}else{
			sentence.find('.xw-drag-word-end').html('.');
		}
		/*
		 s,x,v -> statment
		 s,v,x -> error
		 x,s,v -> question
		 x,v,s -> error
		 v,s,x -> error
		 v,x,s -> error
		*/
	});

}

function setup_shift_the_shifters( html ){
	var selector = '.shifter-time,.shifter-place,.shifter-reason,.shifter-condition,.shifter-contrast';
	var nodes = $(html).find(selector);
	var containers = [];
	for( var i=0, l=nodes.length; i<l; i+=1 ){
		$(nodes[i]).addClass('xw-drag-sentence').find('span').addClass('xw-drag-word');
		containers.push( nodes[i] );
	}

	$('.x-words-content').append( containers );

	// Capitalize stuff properly
	$(selector).each(function(i,el){
		var $words = $(el).find('.xw-drag-word');
		$words[0].innerHTML = $words[0].innerHTML.charAt(0).toUpperCase() + $words[0].innerHTML.substr(1).toLowerCase();
	});
}
function load_content_make_sts( content, game, title ){
	$.get( content, function(response){
		var parsed = parse_text( response, tokens );
		$('.x-words-content').html( '' );
		setup_shift_the_shifters( parsed );
	});
}

$('#menu-item-xwords').on('click',function(){load_content_find_words(path+'/content.txt',XWords,'Find the X-Words'); return false;});
$('#menu-item-xwords-verbs').on('click',function(){load_content_find_words(path+'/content.txt',XV,'Find the X-Word, Verb Pairs'); return false;});
$('#menu-item-verbs').on('click',function(){load_content_find_words(path+'/content.txt',Verbs,'Find the Verbs'); return false;});
$('#menu-item-hidden-xwords').on('click',function(){load_content_find_words(path+'/content.txt',HiddenXWords,'Find the Hidden X-Words'); return false;});
$('#menu-item-xvs').on('click',function(){load_content_find_words(path+'/content.txt',XVS,'Find the X-Words, Subjects and Verbs'); return false;});
$('#menu-item-xs').on('click',function(){load_content_find_words(path+'/content.txt',XS,'Find the X-Words and Subjects'); return false;});
$('#menu-item-subjects').on('click',function(){load_content_find_words(path+'/content.txt',Subjects,'Find the Subjects'); return false;});
$('#menu-item-infinitives').on('click',function(){load_content_find_words(path+'/content.txt',Infinitives,'Find the Infinitives'); return false;});
$('#menu-item-trunks').on('click',function(){load_content_find_words(path+'/content.txt',Trunks,'Find the Trunks'); return false;});
$('#menu-item-linkers').on('click',function(){load_content_find_words(path+'/content.txt',Linkers,'Find the Linkers'); return false;});
$('#menu-item-extra-info').on('click',function(){load_content_find_words(path+'/content.txt',ExtraInfo,'Find the Extra Information'); return false;});
$('#menu-item-shifter-time').on('click',function(){load_content_find_words(path+'/content.txt',ShifterTime,'Find the Time Shifters'); return false;});
$('#menu-item-shifter-place').on('click',function(){load_content_find_words(path+'/content.txt',ShifterPlace,'Find the Place Shifters'); return false;});
$('#menu-item-shifter-reason').on('click',function(){load_content_find_words(path+'/content.txt',ShifterReason,'Find the Reason Shifters'); return false;});
$('#menu-item-shifter-condition').on('click',function(){load_content_find_words(path+'/content.txt',ShifterCondition,'Find the Condition Shifters'); return false;});
$('#menu-item-shifter-contrast').on('click',function(){load_content_find_words(path+'/content.txt',ShifterContrast,'Find the Contrast Shifters'); return false;});
$('#menu-item-shifter-shift').on('click',function(){load_content_make_sts(path+'/content.txt',null,'Shift the Shifters'); return false;});
$('#menu-item-make-questions').on('click',function(){load_content_make_questions(path+'/content.txt',null,'Make Question'); return false;});


$(document)
	.ready(function() {

		// fix main menu to page on passing
		$('.main.menu').visibility({
			type: 'fixed'
		});
		$('.overlay').visibility({
			type: 'fixed',
			offset: 80
		});

		// lazy load images
		$('.image').visibility({
			type: 'image',
			transition: 'vertical flip in',
			duration: 500
		});

		// show dropdown on hover
		$('.main.menu .ui.dropdown').dropdown({
			on: 'hover'
		});
		
		$('.footer-link').on('click',function(){
			window.location.href = this.href;
			window.location.reload();
		});
	})
;

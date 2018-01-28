/* XWG Markup to HTML Code */
var tokens = {
	
	'vxo': '<span class="xw-hidden hidden-do">|</span>',
	'hidden-do': '<span class="xw-hidden hidden-do">|</span>',
	
	'vxs': '<span class="xw-hidden hidden-does">|</span>',
	'hidden-does': '<span class="xw-hidden hidden-does">|</span>',
	
	'vxd': '<span class="xw-hidden hidden-did">|</span>',
	'hidden-did': '<span class="xw-hidden hidden-did">|</span>',
	
	'inf': '<span class="infinitive">|</span>',
	'infinitive': '<span class="infinitive">|</span>',
	
	'dtn': '<span class="past-participle">|</span>',
	'past-participle': '<span class="past-participle">|</span>',
	
	'extra': '<span class="extra-information">|</span>',
	'extra-info': '<span class="extra-information">|</span>',
	
	'v': '<span class="verb">|</span>',
	'verb': '<span class="verb">|</span>',
	
	'x': '<span class="xw">|</span>',
	'xword': '<span class="xw">|</span>',
	
	's': '<span class="subject">|</span>',
	'subject': '<span class="subject">|</span>',
	
	't': '<span class="trunk">|</span>',
	'trunk': '<span class="trunk">|</span>',
	
	'l': '<span class="linker">|</span>',
	'linker': '<span class="linker">|</span>',
	
	'j': '<span class="joiner">|</span>',
	'joiner': '<span class="joiner">|</span>',
	
	'sh': '<span class="shifter">|</span>',
	'shifter': '<span class="shifter">|</span>',
	
	'f': '<span class="front-shifter">|</span>',
	'front-shifter': '<span class="front-shifter">|</span>',
	
	'e': '<span class="end-shifter">|</span>',
	'end-shifter': '<span class="end-shifter">|</span>',

	't=': '<span class="trunk-multi">|</span>',
	'trunk-multi': '<span class="trunk-multi">|</span>',
	
	'f-t': '<span class="front-shifter-time">|</span>',
	'front-shifter-time': '<span class="front-shifter-time">|</span>',
	'f-p': '<span class="front-shifter-place">|</span>',
	'front-shifter-place': '<span class="front-shifter-place">|</span>',
	'f-r': '<span class="front-shifter-reason">|</span>',
	'front-shifter-reason': '<span class="front-shifter-reason">|</span>',
	'f-cd': '<span class="front-shifter-condition">|</span>',
	'front-shifter-condition': '<span class="front-shifter-condition">|</span>',
	'f-ct': '<span class="front-shifter-contrast">|</span>',
	'front-shifter-contrast': '<span class="front-shifter-contrast">|</span>',
	
	'e-t': '<span class="end-shifter-time">|</span>',
	'end-shifter-time': '<span class="end-shifter-time">|</span>',
	'e-p': '<span class="end-shifter-place">|</span>',
	'end-shifter-place': '<span class="end-shifter-place">|</span>',
	'e-r': '<span class="end-shifter-reason">|</span>',
	'end-shifter-reason': '<span class="end-shifter-reason">|</span>',
	'e-cd': '<span class="end-shifter-condition">|</span>',
	'end-shifter-condition': '<span class="end-shifter-condition">|</span>',
	'e-ct': '<span class="end-shifter-contrast">|</span>',
	'end-shifter-contrast': '<span class="end-shifter-contrast">|</span>'
};

function parse_text( text, tokens ){

	var replace_function = function(match, text, identifier, offset, string){
		if( ! tokens.hasOwnProperty( identifier ) ){
			throw ('Identifier: ['+identifier+'] is unknown. (TODO: add list of valid identifiers)');
		}
		
		return tokens[identifier].replace('|',text);
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

	// Convert all style newlines to \n (Unix newlines) by removing the \r
	output = output.replace( /\r/g, '' );

	return '<p>'+output.replace(/\n\n/g,'</p><p>')+'</p>';
}

function FindTheWord( options ){
	this.classFind = options.classFind;
	this.classFound = options.classFound;
	this.classSummary = options.classSummary || '.xw-paragraph-summary';
	this.label = options.label || 'xwords';
}
FindTheWord.prototype.setup = function(content){
	var that = this;
	$(content).on('click','.'+this.classFind,function(){
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



var XWords = new FindTheWord({
	classFind: 'xw',
	classFound: 'xw-found',
	classSummary: 'xw-paragraph-summary',
	label: 'xwords'
});

var HiddenXWords = new FindTheWord({
	classFind: 'xw-hidden',
	classFound: 'xw-hidden-found',
	classSummary: 'xw-hidden-paragraph-summary',
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
var path = window.location.href.split(window.location.host)[1].split('#')[1].split('?')[0];
try{
	var options = JSON.parse('{"' + decodeURI( window.location.href.split('?')[1] ).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
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
					
function load_content( content, game, title ){
	$.get( content, function(response){
		var parsed = parse_text( response, tokens );
		$('.x-words-content').html( parsed );
		//$('#article-image')[0].src = '../../../articles/'+articleUrl+'image.jpg';
		//$('#article-icon')[0].src = '../../../articles/'+articleUrl+'image.jpg';
		game.setup( '.x-words-content' );
		game.updateCounts( '.x-words-content' );
		$('.main.menu .ui.dropdown').dropdown('hide');
		$('#exercise-title').html(title);
	} );
}

$('#menu-item-xwords').on('click',function(){load_content(path+'/content.txt',XWords,'Find the X Words'); return false;});
$('#menu-item-verbs').on('click',function(){load_content(path+'/content.txt',Verbs,'Find the Verbs'); return false;});
$('#menu-item-hidden-xwords').on('click',function(){load_content(path+'/content.txt',HiddenXWords,'Find the Hidden X Words'); return false;});
$('#menu-item-subjects').on('click',function(){load_content(path+'/content.txt',Subjects,'Find the Subjects'); return false;});
$('#menu-item-infinitives').on('click',function(){load_content(path+'/content.txt',Infinitives,'Find the Infinitives'); return false;});
$('#menu-item-trunks').on('click',function(){load_content(path+'/content.txt',Trunks,'Find the Trunks'); return false;});
$('#menu-item-linkers').on('click',function(){load_content(path+'/content.txt',Linkers,'Find the Linkers'); return false;});

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
	})
;

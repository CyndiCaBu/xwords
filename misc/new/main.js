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
	'end-shifter': '<span class="end-shifter">|</span>'
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
		single_word_regexp,
		parenthetical_regexp,
		curly_bracket_regexp
	];
	
	var output = text;
	for( var i=0, l=regexps.length; i<l; i+=1 ){
		output = output.replace( regexps[i], replace_function );
	}
	
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
/* Interactive X-Words tracking stuff 
var XWords = {};
XWords.loadContent = function( url ){};
XWords.setup = function( content ){
	$(content).on('click','.xw',function(){
		$(this).addClass( 'xw-found' );
		updateCounts( content );
	});
};
XWords.total = function( content ){
	return $(content).find( '.xw' ).length;
};
XWords.numberFound = function( content ){
	return $(content).find( '.xw-found' ).length;
};
*/

// ----------------------------------------------------------------
//  Subject 
// ----------------------------------------------------------------
/*
var XWords = {};
XWords.loadContent = function( url ){};
XWords.setup = function( content ){
	$(content).on('click','.subject',function(){
		$(this).addClass( 'subject-found' );
		updateCounts( content );
	});
};
XWords.total = function( content ){
	return $(content).find( '.subject' ).length;
};
XWords.numberFound = function( content ){
	return $(content).find( '.subject-found' ).length;
};
*/
// ----------------------------------------------------------------

// ----------------------------------------------------------------
//  Verbs
// ----------------------------------------------------------------
/*
var XWords = {};
XWords.loadContent = function( url ){};
XWords.setup = function( content ){
	$(content).on('click','.verb',function(){
		$(this).addClass( 'verb-found' );
		updateCounts( content );
	});
};
XWords.total = function( content ){
	return $(content).find( '.verb' ).length;
};
XWords.numberFound = function( content ){
	return $(content).find( '.verb-found' ).length;
};
*/
// ----------------------------------------------------------------

// ----------------------------------------------------------------
//  Hidden xwords
// ----------------------------------------------------------------
/*
var XWords = {};
XWords.loadContent = function( url ){};
XWords.setup = function( content ){
	$(content).on('click','.xw-hidden',function(){
		$(this).addClass( 'xw-hidden-found' );
		updateCounts( content );
	});
};
XWords.total = function( content ){
	return $(content).find( '.xw-hidden' ).length;
};
XWords.numberFound = function( content ){
	return $(content).find( '.xw-hidden-found' ).length;
};
*/
// ----------------------------------------------------------------

var XWords = new FindTheWord({
	classFind: 'xw-hidden',
	classFound: 'xw-hidden-found',
	classSummary: 'xw-paragraph-summary',
	label: 'hidden xxords'
});




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
$('#breadcrumb-category').html( category )[0].href = '../../#'+pathParts[nParts-2];
$('#breadcrumb-article').html( article );
$('#article-title').html( article );
$('title').html( article +' - X-Words Grammar' );
$.get( 'content.txt', function(response){
	var parsed = parse_text( response, tokens );
	$('.x-words-content').html( parsed );
	//$('#article-image')[0].src = '../../../articles/'+articleUrl+'image.jpg';
	//$('#article-icon')[0].src = '../../../articles/'+articleUrl+'image.jpg';
	XWords.setup( '.x-words-content' );
	XWords.updateCounts( '.x-words-content' );
} );


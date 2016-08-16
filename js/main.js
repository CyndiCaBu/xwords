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
function updateCounts(content){
	var total = XWords.total(content);
	$('#x-words-total').html( total );
	$('#x-words-found').html( XWords.numberFound(content) );
}

// Addition stuff 
XWords.setup( '.x-words-content' );
updateCounts( '.x-words-content' );

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

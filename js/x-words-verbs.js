var XWordsVerbs = {};
XWordsVerbs.loadContent = function( url ){};
XWordsVerbs.setup = function( content ){
	$(content).on('click','.xw-verb',function(){
		$(this).addClass( 'xw-verb-found' );
		updateCounts( content );
	});
};
XWordsVerbs.total = function( content ){
	return $(content).find( '.xw-verb' ).length;
};
XWordsVerbs.numberFound = function( content ){
	return $(content).find( '.xw-verb-found' ).length;
};

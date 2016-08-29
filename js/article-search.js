$(function(){

	var domSearch = new DomSearch( '.search-container', '.search-element', '.search-data' );
	domSearch.generateIndex();

	function runSearch( ev ){
		domSearch.query(
			document.getElementById('search-bar').value,
			function( searcher, element, matchText ){
				$( element ).removeClass( searcher.elementSelectorHidden.replace('.','') );
				//element.className = element.className.replace( new RegExp(searcher.elementSelectorHidden,'g'), '');
			},
			function( searcher, element, matchText ){
				$( element ).addClass( searcher.elementSelectorHidden.replace('.','') );
				//element.className += searcher.elementSelectorHidden;
			}
		);
	}

	document.getElementById('search-bar').onkeyup = runSearch;
});

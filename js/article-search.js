
class ArticleSearch {
	constructor() {
		this.domSearch = new DomSearch( '.search-container', '.search-element', '.search-data' );
		this.disciplineSearch = new DomSearch( '.search-container', '.search-element', '.meta-discipline' );
	}
	runSearchUi( ev ){
		this.runSearch(document.getElementById('search-bar').value);
	}
	runSearchExt(searcher, text){
		searcher.query(
			text,
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
	runSearch(text){
		this.runSearchExt(this.domSearch, text);
	}
	searchDiscipline(text){
		this.runSearchExt(this.disciplineSearch, text);
	}
	clear(){
		this.runSearch('---something that cannot be found---');
	}
	setup(){
		this.domSearch.generateIndex();
		this.disciplineSearch.generateIndex();
		document.getElementById('search-bar').onkeyup = ( () => this.runSearchUi() );
	}
}


function generate_article_link( data ){
	var html = '';
	html += '<a class="ui card search-element search-element-hidden" href="./articles/#/'+data.url.split('/').slice(1).join('/')+'">';
	html += '<div class="image">';
	html += '	<img src="'+data.url+'/thumbnail.jpg">';
	html += '</div>';
	html += '<div class="content">';
	html += '	<div class="header">'+data.title+'</div>';
	if( data.hasOwnProperty('description') ){
		html += '		<div class="description">';
		html += '			'+data.description+'';
		html += '		</div>';
	}
	html += '</div>';
	if( data.hasOwnProperty('gradeLevel') || data.hasOwnProperty('discipline')){
		html += '<div class="extra content">';
		html += '	<div class="meta">';
		if( data.hasOwnProperty('gradeLevel') ){
			html += '		<span class="ui label"><i class="chart bar icon"></i>'+data.gradeLevel+'</span>';
		}
		if( data.hasOwnProperty('discipline') ){
			html += '		<span class="ui label meta-discipline">'+data.discipline+'</span>';
		}
		html += '	</div>';
		html += '</div>';
	}
	// date?
	// if( data.hasOwnProperty('date') ){
	// 	html += '<div class="extra content">';
	// 	html += '	<div class="ui label"><i class="calendar icon"></i> '+data.date+'</div>';
	// 	html += '</div>';
	// }
	// tags?
	// if( data.hasOwnProperty('tags') ){
	// 	html += '<div class="extra content">';
	// 	var tags = data.tags.split(',');
	// 	for( var i=0, l=tags.length; i<l; i+=1 ){
	// 		// hiding tags, uncomment to show
	// 		html += '	<div class="ui label">'+tags[i].trim()+'</div>';
	// 	}
	// 	html += '</div>'
	// }
	// "Practice ->" Text
	html += '<div class="extra content">';
	html += '	<span class="right floated">Practice <i class="arrow alternate circle right icon"></i></span>';
	if( data.hasOwnProperty('date') ){
		// html += '	<span class="left floated muted" style="opacity: 0.4"><i class="calendar icon"></i> '+data.date+'</span>';
	}
	html += '</div>';

	html += '</a>';
	return html;
}
var GLOBAL_ARTICLE_SEARCH = null;
function mainPageCategoryShowLearn(){
	GLOBAL_ARTICLE_SEARCH.searchDiscipline("about xwg");
	$('#practice-group').addClass('hidden');
}
function mainPageCategoryShowPractice(){
	$('#practice-group').removeClass('hidden');
}

function handleUrlHash(event){
	if(event == null){
		var hash = window.location.href.split('#')[1];
	}else{
		var e = event.originalEvent;
		var hash = e.newURL.split('#')[1];
	}
	// console.info(hash);
	if(hash == '/learn'){
		mainPageCategoryShowLearn();
	}else if(hash.indexOf('/practice') > -1){
		mainPageCategoryShowPractice();
		// hash = #/practice/category
		var parts = hash.split('/');
		if(parts.length > 2){
			var practice = parts[1];
			var category = parts[2];
			GLOBAL_ARTICLE_SEARCH.searchDiscipline(category.replace('-', ' '));
		}else{
			GLOBAL_ARTICLE_SEARCH.clear();
		}
	}else{
		GLOBAL_ARTICLE_SEARCH.clear();
	}

}

$(document).ready(function() {
	$.get('articles/list.json').then(function(response){
		// NOTE: on windows machines - the response is "text" so it must be parsed
		// NOTE: on linux machines - the respinse is "json" so it must NOT be parsed
		// this probably has something to do with SimpleHTTPServer and mimetypes
		//var data = JSON.parse(response);
		if( typeof response === 'string' || response instanceof String ){
			var data = JSON.parse(response);
		}else{
			var data = response;
		}
		// Create the links for the articles that should be listed on the homepage

		// Remove articles that do not belong on the home page (REMOVED)
		// var articles = data.articles.filter( function(a){ return a.isOnHome; } );

		// Filter and sort by date (YYYY-MM-DD) newest first (REMOVED)
		// var articles = data.articles;
		// articles = articles.sort( function(a,b){
		// 	if( a.date == b.date ){
		// 		return 0;
		// 	}else if( a.date < b.date ){
		// 		return 1;
		// 	}else{
		// 		return -1;
		// 	}
		// });

		// Sort articles alphabetically by title
		var articles = data.articles;
		articles = articles.sort( function(a,b){
			if( a.title == b.title ){
				return 0;
			}else if( a.title < b.title ){
				return -1;
			}else{
				return 1;
			}
		});

		var html = '';
		for( var i=0, l=articles.length; i<l; i+=1 ){
			html += generate_article_link( articles[i] );
		}
		$('#article-container').html( html );
		
		// Do somethine with the articles that belong in the random section
		var randoms = data.articles.filter( function(a){ return a.isInRandom; } );
		// TODO: add more code...
		
		// Setup search
		GLOBAL_ARTICLE_SEARCH = new ArticleSearch();
		GLOBAL_ARTICLE_SEARCH.setup();

		handleUrlHash(null);
	});
	$('#article-container').on('click','.button',function(){
		window.location.href = $(this).data('link-url');
	});
	$(window).on('hashchange', handleUrlHash);
});

function generate_article_link( data ){
	var html = '';
	html += '<div class="item search-element">';
	html += '	<div class="image">';
	html += '		<img src="'+data.url+'/thumbnail.jpg">';
	html += '	</div>';
	html += '	<div class="content search-data">';
	html += '		<a class="header" href="articles/#'+data.url.split('/').slice(1).join('/')+'">'+data.title+'</a>';
	html += '		<div class="meta">';
	if( data.hasOwnProperty('date') ){
		// hiding the date, uncomment to show
		//html += '			<div class="ui label"><i class="calendar icon"></i> '+data.date+'</div>';
	}
	if( data.hasOwnProperty('gradeLevel') ){
		html += '			<div class="ui label"><i class="chart bar icon"></i> '+data.gradeLevel+'</div>';
	}
	if( data.hasOwnProperty('discipline') ){
		html += '			<div class="ui label">'+data.discipline+'</div>';
	}
	if( data.hasOwnProperty('tags') ){
		var tags = data.tags.split(',');
		for( var i=0, l=tags.length; i<l; i+=1 ){
			// hiding tags, uncomment to show
			//html += '			<div class="ui label">'+tags[i].trim()+'</div>';
		}
	}
	html += '		</div>';
	if( data.hasOwnProperty('description') ){
		html += '		<div class="description">';
		html += '			<p>'+data.description+'</p>';
		html += '		</div>';
	}
	html += '		<div class="extra">';
	html += '			<div style="background-color:#14ad16;" class="ui right floated olive button compact" data-link-url="articles/?exercise=subjects#'+data.url.split('/').slice(1).join('/')+'">';
	html += '				Subjects and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated blue button compact" data-link-url="articles/?exercise=xwords#'+data.url.split('/').slice(1).join('/')+'">';
	html += '				Find the X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated pink button compact" data-link-url="articles/?exercise=verbs#'+data.url.split('/').slice(1).join('/')+'">';
	html += '				Verbs and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated red button compact" data-link-url="articles/?exercise=hidden-x-words#'+data.url.split('/').slice(1).join('/')+'">';
	html += '				Find the Hidden X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated teal button compact" data-link-url="articles/?exercise=sentence-patterns#'+data.url.split('/').slice(1).join('/')+'">';
	html += '				Sentence patterns';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	return html
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
		// Filter and sort by date (YYYY-MM-DD) newest first
		var articles = data.articles.filter( function(a){ return a.isOnHome; } );
		articles = articles.sort( function(a,b){
			if( a.date == b.date ){
				return 0;
			}else if( a.date < b.date ){
				return 1;
			}else{
				return -1;
			}
		});
		var html = '';
		for( var i=0, l=articles.length; i<l; i+=1 ){
			if( articles[i].isOnHome ){
				html += generate_article_link( articles[i] );
			}
		}
		$('#article-container').html( html );
		
		// Do somethine with the articles that belong in the random section
		var randoms = data.articles.filter( function(a){ return a.isInRandom; } );
		// TODO: add more code...
		
		// Setup search
		ArticleSearch();
	});
	$('#article-container').on('click','.button',function(){
		window.location.href = $(this).data('link-url');
	});
});

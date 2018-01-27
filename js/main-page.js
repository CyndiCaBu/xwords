function generate_article_link( data ){
	var html = '';
	html += '<div class="item">';
	html += '	<div class="image">';
	html += '		<img src="'+data.url+'/image.jpg">';
	html += '	</div>';
	html += '	<div class="content">';
	html += '		<a class="header" href="articles/#'+data.url.split('/').slice(1).join('/')+'">'+data.title+'</a>';
	html += '		<div class="meta">';
	html += '			<span class="cinema">WHAT?</span>';
	html += '		</div>';
	html += '		<div class="description">';
	html += '			<p></p>';
	html += '		</div>';
	html += '		<div class="extra">';
	html += '			<img class="ui right floated blue button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=xwords" src="style/images/xwords.jpg" />';
	html += '			<img class="ui right floated red button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=hidden-x-words" src="style/images/hidden-xwords.jpg" />';
	html += '			<img class="ui right floated olive button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=subjects" src="style/images/subjects.jpg" />';
	html += '			<img class="ui right floated pink button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=verbs" src="style/images/verbs.jpg" />';
	html += '			<img class="ui right floated teal button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=sentence-patterns" src="style/images/sentence-patterns.jpg" />';
	/*
	html += '			<div class="ui right floated blue button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=xwords">';
	html += '				Find the X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated red button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=hidden-x-words">';
	html += '				Find the Hidden X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated olive button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=subjects">';
	html += '				Subjects and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated pink button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=verbs">';
	html += '				Verbs and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated teal button compact" data-link-url="articles/#'+data.url.split('/').slice(1).join('/')+'?exercise=sentence-patterns">';
	html += '				Sentence patterns';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	*/
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
		var html = '';
		for( var i=0, l=data.articles.length; i<l; i+=1 ){
			html += generate_article_link( data.articles[i] );
		}
		$('#article-container').html( html );
	});
	$('#article-container').on('click','.button',function(){
		window.location.href = $(this).data('link-url');
	});
});

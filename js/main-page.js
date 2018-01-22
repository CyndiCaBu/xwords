function generate_article_link( data ){
	var html = '';
	html += '<div class="item">';
	html += '	<div class="image">';
	html += '		<img src="'+data.url+'/image.jpg">';
	html += '	</div>';
	html += '	<div class="content">';
	html += '		<a class="header">'+data.title+'</a>';
	html += '		<div class="meta">';
	html += '			<span class="cinema">WHAT?</span>';
	html += '		</div>';
	html += '		<div class="description">';
	html += '			<p></p>';
	html += '		</div>';
	html += '		<div class="extra">';
	html += '			<div class="ui right floated blue button compact">';
	html += '				Find the X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated red button compact">';
	html += '				Find the Hidden X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated olive button compact">';
	html += '				Subjects and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated pink button compact">';
	html += '				Verbs and X-Words';
	html += '				<i class="right chevron icon"></i>';
	html += '			</div>';
	html += '			<div class="ui right floated teal button compact">';
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
		var data = JSON.parse(response);
		var html = '';
		for( var i=0, l=data.articles.length; i<l; i+=1 ){
			html += generate_article_link( data.articles[i] );
		}
		$('#article-container').html( html );
		console.info( data );
	});
});
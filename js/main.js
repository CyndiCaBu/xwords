
function updateCounts(content){
	var total = XWords.total(content);
	$('#x-words-total').html( total );
	$('#x-words-found').html( XWords.numberFound(content) );
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
var articleUrl = pathParts.slice(nParts-2).join('/');
var exercise = titleCase( pathParts[nParts-3].replace(/-/g,' ') );
var category = titleCase( pathParts[nParts-2].replace(/-/g,' ') );
var article = titleCase( pathParts[nParts-1].replace(/-/g,' ') );
$('#breadcrumb-category').html( category )[0].href = '../../#'+pathParts[nParts-2];
$('#breadcrumb-article').html( article );
$('#article-title').html( article );
$('title').html( article +' - X-Words Grammar' );
$.get( '../../../articles/'+articleUrl+'content.html', function(response){
	$('.x-words-content').html( response );
	$('#article-image')[0].src = '../../../articles/'+articleUrl+'image.jpg';
	$('#article-icon')[0].src = '../../../articles/'+articleUrl+'image.jpg';
	XWords.setup( '.x-words-content' );
	updateCounts( '.x-words-content' );
} );

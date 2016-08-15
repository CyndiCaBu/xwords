
import json
import glob
import os

if __name__ == '__main__':
	contentType = 'x-words'
	rootPath = '../articles/'
	resultDir = '../%s' % contentType
	folders = [ x.replace(rootPath,'') for x in glob.glob('%s*' % rootPath) ]
	# Create each section
	sections = []
	for f in folders:
		dirPath = '%s/%s/' % (rootPath,f)
		articles = [ x.replace(dirPath,'') for x in glob.glob( '%s*' % dirPath ) ]
		articleLinks = []
		for article in articles:
			with open( '%s/%s/%s/info.json' % (rootPath, f, article) ) as jf:
				meta = json.loads( jf.read() )
			# grab the article info from a json file?
			articleLinks.append('''
				<a class="ui card" href="{pageUrl}">
					<div class="image">
						<img src="{imageUrl}">
					</div>
					<div class="content">
						<span class="header">{title}</span>
						<span class="meta">{discipline}</span>;
						<span class="meta">{tags}</span>
						<div class="description">{description}</div>
					</div>
					<div class="extra content">
						<i class="line chart icon"></i>Level: {gradeLevel}
					</div>
				</a>
			'''.format(
				pageUrl = '/%s/%s' % (contentType, article),
				imageUrl = '%s/%s/%s/image.jpg' % (rootPath, f, article),
				title = article.replace('-',' ').title(),
				description = meta['description'],
				tags = meta['tags'],
				discipline = meta['discipline'],
				gradeLevel = meta['gradeLevel']
			).replace('\t'*4,''))
		sections.append( '''
			<h2>{sectionTitle}</h2>
			<div class="ui three cards">
				{sectionContent}
			</div>
		'''.format(
			sectionTitle = f.replace('-',' ').title(),
			sectionContent = '\n'.join( articleLinks )
		))

	#os.mkdir( resultDir )
	with open( '%s/index.html' % resultDir, 'w' ) as f:
		f.write('''
			<!DOCTYPE html>
			<html>
			<head>
				<!-- Standard Meta -->
				<meta charset="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

				<!-- Site Properties -->
				<title>X Words Grammar</title>

				<link rel="stylesheet" type="text/css" href="../libs/Semantic-UI-CSS/semantic.min.css">
				<link rel="stylesheet" type="text/css" href="../style/main.css">
				<link rel="stylesheet" type="text/css" href="../style/xwords.css">

				<script src="../libs/jquery.min.js" ></script>
				<script src="../libs/Semantic-UI-CSS/semantic.min.js"></script>
				<script src="../libs/list.js"></script>

			</head>
			<body>
				<div class="ui text container fluid main-column">
					<div class="ui fluid styled listjs-list">
						<h1 class="ui dividing header">X-Words</h1>
						{content}
					</div>
				</div>
			</body>

			</html>
		'''.format(
			content = '\n'.join( sections )
		))


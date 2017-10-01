# xwords
https://cyndicabu.github.io/xwords/

## Organization

The top level directories are:

	./articles/
	./exercises/
	./js/
	./style/
	./libs/
	./misc/

Note: i left the `xwords/` top level directory until i create the
`exercises/` directory.

They have the following purpose:
	./articles/ - text, markup, image, and meta data for every article
	./exercises/ - place holder for exercise templates
	./js/ - holds custom javascript files created for xworrds
	./style/ - holds custom css files created for xwords
	./libs/ - holds external libraries for xwords
	./misc/ - everything else

Some have specific structures:

	./articles/
		category/article-title/
			image.jpg - image to be used with the article
			raw.txt - raw (ie unmarked, just plain) text of the article 
			info.json - data that describes the article (like keywords and description)
			markup.txt - xwords markup version of the article

	./libs/name-of-library-v-0.0.1/all-of-the-stuff-for-that-library

Some useful things:

	
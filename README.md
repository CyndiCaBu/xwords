# xwords

https://cyndicabu.github.io/xwords/

## XWords Markdown Cheatsheet

Paragraphs are separated by a blank link:

	Hello this is the first paragraph.

	And this is the second paragraph.

Special words can be marked and highlighted:

	(hidden-do)[hidden-do]
	(hidden-do)[vxo]

	(hidden-does)[hidden-does]
	(hidden-does)[vxs]

	(hidden-did)[hidden-did]
	(hidden-did)[vxd]

	(infinitive)[infinitive]
	(infinitive)[inf]

	(past-participle)[past-participle]
	(past-participle)[dtn]

	(extra-information)[extra]

	verb[verb]
	verb[v]

	xword[xword]
	xword[x]

	subject[subject]
	subject[s]

	{trunk}[trunk]
	{trunk}[t]

	linker[linker]
	linker[l]

	joiner[joiner]
	joiner[j]

	shifter[shifter]
	shifter[sh]
	
	{front-shifter}[front-shifter]
	{front-shifter}[f]

	{end-shifter}[end-shifter]
	{end-shifter}[e]


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

## Building the Site

The "main page" is a single web page. It loads a json file
(`articles/list.json`). The script (`build.py`) in the root directory
creates that json file by listing every article in the `articles/`
directory and including the relevant meta-data taken from each
article's info.json.

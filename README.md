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

Goals:
 - design home page
 - create article page template
   - determine folder structure for storage
 - automate homepage creation
 - what is involved in each exercies
 [x] finding xwords
 [x] finding subjects
 [x] finding verbs
 [x] finding hidden xwords
 [ ] change xwords/verbs to negative
     one sentence at a time
     xword/verb is highlighted already
     click -> type negative
 [ ] Time
     multiple choice for before/now
     verb (and xword) is already highlighted
     how do we want to break it up? (subjects can have xwords which have a difference time than the main thingy)
 [ ] showing number
     needs icons for 1 or many (like time)
 [ ] find infinitive
 [ ] Sentence to question
     break trunk by trunk - drag words to make question
 [ ] meaning - multiple choice - postponed

 [ ] add the ability to included multiple marks
     (v and xword, time, number)[v,x,past,many]
 
 how to handle xwords and verbs being the same thing
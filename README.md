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

TODO:
 [X] Main page replacing the image links with words
 [X] Trunk identifier exercise
 [X] Linker identifier exercise
 [X] Extra info identifier exercise
 [X] Shifter exercises, (menu entry) -> do i need to handle multiple css search classes in the FindWords class?
 [X] General Trunk [markup: trunk-time-question]; [t-p-nq]
 [ ] Time Exercises
     [X] Markup for past, now, both; t-p, t-n, t-b
 [ ] Question Exercises
     [X] Mark for questionable, no questionable; [t-nq], [t-q]
     [ ] Appropriate labels for question: VXO = do, VXS = does, VXD = did
 [ ] Add stuff for [t=] (ie t=-p, t=-n, t=-nq, etc...)
 [X] Refactor and reuse xword code in editor and games (DONT COPY/PASTE, only use 1 file)
 [X] Editor - alert to punctuation error type (ie he ran,[x] -- doesnt work, should be -- he {ran,}[x])
 [X] Editor - new line in brackets error (there should not be newlines in brackets)
 [X] Alert user when nothing exists for a particular exercise in an article
 [ ] NEGATIVES - not for now
 [X] Remove old event handlers when changing exercises
 [X] Correct URL format is "xwg.com/articles/?parameters=blah&stuff#do-it-write -- https://stackoverflow.com/questions/12682952/proper-url-forming-with-query-string-and-anchor-hashtag#12683131
 [ ] Determine optimal size for image (tell Cyndi)
 [X] Auto-find error -- newlines in brackets
 [X] Use grep to find which things are in each exercise, and test each exercise
 [ ] Make multi-word subjects (or other multi-word structures) as a single thing when dragging

 
Next steps - Create trunk-based exercises/
This means divide up article at trunks and each trunk is its own question/thingy

Time - 3 options: past, now, both - labelled on trunk, todo: list of automark indicator words

Automark list "now":
	do
	does
	can
	will
	shall
	am
	is
	are
	don't
	doesn't
	can't
	won't
	isn't
	aren't
	'm
	're
	'll

Automark Past:
	did
	had
	was
	were
	didn't
	hadn't
	wasn't
	weren't

Automark Both:
	have
	has
	haven't
	hasn't

Shifter Types:
 - make a menu for shifter finding shifters, (dont forget about end shifters too)
    (front-shifter-time)[f-t]
    (front-shifter-place)[f-p]
    (front-shifter-reason)[f-r]
    (front-shifter-condition)[f-cd]
    (front-shifter-contrast)[f-ct]

Making questions:
 - only trunks can be questions -- we take the trunks and create an exercise to make questions
 - a similar technique can be applied to make xwords/verbs negative
 - mark trunks as not being questionizable
 - by default trunks will be treated as questionizable

Change article button exercise type image with text.
 
Goals:
 [ ] Time
     multiple choice for before/now
     verb (and xword) is already highlighted
     how do we want to break it up? (subjects can have xwords which have a difference time than the main thingy
     needs additional markup (except for am, is, are, was, were, did, does, VXD, has, have)
 [ ] showing number
     needs icons for 1 or many (like time)
 [ ] find infinitive
 [ ] Sentence to question
     break trunk by trunk - drag words to make question
 [ ] meaning - multiple choice - postponed

 [ ] add the ability to included multiple marks
     (v and xword, time, number)[v,x,past,many]
 
 how to handle xwords and verbs being the same thing
import json
import glob
import os
import re
import shutil

def find_gerrund( phrase ):
	# split the phrase as spaces, assume the "ing" is the last part
	words = phrase.split()
	
	# look for be-ing words within 3 of the *ing word
	# ie "was not already waiting"
	be_words = '(am|are|is|was|were|been)'
	max_phrase_length = 3
	phrase_start_word_index = 0
	end_index = -1-max_phrase_length
	if end_index < -len(words)-1:
		end_index = -len(words)-1
	found_it = False
	for i in range(-1,end_index,-1):
		word = words[i].strip('()[]{}, -.!;:"\'')
		if re.match(be_words,word) != None:
			phrase_start_word_index = i
			found_it = True
			break
	
	if found_it:
		return ' '.join(words[len(words)+phrase_start_word_index:])
	
	return ''


if __name__ == '__main__':

	files = glob.glob('../../articles/*/content.txt')
	for fn in files:
		with open(fn) as f:
			print( '*ings in %s' % fn )
			things = re.findall( r'(\b(am|are|is|was|were|been).*?ing)', f.read())
			things = [find_gerrund(t[0]) for t in things]
			print( '\t%s' % '\n\t'.join(things) )
	

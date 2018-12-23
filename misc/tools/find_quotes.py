# -*- coding: utf-8 -*-

import json
import glob
import os
import re
import shutil

def has_quote( text ):
	if '"' in text:
		return True
	if "“" in text:
		return True
	if "”" in text:
		return True
	return False

if __name__ == '__main__':
	files = glob.glob('../../articles/*/content.txt')
	print 'Listing files with quotes...'
	for fn in files:
		with open(fn) as f:
			if has_quote( f.read() ):
				print( 'quotes in %s' % fn )

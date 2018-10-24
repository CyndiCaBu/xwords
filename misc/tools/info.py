import glob
import json
import re

if __name__ == '__main__':
	files = glob.glob( '../../articles/*' )

	data = dict()
	data['comment'] = '*** THIS IS AN AUTOGENERATED FILE DO NOT MANUALLY EDIT ***'
	data['articles'] = []
	for f in files:
		# skip anything that has a dot or double underscore in the name
		# folders should not have a dot (it indicates an extension or hidden property)
		# I use __ to denote special things
		f = f.replace('../../','')
		if '.' in f:
			continue
		if '__' in f:
			continue

		# change the slashes to forward slashed because the file
		# may be generated on any system but will be used in linux
		entry = dict(
			url = f.replace('\\','/'),
			title = f.replace('articles\\','').replace('-',' ').title(),
			date = 'YYYY-MM-DD',
			tags = [], 
			grade_level = 0,
			description = '',
			discipline = ''
		)
		
		# Load the info.json
		try:
			with open('../../%s/info.json' % f) as fh:
				info = json.loads( fh.read() )
			for key in entry:
				if key in info:
					entry[key] = info[key]
			if 'gradeLevel' in info:
				entry['grade_level'] = info['gradeLevel']
		except IOError:
			print 'Cannot open: %s/info.json' % f
		except ValueError:
			print 'Error Parsing JSON in %s/info.json' % f

		# Get the first line for a description
		try:
			with open('../../%s/content.txt' % f) as fh:
				first_line = fh.readline()
				first_line = re.sub('\[.*?\]','',first_line)
				first_line = re.sub('\[\d*','',first_line)
				first_line = re.sub('\d*\]','',first_line)
				first_line = re.sub('\(\d*','',first_line)
				first_line = re.sub('\d*\)','',first_line)
				first_line = re.sub('\{\d*','',first_line)
				first_line = re.sub('\d*\}','',first_line)
				first_line = first_line.strip()
				entry['description'] = first_line
		except IOError:
			pass

		data['articles'].append( entry )

	with open( 'all-info.json', 'w' ) as f:
		f.write( json.dumps( data, indent=2 ) )

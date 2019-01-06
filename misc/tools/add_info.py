import glob
import json

def augment_dictionary( original, extra ):
	# Adds values from `extra` to the `original` dictionary and returns a new dictionary.
	# It does not overwrite any values, only adds if they are not there.
	result = dict()
	for key in original:
		result[key] = original[key]
	for key in extra:
		if key in original:
			continue
		result[key] = extra[key]
	return result

if __name__ == '__main__':
	articles = glob.glob( '../../articles/*' )
	articles = [ a.replace('\\','/') for a  in articles ]
	
	# Dictionary data to add to the current data
	augmentation = dict(
		isOnHome = True,
		isInRandom = True
	)
	
	for a in articles:
		
		filepath = '%s/info.json' % a
		
		# Load the info.json
		try:
			with open(filepath) as fh:
				info = json.loads( fh.read() )
			new_data = augment_dictionary( info, augmentation )
		except IOError:
			print 'Cannot open: %s/info.json' % a
			continue
		except ValueError:
			print 'Error Parsing JSON in %s/info.json' % a
			continue
		
		with open(filepath,'w') as fh:
			fh.write( json.dumps( new_data, indent=2 ) )

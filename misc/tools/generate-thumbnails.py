
import glob

import PIL
from PIL import Image

if __name__ == '__main__':
	rootPath = '../../articles'
	imageName = 'image.jpg'
	thumbnailName = 'thumbnail.jpg'
	thumbnailSize = (175,95)

	folders = [ x.replace(rootPath,'') for x in glob.glob('%s/*' % rootPath) ]

	for folder in folders:
		imageFile = '%s/%s/%s' % (rootPath, folder, imageName)
		thumbnailFile = '%s/%s/%s' % (rootPath, folder, thumbnailName)
		try:
			img = Image.open( imageFile )
		except IOError:
			print('No image file: %s' % imageFile)
			continue
		print('Resizing: %s' % imageFile)
		resized = img.resize( thumbnailSize, PIL.Image.ANTIALIAS )
		resized.save( thumbnailFile )

	print('Done!')

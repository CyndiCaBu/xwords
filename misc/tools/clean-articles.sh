#!/bin/bash

# Remove all blank lines
sed -i -e '/^$/d' ../articles/*/*/content.html

# Add xw styles
sed -i -e 's/<span class="/<span class="xw /g' ../articles/*/*/content.html

# Remove text indent
sed -i -e 's/<p style="text-indent: 30pt;">/<p>/g' ../articles/*/*/content.html

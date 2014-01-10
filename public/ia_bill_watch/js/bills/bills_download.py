import os
import urllib

# We have 27 bills
for x in range(1, 28):
	# Get current direct (bills)
	owd = os.getcwd()
	# Stringify bill number
	x = str(x)
	# Make directory with each bill number (1-27)
	os.mkdir(x)
	# Change into current bill number directory
	os.chdir(x)
	# Retrieve approprate JSON file from server
	urllib.urlretrieve ('http://billtracker.c3service.com/bills/' + x + '/annotated.js', 'annotated.js')
	# Backtrack to bills directory
	os.chdir(owd)
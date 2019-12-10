import os

head = './HTML/structure/Head'
headerMenu = './HTML/structure/HeaderMenu'
footer = './HTML/structure/Footer'

openBody = './HTML/structure/openBody'
closeBody = './HTML/structure/closeBody'

contents = os.listdir('./HTML/mainContent')


i = 0
for content in contents:
	page = content.replace('main','')
	location = './HTML/fullPages/' + page + '.html'
	
	mainContent = './HTML/mainContent/' + content
	filenames = [head, openBody, headerMenu, mainContent, footer, closeBody]
	print(content, page)
	
	with open(location, 'w') as outfile:
		for fname in filenames:
			with open(fname) as infile:
				for line in infile:
					outfile.write(line)
	
	i += 1

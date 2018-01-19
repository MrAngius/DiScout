import codecs
import random
print('{\n\t"products": {')
db=codecs.open("db.csv", "r", encoding='utf-8')
header=db.readline().split(',')
products=db.readlines()
id=0
for k in range(2):
	for j in range(len(products)):
		print('\t\t"pruduct' + str(id) + '": {')
		props=products[j].split(',')
		for i in range(len(props)):
		    if(header[i]!="\n"):
		        print('\t\t\t "' + header[i] + '": "' + props[i] + '",')

		print('\t\t\t "id": "' + str(id) + '"')
		print('\t\t},')
		id=id+1
	random.shuffle(products)
print('\t}')
print('}')

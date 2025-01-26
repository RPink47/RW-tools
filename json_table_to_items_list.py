import json

def flatten(xss):
    return [x for xs in xss for x in xs]

FILE_NAME : str = "2d_object_array.json"
NEW_FILE_NAME : str = "items_list.js"

file = open(FILE_NAME)
file_contents : str = file.read()
file.close()
file_parsed = json.loads(file_contents)

items = flatten(file_parsed)
items = [item for item in items if 'name' in item]
items = dict([(item['name'], item) for item in items])
items = [item for x, item in items.items()]

new_json : str = "[\n" + ",\n".join(
    ['new Item("' + item['name'] + '", "' + item['wiki'] + '", "' + item['icon'] + '", [])'
    for item in items]) + "\n]"
out_file = open(NEW_FILE_NAME, "w")
out_file.write(new_json)
out_file.close()
import json
import re

def parse_cell(cell):
    wiki = re.search(r'href="([\w\./]*)"', cell)
    name = re.search(r'title="([ \w]*)"', cell)
    icon = re.search(r'src="([\w\./\%]*)"', cell)
    out = {}
    if wiki:
        out['wiki'] = "https://rainworld.miraheze.org" + wiki.group(1)
    if name:
        out['name'] = name.group(1)
    if icon:
        out['icon'] = "https:" + icon.group(1)
    if not (wiki and name and icon):
        out['cell'] = cell

    return out

FILE_NAME : str = "table_tagged.json"
NEW_FILE_NAME : str = "2d_object_array.json"

file = open(FILE_NAME)
file_contents : str = file.read()
file.close()
file_parsed = json.loads(file_contents)

file_parsed = [[parse_cell(cell) for cell in row] for row in file_parsed]

new_json : str = json.dumps(file_parsed, indent=4)
out_file = open(NEW_FILE_NAME, "w")
out_file.write(new_json)
out_file.close()


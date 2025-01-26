import json

def flatten(xss):
    return [x for xs in xss for x in xs]
def create_craft(x, cell, row, file_parsed):
    if 'name' in row[0] and 'name' in file_parsed[0][x] and 'name' in cell:
        return {
            'a': row[0]['name'],
            'b': file_parsed[0][x]['name'],
            'out': cell['name']
        }
    return None

FILE_NAME : str = "2d_object_array.json"
NEW_FILE_NAME : str = "crafts_list.json"

file = open(FILE_NAME)
file_contents : str = file.read()
file.close()
file_parsed = json.loads(file_contents)

crafts_list = [[create_craft(x, cell, row, file_parsed) for x, cell in enumerate(row) ] for row in file_parsed]
crafts_list = flatten(crafts_list)
crafts_list = [craft for craft in crafts_list if craft]
unique_crafts_list : list[dict[str, str]] = []
for craft in crafts_list:
    oposite_craft : dict[str, str] = {'a':craft['b'], 'b':craft['a'], 'out':craft['out']}
    if not oposite_craft in unique_crafts_list:
        unique_crafts_list.append(craft)

new_json : str = "[\n" + ",\n".join(
    ['{"a": "' + craft['a'] + '","b": "' + craft['b'] + '","out": "' + craft['out'] + '"}' for craft in unique_crafts_list]
) + "\n]"
print(new_json)
out_file = open(NEW_FILE_NAME, "w")
out_file.write(new_json)
out_file.close()
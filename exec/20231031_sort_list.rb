require 'json'
require 'time'

# Read the JSON file
file_path = File.join(Dir.pwd, 'public', 'ameblo_tohokulax08', 'list.json')
data = JSON.parse(File.read(file_path))

# Sort the array
data.sort_by! { |item| Time.parse(item['article_datetime']) }.reverse!
data.map! do |item|
  item.delete('secure')
  item['secure_type'] = 0
  item
end

# Rewrite the JSON file
File.write(file_path, JSON.pretty_generate(data))

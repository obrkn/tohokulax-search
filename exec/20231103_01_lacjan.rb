require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

file_path = File.join(Dir.pwd, 'public', 'binwan-tohoku_jugem2.json')
data = JSON.parse(File.read(file_path))

raise data.length.inspect

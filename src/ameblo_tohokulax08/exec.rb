require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

tokyo = TZInfo::Timezone.get('Asia/Tokyo')
url = 'https://ameblo.jp/asakohibi/entry-12826703914.html'
entry_id = url.slice(/entry-\d+/).slice(/\d+/)

html = URI.open(url)
doc = Nokogiri::HTML(html)

str = doc.css('script')[3]
         .inner_html
         .slice(/{"adPerf":{"spaStatus":"initial"},.*window.RESOURCE_BASE_URL/).gsub(';window.RESOURCE_BASE_URL', '')
         .strip
json = JSON.parse(str)

title = json['entryState']['entryMap'][entry_id]['entry_title']
tags = [
  'ameblo#tohokulax08',
  json['entryState']['entryMap'][entry_id]['theme_name']
]
contents = doc.css('div#entryBody').inner_text.strip

output = {
  id: SecureRandom.uuid,
  title: title,
  tags: tags,
  url: url,
  article_datetime: tokyo.to_local(Time.parse(json['entryState']['entryMap'][entry_id]['entry_created_datetime'])),
  contents: contents,
  secure: false,
  created_datetime: tokyo.to_local(Time.now)
}

File.write(File.join(Dir.pwd, 'src', 'ameblo_tohokulax08', "#{entry_id}.json"), JSON.pretty_generate(output))

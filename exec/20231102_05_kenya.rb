require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

base_url = 'https://ameblo.jp'
tag = 'passer-hiro53'
outputs = []
pages = [*1..26]
pages.each do |page|
  puts "Processing page #{page}..."
  tokyo = TZInfo::Timezone.get('Asia/Tokyo')
  url = File.join(base_url, tag, page == 1 ? 'entrylist.html' : "entrylist-#{page}.html")

  html = URI.open(url)
  doc = Nokogiri::HTML(html)

  str = doc.css('script')[3]
           .inner_html
           .slice(/{"adPerf":{"spaStatus":"initial"},.*window.RESOURCE_BASE_URL/).gsub(';window.RESOURCE_BASE_URL', '')
           .strip
  json = JSON.parse(str)
  items = doc.css('h2[data-uranus-component="entryItemTitle"] a')
  items.map do |item|
    item_path = item.attr('href')
    entry_id = item_path.slice(/entry-\d+/).slice(/\d+/)
    tags = [
      "ameblo##{tag}",
      json['entryState']['entryMap'][entry_id]['theme_name']
    ]
    outputs << {
      id: SecureRandom.uuid,
      title: json['entryState']['entryMap'][entry_id]['entry_title'],
      tags: tags,
      url: File.join(base_url, item_path),
      article_datetime: tokyo.to_local(Time.parse(json['entryState']['entryMap'][entry_id]['entry_created_datetime'])),
      secure_type: 0,
      created_datetime: tokyo.to_local(Time.now)
    }
  end
  puts "Done page #{page}!"
end

File.write(File.join(Dir.pwd, 'public', "ameblo_#{tag}", 'list.json'), JSON.pretty_generate(outputs))

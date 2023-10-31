require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

base_url = 'https://ameblo.jp'
year_months = []
[*2008..2023].each do |year|
  [*1..12].each do |month|
    year_months << "#{year}#{month.to_s.rjust(2, '0')}"
  end
end
outputs = []
year_months.each do |month_year|
  puts "Processing #{month_year}..."
  tokyo = TZInfo::Timezone.get('Asia/Tokyo')
  url = File.join(base_url, 'tohokulax08', "archive-#{month_year}.html")

  html = URI.open(url)
  doc = Nokogiri::HTML(html)

  str = doc.css('script')[2]
           .inner_html
           .slice(/{"adPerf":{"spaStatus":"initial"},.*window.RESOURCE_BASE_URL/).gsub(';window.RESOURCE_BASE_URL', '')
           .strip
  json = JSON.parse(str)
  items = doc.css('div[data-uranus-component="entryItemBody"]')

  items.map do |item|
    item_path = item.css('h2[data-uranus-component="entryItemTitle"] a').attr('href').value
    entry_id = item_path.slice(/entry-\d+/).slice(/\d+/)
    tags = [
      'ameblo#tohokulax08',
      json['entryState']['entryMap'][entry_id]['theme_name']
    ]
    outputs << {
      id: SecureRandom.uuid,
      title: item.css('h2[data-uranus-component="entryItemTitle"]').inner_text.strip,
      tags: tags,
      url: File.join(base_url, item_path),
      article_datetime: tokyo.to_local(Time.parse(json['entryState']['entryMap'][entry_id]['entry_created_datetime'])),
      secure: false,
      created_datetime: tokyo.to_local(Time.now)
    }
  end
  puts "Done #{month_year}!"
end

File.write(File.join(Dir.pwd, 'src', 'ameblo_tohokulax08', 'list.json'), JSON.pretty_generate(outputs))

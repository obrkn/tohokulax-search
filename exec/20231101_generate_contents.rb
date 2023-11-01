require 'nokogiri'
require 'open-uri'
require 'json'
require 'tzinfo'

file_path = File.join(Dir.pwd, 'public', 'ameblo_tohokulax08', 'list.json')
data = JSON.parse(File.read(file_path))
tokyo = TZInfo::Timezone.get('Asia/Tokyo')
years = [*2009..2023]
years.each do |year|
  puts '----------------------------------------'
  puts "Processing #{year}..."
  year = year.to_s
  outputs = []

  data.select { |item| item['article_datetime'][0, 4] == year }.each do |item|
    puts "Processing #{item['url']}..."
    url = item['url']
    # entry_id = url.slice(/entry-\d+/).slice(/\d+/)

    html = URI.open(url)
    doc = Nokogiri::HTML(html)

    # str = doc.css('script')[3]
    #          .inner_html
    #          .slice(/{"adPerf":{"spaStatus":"initial"},.*window.RESOURCE_BASE_URL/).gsub(';window.RESOURCE_BASE_URL', '')
    #          .strip
    # json = JSON.parse(str)

    # title = json['entryState']['entryMap'][entry_id]['entry_title']
    # tags = [
    #   'ameblo#tohokulax08',
    #   json['entryState']['entryMap'][entry_id]['theme_name']
    # ]
    contents = doc.css('div#entryBody').inner_text.strip

    outputs << {
      id: item['id'],
      title: item['title'],
      tags: item['tags'],
      url: url,
      contents: contents,
      article_datetime: item['article_datetime'],
      created_datetime: tokyo.to_local(Time.now),
      secure_type: 0
    }
    puts "Done #{item['url']}."
  end

  File.write(File.join(Dir.pwd, 'public', 'ameblo_tohokulax08', "#{year}.json"), JSON.pretty_generate(outputs))
end

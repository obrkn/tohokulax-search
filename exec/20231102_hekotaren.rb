require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

raise SecureRandom.uuid.inspect
tokyo = TZInfo::Timezone.get('Asia/Tokyo')
pages = [108]
outputs = []
pages.each do |page|
  puts '----------------------------------------'
  puts "Processing #{page}..."
  html = URI.open("http://blog.livedoor.jp/jolax/?p=#{page}")
  doc = Nokogiri::HTML(html)
  elements = doc.css('div.article-outer-3')
  raise elements.inspect

  elements.slice(1..-1).each do |element|
    article_datetime = element.css('abbr.updated').attr('title').value
    url = element.css('h2.article-title.entry-title a').attr('href').value
    title = element.css('h2.article-title.entry-title a').inner_text.strip
    contents = element.css('div.article-body-inner').inner_text.strip

    outputs << {
      id: SecureRandom.uuid,
      title: title,
      tags: ['livedoor#jolax'],
      url: url,
      contents: contents,
      article_datetime: article_datetime,
      created_datetime: tokyo.to_local(Time.now),
      secure_type: 0
    }
  end
end
File.write(File.join(Dir.pwd, 'public', 'livedoor_jolax_2.json'), JSON.pretty_generate(outputs))

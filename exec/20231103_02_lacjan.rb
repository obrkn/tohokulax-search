require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

base_url = 'http://binwan-tohoku.jugem.jp'
tag = 'binwan-tohoku#jugem'
tokyo = TZInfo::Timezone.get('Asia/Tokyo')
[*0..36].each do |page|
  outputs = []
  puts "Processing page #{page}..."
  url = File.join(base_url, page.zero? ? '' : "?page=#{page}")

  html = URI.open(url, 'Referer' => base_url)
  doc = Nokogiri::HTML(html)

  eles = doc.css('div.entry')

  eles.map do |ele|
    next if ele.css('h2.entry_title').inner_text.strip == 'スポンサーサイト'

    new_tag = ele.css('div.entry_state a').first.inner_text.strip if ele.css('div.entry_state a').first
    tags =
      if !new_tag || new_tag.match?(/\d+:\d+/)
        [tag]
      else
        [
          tag,
          new_tag
        ]
      end

    contents_html = ele.css('div.jgm_entry_desc_mark').first.to_s.gsub(/if\(navigator.userAgent[\s\S]*/, '')
    contents = Nokogiri::HTML(contents_html).inner_text.strip

    article_datetime =
      if ele.css('div.entry_date').inner_text.length.positive?
        tokyo.to_local(Time.parse(ele.css('div.entry_date').inner_text.strip.slice(0, 10)))
      else
        ''
      end
    outputs << {
      id: SecureRandom.uuid,
      title: ele.css('h2.entry_title').inner_text.strip,
      tags: tags,
      url: url,
      contents: contents,
      article_datetime: article_datetime,
      secure_type: 0,
      created_datetime: tokyo.to_local(Time.now)
    }
  end
  puts "Done page #{page}!"
  File.write(File.join(Dir.pwd, 'public', 'binwan-tohoku_jugem', "#{page}.json"),
             JSON.pretty_generate(outputs))
end

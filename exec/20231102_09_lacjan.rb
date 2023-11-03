require 'nokogiri'
require 'open-uri'
require 'json'
require 'securerandom'
require 'tzinfo'

base_url = 'http://binwan-tohoku.jugem.jp'
tag = 'binwan-tohoku#jugem'
tokyo = TZInfo::Timezone.get('Asia/Tokyo')
list = [
  ['?month=201001', 1],
  ['?month=200911', 1],
  ['?month=200910', 6],
  ['?month=200909', 8],
  ['?month=200908', 14],
  ['?month=200907', 13],
  ['?month=200906', 9],
  ['?month=200905', 11],
  ['?month=200904', 11],
  ['?month=200903', 12],
  ['?month=200902', 9],
  ['?month=200901', 16],
  ['?month=200812', 17],
  ['?month=200811', 23],
  ['?month=200810', 23],
  ['?month=200809', 14],
  ['?month=200808', 16],
  ['?month=200807', 16],
  ['?month=200806', 18],
  ['?month=200805', 30],
  ['?month=200804', 35],
  ['?month=200803', 33],
  ['?month=200802', 28]
]
outputs = []
list.each do |item|
  puts "Processing page #{item[0]}..."
  url = File.join(base_url, item[0])

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
        tokyo.to_local(Time.now)
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

  if (item[1] / 10).positive?
    (item[1] / 10).times do |i|
      url_page = File.join(base_url, "?page-#{i + 1}&month=#{item[0].slice(/\d+/)}")
      puts url_page.inspect
      html_page = URI.open(url_page, 'Referer' => base_url)
      doc_page = Nokogiri::HTML(html_page)

      eles_page = doc_page.css('div.entry')

      eles_page.map do |ele|
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
            tokyo.to_local(Time.now)
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
    end
  end
  puts "Done page #{item[0]}!"
  File.write(File.join(Dir.pwd, 'public', 'binwan-tohoku_jugem', "#{item[0].slice(/\d+/)}.json"),
             JSON.pretty_generate(outputs))
end

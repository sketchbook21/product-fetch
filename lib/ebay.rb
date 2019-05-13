require "json"
require "HTTParty"
require "pry"
require 'nokogiri'
require 'time'
require 'uri'
require 'openssl'
require 'base64'

class Ebay
  attr_accessor :response

  def initialize
  end

  def fetch(keywords)
    namespace = {
        "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
      }
      
      builder = Nokogiri::XML::Builder.new do |xml|
        xml.findCompletedItems(namespace) {
          xml.affiliate {
            xml.networkId "9"
            xml.trackingId "#{ENV["EBAY_CAMPAIGN_ID"]}"
            xml.customId "k-man"
          }
          xml.sortOrder "EndTime"
          xml.paginationInput {
            xml.entriesPerPage "10"
            xml.pageNumber "2"
          }
          xml.itemFilter {
            xml.name "Condition"
            xml.value "Used"
          }
          xml.outputSelector "PictureURLSuperSize"
          xml.keywords "#{keywords}"
        }
      end
    request_body = builder.to_xml

    url = "https://svcs.ebay.com/services/search/FindingService/v1"
    response = HTTParty.post(url, {
      :headers => {"X-EBAY-SOA-SECURITY-APPNAME" => "#{ENV["EBAY_CLIENT_ID"]}", "X-EBAY-SOA-OPERATION-NAME" => "findItemsByKeywords"},
      :body => request_body
    })

    # binding.pry
    @response = response["findItemsByKeywordsResponse"]["searchResult"]["item"]
  end

end

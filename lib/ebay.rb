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

  def fetchCurrent(search_term, sort_order, listing_type, entries_per_page, page_number)
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
          xml.sortOrder "#{sort_order}"
          xml.paginationInput {
            xml.entriesPerPage "#{entries_per_page}"
            xml.pageNumber "#{page_number}"
          }
          xml.itemFilter {
            xml.name "Condition"
            xml.value "Used"
          }
          xml.itemFilter {
            xml.name "ListingType"
            xml.value "#{listing_type}"
          }
          xml.outputSelector "PictureURLSuperSize"
          xml.outputSelector "PictureURLLarge"
          xml.outputSelector "GalleryPlusPictureURL"
          xml.keywords "#{search_term}"
        }
      end
    request_body = builder.to_xml

    url = "https://svcs.ebay.com/services/search/FindingService/v1"
    response = HTTParty.post(url, {
      :headers => {"X-EBAY-SOA-SECURITY-APPNAME" => "#{ENV["EBAY_CLIENT_ID"]}", "X-EBAY-SOA-OPERATION-NAME" => "findItemsByKeywords"},
      :body => request_body
    })

    @response = response["findItemsByKeywordsResponse"]["searchResult"]["item"]

    if @response.kind_of?(Array)
      @response.each do |item|
        price_integer = item["listingInfo"]["buyItNowPrice"]["__content__"].to_f
        price_decimal_string = '%.2f' % price_integer
        price_string_human = "$#{price_decimal_string}"
        item["buyItNowHuman"] = "#{price_string_human}"
      end
      return @response
    else
      price_integer = @response["listingInfo"]["buyItNowPrice"]["__content__"].to_f
      price_decimal_string = '%.2f' % price_integer
      price_string_human = "$#{price_decimal_string}"
      @response["buyItNowHuman"] = "#{price_string_human}"
      return @response
    end
  end

end

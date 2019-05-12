require "json"
require "HTTParty"
require "pry"
require 'nokogiri'
require 'time'
require 'uri'
require 'openssl'
require 'base64'

class SearchController < ApplicationController
  def index
    # amazon_response = amazon()
    # binding.pry

    namespace = {
      "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
    }
    
    builder = Nokogiri::XML::Builder.new do |xml|
      xml.findCompletedItems(namespace) {
        xml.affiliate {
          xml.networkId "9"
          xml.trackingId "5338529842"
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
        xml.keywords "ipad pro 64"
      }
    end
    request_body = builder.to_xml

    url = "https://svcs.ebay.com/services/search/FindingService/v1"
    response = HTTParty.post(url, {
      :headers => {"X-EBAY-SOA-SECURITY-APPNAME" => "GilbertH-neworuse-PRD-9f2fb35bc-7a1e5042", "X-EBAY-SOA-OPERATION-NAME" => "findItemsByKeywords"},
      :body => request_body
    })

    # binding.pry
    @responses = response["findItemsByKeywordsResponse"]["searchResult"]["item"]


  end

  def amazon
    # Your Access Key ID, as taken from the Your Account page
    access_key_id = "AKIAI4T3H4OHZRXNRGLQ"

    # Your Secret Key corresponding to the above ID, as taken from the Your Account page
    secret_key = "4FJl3CtfmxlvXhYP5MEQOebeLPxCrAb7RtS2WJA0"

    # The region you are interested in
    endpoint = "webservices.amazon.com"

    request_uri = "/onca/xml"

    params = {
      "Service" => "AWSECommerceService",
      "Operation" => "ItemSearch",
      "AWSAccessKeyId" => "AKIAI4T3H4OHZRXNRGLQ",
      "AssociateTag" => "neworused0a-20",
      "SearchIndex" => "All",
      "Keywords" => "jordan retro 8",
      "ResponseGroup" => "Medium"
    }

    # Set current timestamp if not set
    params["Timestamp"] = Time.now.gmtime.iso8601 if !params.key?("Timestamp")

    # Generate the canonical query
    canonical_query_string = params.sort.collect do |key, value|
      [URI.escape(key.to_s, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]")), URI.escape(value.to_s, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))].join('=')
    end.join('&')

    # Generate the string to be signed
    string_to_sign = "GET\n#{endpoint}\n#{request_uri}\n#{canonical_query_string}"

    # Generate the signature required by the Product Advertising API
    signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), secret_key, string_to_sign)).strip()

    # Generate the signed URL
    request_url = "https://#{endpoint}#{request_uri}?#{canonical_query_string}&Signature=#{URI.escape(signature, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))}"

    response = HTTParty.get(request_url)

    # amazon_response["ItemSearchResponse"]["Items"]["Item"].first["OfferSummary"]["LowestNewPrice"]["FormattedPrice"]
  end
end
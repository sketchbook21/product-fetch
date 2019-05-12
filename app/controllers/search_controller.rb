require 'ebay'

class SearchController < ApplicationController
  def index
    # amazon_response = amazon()
    # binding.pry

    ebay_fetch = Ebay.new
    @responses = ebay_fetch.fetch('ipad pro 64')

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
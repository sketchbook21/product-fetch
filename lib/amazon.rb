class Amazon
  attr_accessor :response

  def initialize
    @access_key_id = ENV["AMAZON_KEY_ID"]
    @secret_key = ENV["AMAZON_SECRET_KEY"]
    @associate_tag = ENV["AMAZON_ASSOCIATE_TAG"]
  end

  def fetch(keywords)   
    # The region you are interested in
    endpoint = "webservices.amazon.com"

    request_uri = "/onca/xml"

    params = {
      "Service" => "AWSECommerceService",
      "Operation" => "ItemSearch",
      "AWSAccessKeyId" => "#{@access_key_id}",
      "AssociateTag" => "#{@associate_tag}",
      "Condition" => "New",
      "RelationshipType" => "AuthorityTitle",
      "SearchIndex" => "All",
      "Keywords" => "#{keywords}",
      "ResponseGroup" => "Large,RelatedItems,Reviews"
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
    signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret_key, string_to_sign)).strip()

    # Generate the signed URL
    request_url = "https://#{endpoint}#{request_uri}?#{canonical_query_string}&Signature=#{URI.escape(signature, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))}"

    response_raw = HTTParty.get(request_url)

    
    response = response_raw["ItemSearchErrorResponse"] ? [] : response_raw["ItemSearchResponse"]["Items"]["Item"]
    
    # binding.pry
    
    if response.length > 0
      response.each do |item|
        if item["ItemAttributes"]["ReleaseDate"]
          release_date = Date.parse(item["ItemAttributes"]["ReleaseDate"])
          release_date_human = release_date.strftime('%m/%d/%Y')
          item["ItemAttributes"]["ReleaseDateHuman"] = release_date_human
        end
      end
    end

    return response
  end

  def related_items(item_id)
    # The region you are interested in
    endpoint = "webservices.amazon.com"

    request_uri = "/onca/xml"

    params = {
      "Service" => "AWSECommerceService",
      "Operation" => "SimilarityLookup",
      "AWSAccessKeyId" => "#{@access_key_id}",
      "AssociateTag" => "#{@associate_tag}",
      "ItemId" => "#{item_id}",
      "MerchantId" => "Amazon",
      "ResponseGroup" => "Large,RelatedItems,Reviews"
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
    signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret_key, string_to_sign)).strip()

    # Generate the signed URL
    request_url = "https://#{endpoint}#{request_uri}?#{canonical_query_string}&Signature=#{URI.escape(signature, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))}"

    response_raw = HTTParty.get(request_url)

    response = response_raw["SimilarityLookupErrorResponse"] ? [] : response_raw["SimilarityLookupResponse"]["Items"]["Item"]
  end

end

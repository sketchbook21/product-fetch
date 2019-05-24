class Ebay
  attr_accessor :response

  def initialize
  end

  def fetchCurrent(search_term, sort_order, listing_type, entries_per_page, page_number)
    namespace = {
        "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
      }
      
      builder = Nokogiri::XML::Builder.new do |xml|
        xml.findItemsByKeywordsRequest(namespace) {
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
        bin_price_integer = item["listingInfo"]["buyItNowPrice"]["__content__"].to_f
        bin_price_decimal_string = '%.2f' % bin_price_integer
        bin_price_string_human = "$#{bin_price_decimal_string}"
        item["buyItNowHuman"] = "#{bin_price_string_human}"

        auction_price_integer = item["sellingStatus"]["currentPrice"]["__content__"].to_f
        auction_price_decimal_string = '%.2f' % auction_price_integer
        auction_price_string_human = "$#{auction_price_decimal_string}"
        item["auctionHuman"] = "#{auction_price_string_human}"
      end
      return @response
    else
      bin_price_integer = @response["listingInfo"]["buyItNowPrice"]["__content__"].to_f
      bin_price_decimal_string = '%.2f' % bin_price_integer
      bin_price_string_human = "$#{bin_price_decimal_string}"
      @response["buyItNowHuman"] = "#{bin_price_string_human}"

      auction_price_integer = @response["sellingStatus"]["currentPrice"]["__content__"].to_f
      auction_price_decimal_string = '%.2f' % auction_price_integer
      auction_price_string_human = "$#{auction_price_decimal_string}"
      @response["auctionHuman"] = "#{auction_price_string_human}"
      return @response
    end
  end

  def fetchCompleted(search_term)
    namespace = {
        "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
      }
      
      builder = Nokogiri::XML::Builder.new do |xml|
        xml.findCompletedItems(namespace) {
          xml.sortOrder "StartTimeNewest"
          xml.paginationInput {
            xml.entriesPerPage "20"
            xml.pageNumber "1"
          }
          xml.itemFilter {
            xml.name "Condition"
            xml.value "Used"
          }
          xml.itemFilter {
            xml.name "SoldItemsOnly"
            xml.value "true"
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
      :headers => {"X-EBAY-SOA-SECURITY-APPNAME" => "#{ENV["EBAY_CLIENT_ID"]}", "X-EBAY-SOA-OPERATION-NAME" => "findCompletedItems"},
      :body => request_body
    })

    @response = response["findCompletedItemsResponse"]["searchResult"]["item"]

    price_array = []
    price_sum = 0
    @response.each do |item|
      item_price = item["sellingStatus"]["currentPrice"]["__content__"].to_f
      price_array << item_price
      price_sum += item_price
    end

    price_average = price_sum / @response.length
    price_average_decimal = price_average.round(2)
    price_average_human = "$#{'%.2f' % price_average}"
    @response.first["priceAvgDecimal"] = price_average_decimal
    @response.first["priceAvgHuman"] = price_average_human

    return @response
  end

end

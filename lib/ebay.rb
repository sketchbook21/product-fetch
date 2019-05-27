class Ebay
  attr_accessor :response

  def initialize
  end

  def fetchCurrent(search_term, sort_order, entries_per_page, page_number)
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
            xml.name "ListingType"
            xml.value "AuctionWithBIN"
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
    
    response_array = response["findItemsByKeywordsResponse"]["searchResult"]["item"]
    
    # binding.pry

    @response_active = []

    if response_array
      response_array.each do |item|
        if item["condition"]["conditionId"] != "1000"
          @response_active << item
        end
      end
    end

    # binding.pry

    if @response_active.length < 16
      search_number = 16 - @response_active.length
      
      namespace_two = {
        "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
      }
      
      builder_two = Nokogiri::XML::Builder.new do |xml|
        xml.findItemsByKeywordsRequest(namespace) {
          xml.affiliate {
            xml.networkId "9"
            xml.trackingId "#{ENV["EBAY_CAMPAIGN_ID"]}"
            xml.customId "k-man"
          }
          xml.sortOrder "#{sort_order}"
          xml.paginationInput {
            xml.entriesPerPage "#{search_number}"
            xml.pageNumber "1"
          }
          xml.itemFilter {
            xml.name "Condition"
            xml.value "Used"
          }
          xml.outputSelector "PictureURLSuperSize"
          xml.outputSelector "PictureURLLarge"
          xml.outputSelector "GalleryPlusPictureURL"
          xml.keywords "#{search_term}"
        }
      end
      request_body_two = builder_two.to_xml

      url_two = "https://svcs.ebay.com/services/search/FindingService/v1"
      response_two = HTTParty.post(url, {
        :headers => {"X-EBAY-SOA-SECURITY-APPNAME" => "#{ENV["EBAY_CLIENT_ID"]}", "X-EBAY-SOA-OPERATION-NAME" => "findItemsByKeywords"},
        :body => request_body_two
      })
      
      response_array_two = response_two["findItemsByKeywordsResponse"]["searchResult"]["item"]

      response_array_two.each do |item|
        @response_active << item
      end

      @response_active
    else
      @response_active = @response_active[0 ... 16]
    end

    @response_active.each do |item|
      if item["listingInfo"]["buyItNowPrice"]
        bin_price_integer = item["listingInfo"]["buyItNowPrice"]["__content__"].to_f
        bin_price_decimal_string = '%.2f' % bin_price_integer
        bin_price_string_human = "$#{bin_price_decimal_string}"
        item["buyItNowHuman"] = "#{bin_price_string_human}"
      end

      auction_price_integer = item["sellingStatus"]["currentPrice"]["__content__"].to_f
      auction_price_decimal_string = '%.2f' % auction_price_integer
      auction_price_string_human = "$#{auction_price_decimal_string}"
      item["priceHuman"] = "#{auction_price_string_human}"

      item_end_date = DateTime.parse(item["listingInfo"]["endTime"])
      item_end_date_human = item_end_date.strftime('%B %e, %Y - %H:%M:%S')
      item["endDateHuman"] = item_end_date_human
    end
    return @response_active
  end

  def fetchCompleted(search_term)
    namespace = {
        "xmlns" => "http://www.ebay.com/marketplace/search/v1/services"
      }
      
      builder = Nokogiri::XML::Builder.new do |xml|
        xml.findCompletedItems(namespace) {
          xml.sortOrder "StartTimeNewest"
          xml.paginationInput {
            xml.entriesPerPage "15"
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
          xml.itemFilter {
            xml.name "MinBids"
            xml.value "1"
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
      item_price_human = "$#{'%.2f' % item_price}"
      item["priceHuman"] = item_price_human

      item_end_date = DateTime.parse(item["listingInfo"]["endTime"])
      item_end_date_human = item_end_date.strftime('%B %e, %Y - %H:%M:%S')
      item["endDateHuman"] = item_end_date_human
    end

    price_average = price_sum / @response.length
    price_average_decimal = price_average.round(2)
    price_average_human = "$#{'%.2f' % price_average}"
    @response.first["priceAvgDecimal"] = price_average_decimal
    @response.first["priceAvgHuman"] = price_average_human

    return @response
  end

end

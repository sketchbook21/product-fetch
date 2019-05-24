require 'ebay'
require 'amazon'

class Api::V1::SearchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    search_term = search_params[:search]

    amazon_search = Amazon.new
    amazon_response = amazon_search.fetch(search_term)
    @amazon_response_detail = amazon_response.first
    amazon_detail_price = @amazon_response_detail["ItemAttributes"]["ListPrice"]["Amount"].to_f / 100 
    
    amazon_response_similar_all = amazon_response.drop(1)
    @amazon_response_similar = amazon_response_similar_all.shift(5)

    ebay_search_detail = Ebay.new
    @ebay_response_detail = ebay_search_detail.fetchCurrent(
      search_term, 
      "BestMatch", 
      "AuctionWithBIN", 
      1, 
      1
      )

    ebay_completed_search = Ebay.new
    @ebay_response_completed = ebay_completed_search.fetchCompleted(search_term)
    @ebay_avg = @ebay_response_completed.first["priceAvgHuman"]
    ebay_avg_decimal = @ebay_response_completed.first["priceAvgDecimal"]

    ebay_avg_discount = ((1 - (ebay_avg_decimal / amazon_detail_price)) * 100).round(0)
    if ebay_avg_discount <= 1
      @ebay_avg_discount_human = "N/A"
    else
      @ebay_avg_discount_human = "#{ebay_avg_discount}%"
    end
    
    render json: {
      search: search_term, 
      amazon_detail: @amazon_response_detail, 
      amazon_similar: @amazon_response_similar,
      ebay_detail: @ebay_response_detail,
      ebay_completed: @ebay_response_completed,
      ebay_avg: @ebay_avg,
      ebay_avg_discount: @ebay_avg_discount_human
    }
  end

  private
  def search_params
    params.require(:searchTerm).permit(
      :search
    )
  end
end
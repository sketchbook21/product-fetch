require 'ebay'
require 'amazon'

class Api::V1::SearchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    search_term = search_params[:search]

    amazon_search = Amazon.new
    amazon_response = amazon_search.fetch(search_term)
    @amazon_response_detail = amazon_response.first
    amazon_detail_price = 0
    if @amazon_response_detail["ItemAttributes"]["ListPrice"]
      amazon_detail_price = @amazon_response_detail["ItemAttributes"]["ListPrice"]["Amount"].to_f / 100
    elsif @amazon_response_detail["OfferSummary"]
      amazon_detail_price = @amazon_response_detail["OfferSummary"]["LowestNewPrice"]["Amount"].to_f / 100
    end
    
    amazon_response_similar_all = amazon_response.drop(1)
    @amazon_response_similar = amazon_response_similar_all.shift(5)

    ebay_search= Ebay.new
    ebay_response = ebay_search.fetchCurrent(
      search_term, 
      "BestMatch", 
      32, 
      1
      )

    @ebay_response_detail = ebay_response.first
    @ebay_response_active = ebay_response.drop(1)

    # binding.pry

    ebay_completed_search = Ebay.new
    @ebay_response_completed = ebay_completed_search.fetchCompleted(search_term)
    @ebay_avg = @ebay_response_completed.first["priceAvgHuman"]
    ebay_avg_decimal = @ebay_response_completed.first["priceAvgDecimal"]

    ebay_avg_discount = "N/A"
    ebay_discount_calc = ((1 - (ebay_avg_decimal / amazon_detail_price)) * 100).round(0)
    if amazon_detail_price != 0
      if ebay_discount_calc > 1
        ebay_avg_discount = ebay_discount_calc
        @ebay_avg_discount_human = "#{ebay_avg_discount}%"
      end
    end
    
    render json: {
      search: search_term, 
      amazon_detail: @amazon_response_detail, 
      amazon_similar: @amazon_response_similar,
      ebay_detail: @ebay_response_detail,
      ebay_active: @ebay_response_active,
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
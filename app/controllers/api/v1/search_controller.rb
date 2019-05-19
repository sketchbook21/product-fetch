require 'ebay'
require 'amazon'

class Api::V1::SearchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    search_term = search_params[:search]

    amazon_search = Amazon.new
    amazon_response = amazon_search.fetch(search_term)
    @amazon_response_detail = amazon_response.first
    @amazon_response_similar = amazon_response.drop(1)

    ebay_search = Ebay.new
    @ebay_response_detail = ebay_search.fetchCurrent(
      search_term, 
      "BestMatch", 
      "AuctionWithBIN", 
      1, 
      1
      )
    
    render json: {
      search: search_term, 
      amazon_detail: @amazon_response_detail, 
      amazon_similar: @amazon_response_similar,
      ebay_detail: @ebay_response_detail
    }
  end

  private
  def search_params
    params.require(:searchTerm).permit(
      :search
    )
  end
end
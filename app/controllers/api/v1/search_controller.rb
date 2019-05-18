require 'ebay'
require 'amazon'

class Api::V1::SearchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    search_term = search_params[:search]

    amazon_search = Amazon.new
    amazon_response = amazon_search.fetch(search_term)
    @amazon_response_first = amazon_response.first
    @amazon_response_similar = amazon_response.drop(1)

    render json: {
      search: search_term, 
      amazon_response_first: @amazon_response_first, 
      amazon_response_similar: @amazon_response_similar
    }
  end

  private
  def search_params
    params.require(:searchTerm).permit(
      :search
    )
  end
end
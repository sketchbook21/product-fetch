require 'ebay'
require 'amazon'

class Api::V1::SearchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    search_term = search_params[:search]

    amazon_search = Amazon.new
    @amazon_response = amazon_search.fetch(search_term)

    render json: {search: search_term, amazon_response: @amazon_response}
  end

  private
  def search_params
    params.require(:searchTerm).permit(
      :search
    )
  end
end
require 'ebay'
require 'amazon'

class SearchController < ApplicationController
  def index
    # amazon_response = amazon()
    # binding.pry

    ebay_search = Ebay.new
    @ebay_response = ebay_search.fetch('ipad pro 64')

    amazon_search = Amazon.new
    @amazon_response = amazon_search.fetch('ipad pro 64')

  end
end
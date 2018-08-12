class Query

    # ==================================================
    #                      ROUTES
    # ==================================================
    require 'net/http'
    require "http"


    # get one by id
    def self.find(query, filter)
      p "in query class"
      p query
      if filter == 'any'
        filter = ''
      end
      response = HTTP.get("https://comicvine.gamespot.com/api/search/?api_key=4b0e3b0f6a9224f1f5a13f757d9514dc3f387840&format=json&sort=name:asc&limit=100&resources=" + filter + "&query=" + query)

      return response.to_s
    end


end

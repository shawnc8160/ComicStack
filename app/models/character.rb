class Character

    # add attribute readers for instance access
    attr_reader :id, :name, :deck, :icon_url, :real_name, :resource_type, :publisher, :gender

    # connect to postgres
    DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'searchstack_development'})

    # initialize options hash
    def initialize(opts = {})
        @id = opts["id"].to_i
        @name = opts["name"]
        @gender = opts["gender"].to_i
        @real_name = opts["real_name"]
        @resource_type = opts["resource_type"]
        @publisher = opts["publisher"]
        @deck = opts["deck"]
        @icon_url_id = opts["icon_url"]
    end

    def self.create(thisChar)
      results = DB.exec(
        <<-SQL
      INSERT INTO characters(id, name, deck, publisher, gender, icon_url, real_name, resource_type ) VALUES (
                 #{thisChar["id"]},
                '#{thisChar["name"]}',
                '#{thisChar["deck"] ? thisChar["deck"] : "NULL"}}',
                '#{thisChar["publisher"]}',
                 #{thisChar["gender"]},
                '#{thisChar["icon_url"]}',
                '#{thisChar["real_name"]}',
                '#{thisChar["resource_type"]}' )
          RETURNING id, name, deck, publisher, gender, icon_url, real_name, resource_type;
          SQL
      )
      newChar = results.first
          return Character.new(newChar)
    end

end
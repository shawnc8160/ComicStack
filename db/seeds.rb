# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
#likes table
create table favorites (id SERIAL, user_id INT, character_id INT);
#characters table
create table characters (id INT UNIQUE, name VARCHAR(60), deck TEXT, publisher VARCHAR(40), gender INT, icon_url VARCHAR(200), real_name VARCHAR(80), resource_type VARCHAR(15));
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

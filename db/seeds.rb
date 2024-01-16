# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user = User.create(username: 'firstAccount', password_digest: BCrypt::Password.create('firstAccount'), display_name: 'firstAccount', bio: 'firstAccount`s bio', img_url: 'https://static.displate.com/857x1200/displate/2023-01-30/6dd78505696a139e8a79efa0e4ee4c6c_f5f3a7e2709f71c53458e7250a0c2aa0.jpg')
user2 = User.create(username: 'secondAccount', password_digest: BCrypt::Password.create('secondAccount'), display_name: 'secondAccount', bio: 'secondAccount`s bio', img_url: 'https://i.imgflip.com/35bdwf.jpg')
user_post = Post.create(title: 'Austria-Hungary and the Ottoman Empire: How Enemies Became Allies', content: 'Austria-Hungary and the Ottoman Empire formed an alliance during World War I out of mutual self-interest. Both empires were facing threats from other powers and saw an opportunity to strengthen their positions by allying with each other. Austria-Hungary was concerned about the influence of Russia in the Balkans, while the Ottoman Empire was wary of Russian expansion in the Caucasus and Central Asia. Additionally, both empires hoped to gain territorial concessions and support from each other in their respective conflicts. Despite their historical differences and conflicts, the strategic considerations of the time led them to form an alliance during the war', img_url: 'https://2.bp.blogspot.com/-RnzpVhjcHiY/UoRoKb7tIjI/AAAAAAAAbWg/zgnMN8a3aYI/s1600/00hapso1.jpg')
comment1 = Comment.create(user_id: user2.id, post_id: user_post.id, content: 'Very interesting, I was not aware of Austra-Hungary`s ties to Islam.')
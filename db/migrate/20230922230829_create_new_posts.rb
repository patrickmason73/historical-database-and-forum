class CreateNewPosts < ActiveRecord::Migration[6.1]
  def change
    unless table_exists?(:posts)
    create_table :posts do |t|
      t.string  :title
      t.text    :content
      t.string  :img_url
      t.timestamps
    end
    end
  end
end

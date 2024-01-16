class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    unless table_exists?(:users)
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :display_name
      t.text   :bio
      t.string :img_url
      t.timestamps
    end
    end
  end
end

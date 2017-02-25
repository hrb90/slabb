class CreateReactions < ActiveRecord::Migration[5.0]
  def change
    create_table :reactions do |t|
      t.integer :user_id
      t.integer :message_id
      t.string :emoji_name
      t.timestamps
    end
    add_index :reactions, :message_id
    add_index :reactions, [:user_id, :message_id, :emoji_name], unique: true
  end
end

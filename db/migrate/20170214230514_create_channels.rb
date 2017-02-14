class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.text :description
      t.string :topic
      t.string :dm_hash
      t.string :channel_type, null: false, default: "channel"
      t.timestamps
    end

    add_index :channels, :name, unique: true
    add_index :channels, :dm_hash
  end
end

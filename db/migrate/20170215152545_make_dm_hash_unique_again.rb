class MakeDmHashUniqueAgain < ActiveRecord::Migration[5.0]
  def change
    remove_index :channels, :dm_hash
    add_index :channels, :dm_hash, unique: true
  end
end

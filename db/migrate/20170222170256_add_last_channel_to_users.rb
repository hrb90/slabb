class AddLastChannelToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_channel_id, :integer
  end
end

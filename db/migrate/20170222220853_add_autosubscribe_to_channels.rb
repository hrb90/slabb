class AddAutosubscribeToChannels < ActiveRecord::Migration[5.0]
  def change
    add_column :channels, :autosubscribe, :boolean, default: false
  end
end

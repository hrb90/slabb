# == Schema Information
#
# Table name: channels
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  description  :text
#  topic        :string
#  dm_hash      :string
#  channel_type :string           default("channel"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, :channel_type, presence: true
  validates :channel_type, inclusion: { in: ["channel", "dm"] }
end

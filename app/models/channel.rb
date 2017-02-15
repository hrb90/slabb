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

require "digest"

class Channel < ApplicationRecord
  validates :name, :channel_type, presence: true
  validates :channel_type, inclusion: { in: ["channel", "dm"] }

  attr_reader :dm_user_ids

  def dm_user_ids=(dms)
    @dm_user_ids = dms
    self.dm_hash = Digest::SHA256.base64digest(dms.sort.join(','))
  end
end

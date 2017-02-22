# == Schema Information
#
# Table name: channels
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  description   :text
#  topic         :string
#  dm_hash       :string
#  channel_type  :string           default("channel"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  autosubscribe :boolean          default("false")
#

require 'test_helper'

class ChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

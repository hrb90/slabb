# == Schema Information
#
# Table name: reactions
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  message_id :integer
#  emoji_name :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Reaction < ApplicationRecord
  validates :user_id, :message_id, :emoji_name, presence: true
  validates_uniqueness_of :emoji_name, scope: [:user_id, :message_id]

  belongs_to :user
  belongs_to :message
end

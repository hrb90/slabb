# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  channel_id :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  validates :author_id, :channel_id, :content, presence: true

  belongs_to :channel
  belongs_to :author,
    class_name: "User",
    primary_key: :id,
    foreign_key: :author_id
end

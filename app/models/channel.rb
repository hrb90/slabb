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

require "digest"

class Channel < ApplicationRecord
  validates :name, :channel_type, presence: true
  validates :name, uniqueness: true
  validates :name, length: { minimum: 2, maximum: 40 }
  validates :channel_type, inclusion: { in: ["channel", "dm"] }
  validates :autosubscribe, inclusion: { in: [true, false] }
  validates_format_of :name,
    with: /\A[a-z\d\-]*\z/i,
    message: "can only include lowercase letters, numbers, and hyphens",
    unless: :is_dm?
  validates_format_of :name,
    with: /\A[a-z\d].*[a-z\d]\z/i,
    message: "must begin and end with a letter or number",
    unless: :is_dm?


  after_create :make_subscriptions

  attr_reader :dm_user_ids

  def dm_user_ids=(dms)
    @dm_user_ids = dms
    self.dm_hash = Digest::SHA256.base64digest(dms.sort.join(','))
  end

  def make_subscriptions
    @dm_user_ids ||= []
    @dm_user_ids.each do |user_id|
      Subscription.create({user_id: user_id, channel_id: self.id})
    end
  end

  def is_dm?
    self.channel_type == "dm"
  end

  has_many :subscriptions, dependent: :destroy

  has_many :subscribers,
    through: :subscriptions,
    source: :user

  has_many :messages, -> { order(created_at: :desc) }, dependent: :destroy
end

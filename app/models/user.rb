# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  last_channel_id     :integer
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :username, length: { minimum: 3 }
  validates :password, length: { minimum: 8, allow_nil: true }
  validates_format_of :username,
    with: /\A[a-zA-Z][\w\.]+\z/i,
    message: "must start with a letter and can only contain letters, numbers, periods and underscores."

  before_validation :ensure_session_token

  after_create :autosubscribe

  attr_reader :password

  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_channels,
    through: :subscriptions,
    source: :channel

  has_many :messages,
    class_name: "Message",
    primary_key: :id,
    foreign_key: :author_id,
    dependent: :destroy

  has_many :reactions,
    dependent: :destroy

  has_attached_file :avatar, default_url: "default_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    stored_pass = BCrypt::Password.new(self.password_digest)
    stored_pass.is_password?(password)
  end

  def autosubscribe
    # Create self DM; it will subscribe the new user automatically
    Channel.create({name: self.username, channel_type: "dm", dm_user_ids: [self.id]})
    # Subscribe to all channels with autosubscribe = true
    auto_channels = Channel.where(autosubscribe: true)
    auto_channels.each do |channel|
      Subscription.create({user_id: self.id, channel_id: channel.id})
    end
  end

end

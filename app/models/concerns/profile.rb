# frozen_string_literal: true

require 'digest/md5'

module Profile
  extend ActiveSupport::Concern

  SIZES = {
    small:  24,
    medium: 48,
    big:    96,
  }.freeze

  def avatar_url size = :small
    gravatar_id   = Digest::MD5.hexdigest(username.downcase)
    gravatar_size = size_to_number size
    "https://secure.gravatar.com/avatar/#{gravatar_id}.png?s=#{gravatar_size}&d=retro"
  end

  def display_name
    name.presence || username
  end

  private

  def size_to_number size
    SIZES[size]
  end
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: snapshot_docs
#
#  id                :integer          not null, primary key
#  doc_id            :string(500)
#  position          :integer
#  snapshot_query_id :integer
#  explain           :text(16777215)
#

class SnapshotDoc < ActiveRecord::Base
  belongs_to :snapshot_query

  acts_as_list column: :position, add_new_at: :bottom, scope: :snapshot_query
end

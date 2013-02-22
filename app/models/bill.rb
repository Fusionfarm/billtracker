class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description, :topic_ids, :annotations_attributes

  validates_presence_of :ext_bill_id, :state, :session

  serialize :bill_data, JSON

  has_and_belongs_to_many :topics
  has_many :annotations, :dependent => :delete_all

  accepts_nested_attributes_for :annotations, :allow_destroy => true

  self.per_page = 10

  def annotated
    self.bill_data = { 'actions' => [] } if bill_data.nil?
    bill_data['reporter_description'] = reporter_description
    bill_data['topics'] = []
    topics.each do |topic|
      bill_data['topics'] << topic.name
    end

    if bill_data['actions']
      bill_data['actions'].each do |action|
        ann = annotations.select { |a| a.date.to_s(:db) == action['date'] && a.action == action['action'] }.first
        if ann
          action['text'] = ann.text
          action['url'] = ann.url
        end
      end
    end

    bill_data
  end

  def list_attributes
    {
      :bill_path => Rails.application.routes.url_helpers.bill_path(self),
      :bill_id => ext_bill_id,
      :state => state,
      :session => session,
      :reporter_description => reporter_description,
      :topics => topics.map {|t| t.name},
      :action_dates => bill_data.nil? ? {} : bill_data['action_dates'],
      :chamber => bill_data.nil? ? "" : bill_data['chamber']
    }
  end
end

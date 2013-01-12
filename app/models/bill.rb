class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description, :topic_ids, :annotations_attributes

  validates_presence_of :ext_bill_id, :state, :session

  serialize :bill_data, JSON

  has_and_belongs_to_many :topics
  has_many :annotations, :dependent => :delete_all

  accepts_nested_attributes_for :annotations, :allow_destroy => true

  def annotated
    self.bill_data = { 'actions' => [] } if self.bill_data.nil?
    self.bill_data['reporter_description'] = reporter_description
    self.bill_data['topics'] = []
    topics.each do |topic|
      self.bill_data['topics'] << topic.name
    end

    if self.bill_data['actions']
      self.bill_data['actions'].each do |action|
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
      :id => id,
      :ext_bill_id => ext_bill_id,
      :state => state,
      :session => session,
      :reporter_description => reporter_description,
      :topics => topics.map {|t| t.name}
    }
  end
end

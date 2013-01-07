class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description, :topic_ids, :annotations_attributes

  validates_presence_of :ext_bill_id, :state, :session

  serialize :bill_data, JSON

  has_and_belongs_to_many :topics
  has_many :annotations, :dependent => :delete_all

  accepts_nested_attributes_for :annotations, :allow_destroy => true

  def annotated
    bill_data['reporter_description'] = reporter_description
    bill_data['topics'] = []
    topics.each do |topic|
      bill_data['topics'] << topic.name
    end

    #TODO: this seems horribly inefficient - find a better way to map the data sets
    if bill_data['actions']
      bill_data['actions'].each do |action|
        anns = annotations.where(date: action['date'], action: action['action']).limit(1)
        ann = anns[0] if anns.size > 0
        if ann
          action['text'] = ann.text
          action['url'] = ann.url
        end
      end
    end

    bill_data
  end

  def merge_actions
    anns = Hash[annotations.to_a.map{|ann| "#{ann.date.to_s(:db)}#{ann.action}"}.zip annotations.to_a.map{|ann| ann.attributes}]
    actions = Hash[bill_data['actions'].map{|action| "#{Time.parse(action['date']).to_s(:db)}#{action['action']}"}.zip bill_data['actions'] ]

    actions.deep_merge(anns).values
  end
end

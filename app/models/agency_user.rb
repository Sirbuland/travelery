class AgencyUser < ApplicationRecord
  belongs_to :agency
  belongs_to :user

  accepts_nested_attributes_for :agency, allow_destroy: true
  accepts_nested_attributes_for :user, allow_destroy: true
  
end

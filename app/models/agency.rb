class Agency < ApplicationRecord

  has_many :agency_users, dependent: :destroy
  has_many :users, through: :agency_users, dependent: :destroy
  has_many :locations
  accepts_nested_attributes_for :locations, allow_destroy: true

end

class AddLocationIdInAgenyUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :agency_users, :location, index: true, foreign_key: true
  end
end

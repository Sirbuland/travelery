class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :phone_number
      t.string :country
      t.integer :zip
      t.references :agency, foreign_key: true

      t.timestamps
    end
  end
end

class CreateAgencies < ActiveRecord::Migration[5.1]
  def change
    create_table :agencies do |t|
      t.string :name
      t.integer :number_of_employees
      t.string :agency_type
      t.string :subdomain
      t.string :contact_email

      t.timestamps
    end
  end
end

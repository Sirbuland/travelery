class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :cell_number
      t.string :office_phone_number

      t.timestamps
    end
  end
end

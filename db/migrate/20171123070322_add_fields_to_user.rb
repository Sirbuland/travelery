class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :nic, :string, null: false, default: ""
    add_column :users, :title, :string
  end
end

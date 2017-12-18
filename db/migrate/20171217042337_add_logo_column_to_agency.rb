class AddLogoColumnToAgency < ActiveRecord::Migration[5.1]
  def change
    add_column :agencies, :logo, :string
  end
end

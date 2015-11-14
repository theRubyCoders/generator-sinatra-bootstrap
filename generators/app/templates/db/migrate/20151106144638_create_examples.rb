class CreateSites < ActiveRecord::Migration
  def change
    create_table :example do |t|
      t.string :field1
    end
  end
end

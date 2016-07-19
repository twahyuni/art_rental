class AddTitleDescLocationToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :title, :string
    add_column :galleries, :description, :text
    add_column :galleries, :location, :string

  end
end

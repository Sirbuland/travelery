class User < ApplicationRecord
  include Regexes
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :confirmable

  has_many :agency_users, dependent: :destroy
  has_many :agencies, through: :agency_users, dependent: :destroy
  accepts_nested_attributes_for :agency_users, allow_destroy: true

  validates_associated :agency_users, on: :create

  validates :password, presence: true, length: {minimum: 8, maximum: 120}, on: :create
  validates :password, confirmation: true, length: {minimum: 8, maximum: 120}, on: :update, unless: lambda{ |user| user.password.blank? }, allow_blank: true

  validates :first_name, presence: true, length: {minimum: 1, maximum: 120}, on: [:create, :update]
  validates :last_name, presence: true, length: {minimum: 1, maximum: 120}, on: [:create, :update]
  # validates :auth_token, uniqueness: true

  validates_presence_of   :email, if: :email_required?, unless: Proc.new{|u| u.encrypted_password_changed? }
  validates :email, uniqueness: true
  validates_format_of :email, with: email_regex

  def email_required?
   true
  end

end

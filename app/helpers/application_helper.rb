module ApplicationHelper
  def nodomain_root_url
    root_url(host: ENV['DOMAIN'])
  end

  def is_devise?
    self.try(:resource).present?
  end

end

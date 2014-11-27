module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | MapsTest"      
    end
  end
end

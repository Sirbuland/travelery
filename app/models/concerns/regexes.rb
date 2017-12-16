module Regexes
  extend ActiveSupport::Concern
  included do
    class << self
      def email_regex
        /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
      end

      def url_regex
        /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/i
      end

      def phone_number_regex
        /\D*([0-9]\d{2})(\D*)([0-9]\d{2})(\D*)(\d{4})\D*/i
      end
    end
  end
end

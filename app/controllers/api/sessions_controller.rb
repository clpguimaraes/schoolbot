module API
  class SessionsController < BaseController
    def create
      if authenticated_user
        authenticated_user.update(device_token: params[:device_token]) if mobile_token_registration?
        render json: {
          token: authenticated_user.authentication_token,
          email: authenticated_user.email
        }, status: 201
      else
        render json: { error: 'errors.session.invalid' }, status: 401
      end
    end

    private

    def mobile_token_registration?
      params[:device_token].present?
    end

    def authenticated_user
      @_authenticated_user ||= authenticating_user&.authenticate(password)
    end

    def authenticating_user
      if @_current_district.nil?
        User.where(email: email).where.not(confirmed_at: nil).first
      else
        current_district.users.confirmed.find_by(email: email)
      end
    end

    def email
      params.require(:user).fetch(:email).downcase.strip
    end

    def password
      params.require(:user).fetch(:password)
    end
  end
end

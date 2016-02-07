class DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
  end

  def show
  end

  def create
    @doctor = Doctor.new(doctor_params)
    if @doctor.save
      respond_to do |format|
        format.json { render json: @doctor }
        # format.html
      end
    end
  end

  def update
  end

  def edit
    @doctor = Doctor.find(params[:id])
    redirect_to root_path unless current_company.id == @doctor.company.id
  end

  def login
    if current_doctor
      redirect_to current_doctor
    elsif current_company || current_user
      redirect_to root_path
    end
  end

  def create_session
    @doctor = Doctor.find_by(email: params[:email])
    if @doctor
      if @doctor.password == Digest::MD5.hexdigest(params[:password])
        session[:doctor_id] = @doctor.id
        flash[:notice]='You successful login'
        redirect_to @doctor
      end
    else
      redirect_to root_path
    end
  end

  def logout
    reset_session
    redirect_to root_path
  end

  private

  def doctor_params
    params.require(:doctor).permit(:name, :second_name, :surname, :password, :email).merge(company_id: current_company.id)
  end
end




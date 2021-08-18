from django.urls import path
from django.urls.conf import include
from django.contrib.auth import views as auth_views
import loginapp
from . import views


urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='loginapp/LoginPage.htm'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='loginapp/LogoutPage.htm'), name='logout'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='loginapp/Password_Reset.htm'), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='loginapp/Password_Reset_Done.htm'),
         name='password_reset_done'),
    path('password-reset/confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='loginapp/Password_Reset_Confirm.htm'),
         name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='loginapp/Password_Reset_Complete.htm'),
         name='password_reset_complete'),           
    path('register/', views.register, name = 'register'),
    path('profile/',views.profile, name = 'profile'), 
]
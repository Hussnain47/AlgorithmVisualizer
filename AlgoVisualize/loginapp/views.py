from django.shortcuts import redirect, render
from django.contrib import messages
from .forms import RegisterForm;
from django.contrib.auth.decorators import login_required

def login(request):

    return render(request,'loginapp/LoginPage.htm')

def register(request):

    if request.method == 'POST':

        registerform = RegisterForm(request.POST) 
        if registerform.is_valid():
            registerform.save()
            username = registerform.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}')
            return redirect('login')
    else:
        registerform = RegisterForm()

    return render(request,'loginapp/register.htm',{'registerform':registerform})

@login_required
def profile(request):
    return render(request,'loginapp/ProfilePage.htm')
    





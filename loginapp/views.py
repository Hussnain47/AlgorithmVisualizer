from django.shortcuts import redirect, render
from django.contrib import messages
from .forms import RegisterForm,UserUpdateForm,ProfileUpdateForm;
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

    return render(request,'loginapp/Register.htm',{'registerform':registerform})

@login_required
def profile(request):
    if request.method == 'POST':
            u_form = UserUpdateForm(request.POST, instance=request.user)
            p_form = ProfileUpdateForm(request.POST, request.FILES ,instance=request.user.profile)
            if u_form.is_valid() and p_form.is_valid:
                u_form.save()
                p_form.save()
                messages.success(request, f'Your Account has been updated')
                return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'u_form':u_form,
        'p_form':p_form,
    }
    

    return render(request,'loginapp/ProfilePage.htm', context)
    





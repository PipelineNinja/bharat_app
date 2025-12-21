from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def home(request):
    return render(request, 'social/home.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'social/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'social/signup.html', {'form': form})

@login_required
def profile(request):
    return render(request, 'social/profile.html')

def demo_features(request):
    """Demo page for features"""
    return render(request, 'social/demo.html')

def wow_demo(request):
    """WOW effects demo"""
    return render(request, 'social/wow_demo.html')

def insane_demo(request):
    """INSANE visual effects demo"""
    return render(request, 'social/insane_demo.html')

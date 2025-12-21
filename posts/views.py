from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def post_list(request):
    return render(request, 'posts/list.html')

@login_required
def create_post(request):
    return render(request, 'posts/create.html')

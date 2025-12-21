from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def friend_list(request):
    return render(request, 'friends/list.html')

@login_required
def friend_requests(request):
    return render(request, 'friends/requests.html')

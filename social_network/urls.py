from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from users import views as user_views
from posts import views as post_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', user_views.home, name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='social/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', user_views.signup, name='signup'),
    path('profile/', user_views.profile, name='profile'),
    path('posts/', include('posts.urls')),
    path('friends/', include('friends.urls')),
]

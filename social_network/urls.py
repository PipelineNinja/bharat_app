"""social_network URL Configuration"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup_view, name='signup'),
    path('profile/', views.profile, name='profile'),
    
    # Demo URLs
    path('demo/', views.demo_features, name='demo_features'),
    path('wow/', views.wow_demo, name='wow_demo'),
    path('insane/', views.insane_demo, name='insane_demo'),
    
    # Include other app URLs if you have them
    # path('posts/', include('posts.urls')),
    # path('users/', include('users.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

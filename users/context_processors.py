"""
Context processors for the users app.
"""

def profile_pic(request):
    """
    Adds profile picture URL to all templates.
    Returns empty dict if user is not authenticated.
    """
    context = {}
    if request.user.is_authenticated:
        # You can add profile picture logic here
        # For now, we'll use the default avatar
        context['profile_pic'] = f"https://ui-avatars.com/api/?name={request.user.username}&background=2563eb&color=fff&size=150"
        
        # If you have a custom profile model with profile picture, you can use:
        # try:
        #     profile = request.user.profile
        #     context['profile_pic'] = profile.profile_picture.url if profile.profile_picture else None
        # except AttributeError:
        #     context['profile_pic'] = None
    return context

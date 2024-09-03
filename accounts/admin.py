from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Users

class UsersAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('phone', 'username', 'password')}),
        (_('Personal info'), {'fields': ('type',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_admin', 'is_staff_member', 'is_superuser')}),
        (_('Important dates'), {'fields': ('last_login', 'date_ajout')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'username', 'password1', 'password2', 'type', 'is_active', 'is_admin', 'is_staff_member', 'is_superuser')}
        ),
    )
    list_display = ('phone', 'username', 'type', 'is_admin', 'is_active', 'is_staff_member', 'is_superuser')
    search_fields = ('phone', 'username', 'type')
    ordering = ('phone',)

    filter_horizontal = ()
    list_filter = ('is_active', 'is_admin', 'is_superuser')

admin.site.register(Users, UsersAdmin)

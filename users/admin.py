from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "address", "created_at", "updated_at"]
    readonly_fields = ["created_at", "updated_at"]


admin.site.register(User, UserAdmin)

from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "address",
            "created_at",
            "updated_at",
        ]

    def validate_first_name(self, value):
        if not value.strip().replace(" ", "").isalpha():
            raise serializers.ValidationError(
                "First name must be an alphabetical string"
            )
        return value

    def validate_last_name(self, value):
        if not value.strip().replace(" ", "").isalpha():
            raise serializers.ValidationError(
                "Last name must be an alphabetical string"
            )
        return value

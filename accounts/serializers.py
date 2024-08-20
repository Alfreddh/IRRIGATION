from django.contrib.auth import authenticate
from rest_framework import serializers

from accounts.models import Users


class UsersCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating user."""
    class Meta:
        model = Users
        fields = ('id', 'phone', 'code', 'type', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Users.objects.create_user(
            phone=validated_data['phone'],
            code=validated_data['code'],
            password=validated_data['password'],
            type=validated_data.get('type', 'standard'),
        )
        return user

class UsersUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user."""
    class Meta:
        model = Users
        fields = ('id', 'phone', 'code', 'type')


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [
            'id', 'phone', 'code', 'type', 'date_ajout',
            'is_active', 'is_admin', 'is_staff_member',
            'is_superuser'
        ]
        read_only_fields = ['id', 'date_ajout', 'is_admin', 'is_staff_member', 'is_superuser']

    def update(self, instance, validated_data):
        # Ensure that certain fields cannot be updated if the user is not a superuser or admin
        if not instance.is_superuser and not instance.is_admin:
            validated_data.pop('is_admin', None)
            validated_data.pop('is_staff_member', None)
            validated_data.pop('is_superuser', None)

        return super().update(instance, validated_data)

class CustomLoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        phone = data.get('phone')
        password = data.get('password')

        if phone and password:
            user = authenticate(request=self.context.get('request'), phone=phone, password=password)
            if not user:
                raise serializers.ValidationError('Invalid phone number or password.')
            if not user.is_active:
                raise serializers.ValidationError('Account is inactive.')
        else:
            raise serializers.ValidationError('Must include "phone" and "password".')

        data['user'] = user
        return data

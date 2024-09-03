from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, phone, username, password=None, **extra_fields):
        if not phone:
            raise ValueError('The Phone field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(phone=phone, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone,  username, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff_member', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(phone, username, password, **extra_fields)

class Users(AbstractBaseUser):
    phone = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    date_ajout = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff_member = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone', 'username']

    def __str__(self):
        return f"Utilisateur {self.username} "

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_staff_member

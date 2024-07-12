from hello.models import CapteurHumidite, PhaseCulture, Tanque, Users
from rest_framework import serializers


class CultureSurfaceSerializer(serializers.ModelSerializer):
    nom_culture = serializers.CharField(max_length=100)
    superficie = serializers.FloatField()

    class Meta:
       # model = CultureSurface
        fields = ['nom_culture', 'superficie']


class TanqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tanque
        fields = ['type', 'capacite']

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['phone', 'type', 'code']

class CapteurHumiditeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapteurHumidite
        fields = ['reference', 'value']

class PhaseCultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseCulture
        fields = ['culture_id', 'phase','periode_phase']

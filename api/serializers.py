from hello.models import CapteurHumidite, CultureSurface, PhaseCulture, Tanque, Users
from rest_framework import serializers


class CultureSurfaceSerializerAdd(serializers.ModelSerializer):
    nom_culture = serializers.CharField(max_length=100)
    superficie = serializers.FloatField()

    class Meta:
        model = CultureSurface
        fields = ['nom_culture', 'superficie']
####get
class CultureSurfaceSerializer(serializers.ModelSerializer):
    
    nom_culture = serializers.CharField(source='culture_id.nom_culture')
    superficie = serializers.FloatField(source='surface_culture_id.superficie')

    class Meta:
        model = CultureSurface
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
    name = serializers.CharField(source='surface_culture_id.name')

    class Meta:
        model = CapteurHumidite
        fields = ['reference', 'value', 'name',]

class CapteurHumiditeSerializerAdd(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = CapteurHumidite
        fields = ['reference', 'value', 'name',]

class PhaseCultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseCulture
        fields = ['culture_id', 'phase','periode_phase']

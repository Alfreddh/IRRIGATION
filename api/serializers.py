from hello.models import Capteur, Capteur_Serre, Culture, CultureSurface, Fertilisant, Fertilisation, FrequenceRemplissage, Humidite, PhaseCroissance, PhaseCulture, PhaseFertilisation, SerreCulture, Tanque, Users
from rest_framework import serializers


class CultureSurfaceSerializerAdd(serializers.ModelSerializer):
    nom_culture = serializers.CharField(max_length=100)
    superficie = serializers.FloatField()

    class Meta:
        model = CultureSurface
        fields = ['nom_culture', 'superficie']

class CultureSurfaceSerializer(serializers.ModelSerializer):
    
    nom_culture = serializers.CharField(source='culture_id.nom_culture')
    superficie = serializers.FloatField(source='surface_culture_id.superficie')

    class Meta:
        model = CultureSurface
        fields = ['nom_culture', 'superficie']


class SerreCultureSerializer(serializers.ModelSerializer):

    class Meta:
        model = SerreCulture
        fields = ['superficie','numero_serre']


class CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = ['nom_culture']


class TanqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tanque
        fields = ['type', 'capacite']

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['phone', 'type', 'code']



class CapteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capteur
        fields = ['reference']


class Capteur_SerreSerializer(serializers.ModelSerializer):
    reference = serializers.CharField(source='capteur_id.reference')
    numero_serre = serializers.CharField(source='serre_id.numero_serre')

    class Meta:
        model = Capteur_Serre
        fields = ['reference', 'numero_serre']


class Capteur_SerreSerializerAdd(serializers.ModelSerializer):
    reference = serializers.CharField(max_length=255, )
    numero_serre = serializers.CharField(max_length=8, )

    class Meta:
        model = Capteur_Serre
        fields = ['reference', 'numero_serre']


class PhaseCultureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhaseCulture
        fields = ['culture_id', 'phase','periode_phase']


class PhaseFertilisationSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = PhaseFertilisation
        fields = ['culture_id', 'phase_fertilisation','periode_fertilisation']



class PhaseFertilisationSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = PhaseFertilisation
        fields = ['culture_id', 'phase_fertilisation','periode_fertilisation']



class PhaseCroissanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseCroissance
        fields = ['culture_id', 'phase_croissance','periode_croissance']


class PhaseCroissanceSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = PhaseCroissance
        fields = ['culture_id', 'phase_croissance','periode_croissance']



class FertilisantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilisant
        fields = ['fertilisant', 'quantite','phase_fertilisation_id']

class FertilisantSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Fertilisant
        fields = ['fertilisant', 'quantite','phase_fertilisation_id']


class FertilisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilisation
        fields = ['date_debut', 'date_fin','phase_fertilisation_id']

class FertilisationSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Fertilisation
        fields = ['date_debut', 'date_fin','phase_fertilisation_id']


class HumiditeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Humidite
        fields = ['serre_culture_id', 'valeur']

class HumiditeSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Humidite
        fields = ['serre_culture_id', 'valeur']

class FrequenceRemplissageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrequenceRemplissage
        fields = ['periode_remplissage', 'tanque_id']

class FrequenceRemplissageSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = FrequenceRemplissage
        fields = ['periode_remplissage', 'tanque_id']

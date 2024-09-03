from rest_framework import serializers
from hello.models import (
    Capteur, Serre, CapteurSerre, Tanque, CapteurTanque,
    Culture, Fertilisant, FertilisationEffectue, FrequenceRemplissage,
    HumiditeSerre, NiveauTanque, PhaseCroissance, SerreCulture
)

# Serializer for Capteur model
class CapteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capteur
        fields = ['id', 'date_ajout', 'type', 'reference', 'protocol_communication', 'precision', 'etat', 'fabricant']


# Serializer for Serre model
class SerreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serre
        fields = ['id', 'superficie', 'date_ajout', 'numero_serre']


# Serializer for CapteurSerre model
class CapteurSerreSerializer(serializers.ModelSerializer):
    capteur_reference = serializers.CharField(source='capteur.reference')
    serre_numero = serializers.CharField(source='serre.numero_serre')

    class Meta:
        model = CapteurSerre
        fields = ['id', 'date_ajout', 'capteur_reference', 'serre_numero']


# Serializer for CapteurSerre Add (when creating new records)
class CapteurSerreSerializerAdd(serializers.ModelSerializer):
    capteur_id = serializers.IntegerField()
    serre_id = serializers.IntegerField()

    class Meta:
        model = CapteurSerre
        fields = ['capteur_id', 'serre_id']


# Serializer for Tanque model
class TanqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tanque
        fields = ['id', 'type', 'capacite', 'date_ajout']


# Serializer for CapteurTanque model
class CapteurTanqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapteurTanque
        fields = ['id', 'tanque', 'capteur', 'date_ajout']


# Serializer for Culture model
class CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = ['id', 'nom_culture', 'date_ajout', 'archive', 'humidite_maximal', 'humidite_minimal']


# Serializer for Fertilisant model
class FertilisantSerializer(serializers.ModelSerializer):
    culture_name = serializers.CharField(source='culture.nom_culture')

    class Meta:
        model = Fertilisant
        fields = ['id', 'fertilisant', 'quantite', 'periode', 'culture_name', 'phase_application_engrais', 'periode_debut', 'periode_fin']


# Serializer for FertilisationEffectue model
class FertilisationEffectueSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilisationEffectue
        fields = ['id', 'date_debut', 'date_fin', 'serre_culture']


# Serializer for FrequenceRemplissage model
class FrequenceRemplissageSerializer(serializers.ModelSerializer):
    culture_name = serializers.CharField(source='culture.nom_culture')

    class Meta:
        model = FrequenceRemplissage
        fields = ['id', 'periode_remplissage', 'quantite_envoye', 'culture_name']


# Serializer for HumiditeSerre model
class HumiditeSerreSerializer(serializers.ModelSerializer):
    capteur_reference = serializers.CharField(source='capteur.reference')

    class Meta:
        model = HumiditeSerre
        fields = ['id', 'valeur', 'capteur_reference']


# Serializer for NiveauTanque model
class NiveauTanqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = NiveauTanque
        fields = ['id', 'valeur', 'date_ajout']


# Serializer for PhaseCroissance model
class PhaseCroissanceSerializer(serializers.ModelSerializer):
    culture_name = serializers.CharField(source='culture.nom_culture')

    class Meta:
        model = PhaseCroissance
        fields = ['id', 'phase_croissance', 'periode', 'culture_name', 'date_ajout']


# Serializer for SerreCulture model
class SerreCultureSerializer(serializers.ModelSerializer):
    culture_name = serializers.CharField(source='culture.nom_culture')
    serre_numero = serializers.CharField(source='serre.numero_serre')

    class Meta:
        model = SerreCulture
        fields = ['id', 'serre_numero', 'culture_name', 'phase_culture', 'date_ajout']

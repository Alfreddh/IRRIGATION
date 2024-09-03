from django.contrib import admin
from .models import (
    Capteur, Serre, CapteurSerre, Tanque, CapteurTanque,
    Culture, Fertilisant, FertilisationEffectue, FrequenceRemplissage,
    HumiditeSerre, NiveauTanque, PhaseCroissance, SerreCulture
)

@admin.register(Capteur)
class CapteurAdmin(admin.ModelAdmin):
    list_display = ('reference', 'type', 'fabricant', 'date_ajout', 'etat')
    search_fields = ('reference', 'type', 'fabricant')
    list_filter = ('protocol_communication', 'etat')

@admin.register(Serre)
class SerreAdmin(admin.ModelAdmin):
    list_display = ('numero_serre', 'superficie', 'date_ajout')
    search_fields = ('numero_serre',)
    list_filter = ('superficie',)

@admin.register(CapteurSerre)
class CapteurSerreAdmin(admin.ModelAdmin):
    list_display = ('serre', 'capteur', 'date_ajout')
    search_fields = ('serre__numero_serre', 'capteur__reference')

@admin.register(Tanque)
class TanqueAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'capacite', 'date_ajout')
    search_fields = ('type', 'capacite')
    list_filter = ('type',)

@admin.register(CapteurTanque)
class CapteurTanqueAdmin(admin.ModelAdmin):
    list_display = ('tanque', 'capteur', 'date_ajout')
    search_fields = ('tanque__id', 'capteur__reference')

@admin.register(Culture)
class CultureAdmin(admin.ModelAdmin):
    list_display = ('nom_culture', 'humidite_maximal', 'humidite_minimal', 'archive', 'date_ajout')
    search_fields = ('nom_culture',)
    list_filter = ('archive',)

@admin.register(Fertilisant)
class FertilisantAdmin(admin.ModelAdmin):
    list_display = ('fertilisant', 'quantite', 'periode', 'culture', 'phase_application_engrais', 'date_ajout')
    search_fields = ('fertilisant', 'culture__nom_culture')
    list_filter = ('phase_application_engrais',)

@admin.register(FertilisationEffectue)
class FertilisationEffectueAdmin(admin.ModelAdmin):
    list_display = ('serre_culture', 'date_debut', 'date_fin')
    search_fields = ('serre_culture__serre__numero_serre', 'serre_culture__culture__nom_culture')

@admin.register(FrequenceRemplissage)
class FrequenceRemplissageAdmin(admin.ModelAdmin):
    list_display = ('culture', 'periode_remplissage', 'quantite_envoye')
    search_fields = ('culture__nom_culture',)
    list_filter = ('periode_remplissage',)

@admin.register(HumiditeSerre)
class HumiditeSerreAdmin(admin.ModelAdmin):
    list_display = ('capteur', 'valeur')
    search_fields = ('capteur__reference',)
    list_filter = ('valeur',)

@admin.register(NiveauTanque)
class NiveauTanqueAdmin(admin.ModelAdmin):
    list_display = ('id', 'valeur', 'date_ajout')
    search_fields = ('id',)
    list_filter = ('date_ajout',)

@admin.register(PhaseCroissance)
class PhaseCroissanceAdmin(admin.ModelAdmin):
    list_display = ('phase_croissance', 'periode', 'culture', 'date_ajout')
    search_fields = ('phase_croissance', 'culture__nom_culture')
    list_filter = ('periode',)

@admin.register(SerreCulture)
class SerreCultureAdmin(admin.ModelAdmin):
    list_display = ('serre', 'culture', 'phase_culture', 'date_ajout')
    search_fields = ('serre__numero_serre', 'culture__nom_culture')
    list_filter = ('phase_culture',)

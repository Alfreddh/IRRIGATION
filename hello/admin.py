from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

@admin.register(Planche)
class PlancheAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Capteur)
class CapteurAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'reference')
    search_fields = ('reference',)
    readonly_fields = ('timestamp',)

@admin.register(SerreCulture)
class SerreCultureAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'superficie', 'numero_serre')
    search_fields = ('numero_serre',)
    readonly_fields = ('timestamp',)

@admin.register(Capteur_Serre)
class CapteurSerreAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'serre_id', 'capteur_id')
    search_fields = ('serre_id__numero_serre', 'capteur_id__reference')
    readonly_fields = ('timestamp',)

@admin.register(Culture)
class CultureAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom_culture', 'date_ajout')
    search_fields = ('nom_culture',)
    readonly_fields = ('date_ajout',)

@admin.register(CultureSurface)
class CultureSurfaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'surface_culture_id', 'culture_id')
    search_fields = ('surface_culture_id__numero_serre', 'culture_id__nom_culture')

@admin.register(PhaseCulture)
class PhaseCultureAdmin(admin.ModelAdmin):
    list_display = ('id', 'culture_id', 'phase', 'periode_phase', 'date_ajout')
    search_fields = ('phase', 'culture_id__nom_culture')
    readonly_fields = ('date_ajout',)

@admin.register(PhaseFertilisation)
class PhaseFertilisationAdmin(admin.ModelAdmin):
    list_display = ('id', 'culture_id', 'phase_fertilisation', 'periode_fertilisation', 'date_ajout')
    search_fields = ('phase_fertilisation', 'culture_id__nom_culture')
    readonly_fields = ('date_ajout',)

@admin.register(Fertilisant)
class FertilisantAdmin(admin.ModelAdmin):
    list_display = ('id', 'fertilisant', 'quantite', 'phase_fertilisation_id', 'date_ajout')
    search_fields = ('fertilisant',)
    readonly_fields = ('date_ajout',)

@admin.register(Fertilisation)
class FertilisationAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_debut', 'date_fin', 'phase_fertilisation_id')
    search_fields = ('phase_fertilisation_id__phase_fertilisation',)

@admin.register(Tanque)
class TanqueAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'capacite', 'date_ajout')
    search_fields = ('type', 'capacite')
    readonly_fields = ('date_ajout',)

@admin.register(FrequenceRemplissage)
class FrequenceRemplissageAdmin(admin.ModelAdmin):
    list_display = ('id', 'periode_remplissage', 'tanque_id')
    search_fields = ('tanque_id__type',)

@admin.register(Humidite)
class HumiditeAdmin(admin.ModelAdmin):
    list_display = ('id', 'valeur', 'serre_culture_id')
    search_fields = ('serre_culture_id__numero_serre',)

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'type', 'code', 'date_ajout')
    search_fields = ('phone', 'code')
    readonly_fields = ('date_ajout',)

@admin.register(PhaseCroissance)
class PhaseCroissanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'culture_id', 'phase_croissance', 'periode_croissance', 'date_ajout')
    search_fields = ('phase_croissance', 'culture_id__nom_culture')
    readonly_fields = ('date_ajout',)

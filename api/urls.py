from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from api import views

# Configuration de DRF-YASG pour la documentation Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Documentation de l'API pour la gestion des cultures, capteurs, serres, etc.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourapi.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Documentation Swagger et Redoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Routes pour la gestion du calendrier des cultures
    path('phases/', views.get_phases, name='get_phases'),
    path('phases/add/', views.add_phase, name='add_phase'),
    path('phases/<int:pk>/edit/', views.modifier_phase_culture, name='modifier_phase_culture'),
    path('phases/<int:pk>/delete/', views.supprimer_phase_culture, name='supprimer_phase_culture'),

    # Routes pour la gestion des liaisons cultures-serres
    path('cultures-serres/', views.liste_cultures_serres, name='liste_cultures_serres'),
    path('cultures-serres/add/', views.ajouter_culture_serre, name='ajouter_culture_serre'),
    path('cultures-serres/<int:pk>/edit/', views.modifier_culture_serre, name='modifier_culture_serre'),
    path('cultures-serres/<int:pk>/delete/', views.supprimer_culture_serre, name='supprimer_culture_serre'),

    # Routes pour la gestion des tanques
    path('tanques/', views.liste_tanques, name='liste_tanques'),
    path('tanques/add/', views.ajouter_tanque, name='ajouter_tanque'),
    path('tanques/<int:pk>/edit/', views.modifier_tanque, name='modifier_tanque'),
    path('tanques/<int:pk>/delete/', views.supprimer_tanque, name='supprimer_tanque'),

    # Routes pour la gestion des utilisateurs
    path('utilisateurs/', views.liste_utilisateurs, name='liste_utilisateurs'),
    path('utilisateurs/add/', views.ajouter_utilisateur, name='ajouter_utilisateur'),
    path('utilisateurs/<int:pk>/edit/', views.modifier_utilisateur, name='modifier_utilisateur'),

    # Routes pour la gestion des serres
    path('serres/', views.liste_serres, name='liste_serres'),
    path('serres/add/', views.ajouter_serre, name='ajouter_serre'),
    path('serres/<int:pk>/edit/', views.modifier_serre, name='modifier_serre'),
    path('serres/<int:pk>/delete/', views.supprimer_serre, name='supprimer_serre'),

    # Routes pour la gestion des capteurs
    path('capteurs/', views.liste_capteurs, name='liste_capteurs'),
    path('capteurs/add/', views.ajouter_capteur, name='ajouter_capteur'),
    path('capteurs/<int:pk>/edit/', views.modifier_capteur, name='modifier_capteur'),
    path('capteurs/<int:pk>/delete/', views.supprimer_capteur, name='supprimer_capteur'),

    # Routes pour la gestion des cultures
    path('cultures/', views.liste_cultures, name='liste_cultures'),
    path('cultures/add/', views.ajouter_culture, name='ajouter_culture'),
    path('cultures/<int:pk>/edit/', views.modifier_culture, name='modifier_culture'),
    path('cultures/<int:pk>/delete/', views.supprimer_culture, name='supprimer_culture'),

    # Routes pour la gestion des liaisons capteurs-serres
    path('capteurs-serres/', views.liste_capteurs_serres, name='liste_capteurs_serres'),
    path('capteurs-serres/add/', views.ajouter_capteur_serre, name='ajouter_capteur_serre'),
    path('capteurs-serres/<int:pk>/edit/', views.modifier_capteur_serre, name='modifier_capteur_serre'),
    path('capteurs-serres/<int:pk>/delete/', views.supprimer_capteur_serre, name='supprimer_capteur_serre'),

    # Routes pour la gestion des phases de fertilisation
    path('phases-fertilisations/', views.get_phase_fertilisations, name='get_phase_fertilisations'),
    path('phases-fertilisations/add/', views.add_phase_fertilisation, name='add_phase_fertilisation'),
    path('phases-fertilisations/<int:pk>/edit/', views.update_phase_fertilisation, name='update_phase_fertilisation'),
    path('phases-fertilisations/<int:pk>/delete/', views.delete_phase_fertilisation, name='delete_phase_fertilisation'),

    # Routes pour la gestion des phases de croissance
    path('phases-croissances/', views.get_phase_croissances, name='get_phase_croissances'),
    path('phases-croissances/add/', views.add_phase_croissance, name='add_phase_croissance'),
    path('phases-croissances/<int:pk>/edit/', views.update_phase_croissance, name='update_phase_croissance'),
    path('phases-croissances/<int:pk>/delete/', views.delete_phase_croissance, name='delete_phase_croissance'),

    # Routes pour la gestion des fertilisants
    path('fertilisants/', views.get_fertilisants, name='get_fertilisants'),
    path('fertilisants/add/', views.add_fertilisant, name='add_fertilisant'),
    path('fertilisants/<int:pk>/edit/', views.update_fertilisant, name='update_fertilisant'),
    path('fertilisants/<int:pk>/delete/', views.delete_fertilisant, name='delete_fertilisant'),

    # Routes pour la gestion des fertilisations
    path('fertilisations/', views.get_fertilisations, name='get_fertilisations'),
    path('fertilisations/add/', views.add_fertilisation, name='add_fertilisation'),
    path('fertilisations/<int:pk>/edit/', views.update_fertilisation, name='update_fertilisation'),
    path('fertilisations/<int:pk>/delete/', views.delete_fertilisation, name='delete_fertilisation'),

    # Routes pour la gestion des humidités
    path('humidites/', views.get_humidites, name='get_humidites'),
    path('humidites/add/', views.add_humidite, name='add_humidite'),
    path('humidites/<int:pk>/edit/', views.update_humidite, name='update_humidite'),
    path('humidites/<int:pk>/delete/', views.delete_humidite, name='delete_humidite'),

    # Routes pour la gestion des fréquences de remplissage
    path('frequences-remplissage/', views.get_frequences_remplissage, name='get_frequences_remplissage'),
    path('frequences-remplissage/add/', views.add_frequence_remplissage, name='add_frequence_remplissage'),
    path('frequences-remplissage/<int:pk>/edit/', views.update_frequence_remplissage, name='update_frequence_remplissage'),
    path('frequences-remplissage/<int:pk>/delete/', views.delete_frequence_remplissage, name='delete_frequence_remplissage'),
]

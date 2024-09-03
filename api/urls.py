from django.urls import path
from . import views

urlpatterns = [
    # Routes pour Capteurs
    path('capteurs/', views.liste_capteurs, name='liste_capteurs'),
    path('capteurs/ajouter/', views.ajouter_capteur, name='ajouter_capteur'),
    path('capteurs/modifier/<int:pk>/', views.modifier_capteur, name='modifier_capteur'),
    path('capteurs/supprimer/<int:pk>/', views.supprimer_capteur, name='supprimer_capteur'),

    path('capteurs-serres/', views.liste_capteurs_serres, name='liste_capteurs_serres'),
    path('capteurs-serres/ajouter/', views.ajouter_capteur_serre, name='ajouter_capteur_serre'),
    path('capteurs-serres/modifier/<int:pk>/', views.modifier_capteur_serre, name='modifier_capteur_serre'),
    path('capteurs-serres/supprimer/<int:pk>/', views.supprimer_capteur_serre, name='supprimer_capteur_serre'),

    # Routes pour Fertilisants
    path('fertilisants/', views.liste_fertilisants, name='liste_fertilisants'),
    path('fertilisants/ajouter/', views.ajouter_fertilisant, name='ajouter_fertilisant'),
    path('fertilisants/modifier/<int:pk>/', views.modifier_fertilisant, name='modifier_fertilisant'),
    path('fertilisants/supprimer/<int:pk>/', views.supprimer_fertilisant, name='supprimer_fertilisant'),

    # Ajoutez d'autres groupes de routes ici (Tanques, Serres, Cultures, etc.)
]

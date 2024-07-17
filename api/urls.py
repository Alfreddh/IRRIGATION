from django.urls import include, path
from api import views

urlpatterns = [
   
    path('api-auth/', include('rest_framework.urls')),
    
     # Gérer le calendrier des cultures
    
    path('phases/ajouter/', views.add_phase, name='add_phase_culture'),
    path('phases/modifier/<int:pk>/', views.modifier_phase_culture, name='modifier_phase_culture'),
    path('phases/supprimer/<int:pk>/', views.supprimer_phase_culture, name='supprimer_phase_culture'),
    path('phases/all/', views.get_phases, name='get_phase_culture'),

    
    # Ajouter des cultures
    
    path('cultures/modifier/<int:pk>/', views.modifier_culture, name='modifier_culture'),
    path('cultures/supprimer/<int:pk>/', views.supprimer_culture, name='supprimer_culture'),

    # Enregistrer des tanques
   
    path('tanques/supprimer/<int:pk>/', views.supprimer_tanque, name='supprimer_tanque'),

    # Ajouter un utilisateur
    path('utilisateurs/ajouter/', views.ajouter_utilisateur, name='ajouter_utilisateur'),
    path('utilisateurs/modifier/<int:pk>/', views.modifier_utilisateur, name='modifier_utilisateur'),

    # Ajouter un capteur
   
    path('capteurs/ajouter/', views.ajouter_capteur, name='ajouter_capteur'),

    ###################################################
    # path('phases/', views.liste_phases, name='liste_phases'),

   
    
    # Ajouter des cultures
    path('cultures/', views.liste_cultures, name='liste_cultures'),
    path('cultures/ajouter/', views.ajouter_culture, name='ajouter_culture'),
   

    # Enregistrer des tanques
    path('tanques/', views.liste_tanques, name='liste_tanques'),
    path('tanques/ajouter/', views.ajouter_tanque, name='ajouter_tanque'),
    

    # Ajouter un utilisateur
   
    # Ajouter un capteur
    path('capteurs/', views.liste_capteurs, name='liste_capteurs'),
   
]
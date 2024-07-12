from django.urls import include, path
from hello import views

urlpatterns = [
   
    path('api-auth/', include('rest_framework.urls')),

     # Gérer le calendrier des cultures
    path('phases/', views.liste_phases, name='liste_phases'),
    path('phases/ajouter/', views.ajouter_phase_culture, name='ajouter_phase_culture'),
   
    
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
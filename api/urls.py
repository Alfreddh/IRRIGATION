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
    path('cultures/', views.liste_cultures, name='liste_cultures'),
    path('cultures/ajouter/', views.ajouter_culture, name='ajouter_culture'), 
    path('cultures/modifier/<int:pk>/', views.modifier_culture, name='modifier_culture'),
    path('cultures/supprimer/<int:pk>/', views.supprimer_culture, name='supprimer_culture'),

    # Liaison cultures-serres
    path('cultures-serres/', views.liste_cultures_serres, name='liste_cultures_serres'),
    path('cultures-serres/ajouter/', views.ajouter_culture_serre, name='ajouter_culture_serre'), 
    path('cultures-serres/modifier/<int:pk>/', views.modifier_culture_serre, name='modifier_culture_serre'),
    path('cultures-serres/supprimer/<int:pk>/', views.supprimer_culture_serre, name='supprimer_culture_serre'),

    # Enregistrer des tanques
    path('tanques/', views.liste_tanques, name='liste_tanques'),
    path('tanques/ajouter/', views.ajouter_tanque, name='ajouter_tanque'),
    path('tanques/modifier/<int:pk>/', views.modifier_tanque, name='modifier_tanque'),
    path('tanques/supprimer/<int:pk>/', views.supprimer_tanque, name='supprimer_tanque'),

    # Ajouter un utilisateur
    path('utilisateurs/', views.liste_utilisateurs, name='liste_utilisateurs'),
    path('utilisateurs/ajouter/', views.ajouter_utilisateur, name='ajouter_utilisateur'),
    path('utilisateurs/modifier/<int:pk>/', views.modifier_utilisateur, name='modifier_utilisateur'),

    # Ajouter un capteur
    path('capteurs/', views.liste_capteurs, name='liste_capteurs'),
    path('capteurs/ajouter/', views.ajouter_capteur, name='ajouter_capteur'),
    path('capteurs/modifier/<int:pk>/', views.modifier_capteur, name='modifier_capteur'),
    path('capteurs/supprimer/<int:pk>/', views.supprimer_capteur, name='supprimer_capteur'),

    # Ajouter une serre
    path('serres/', views.liste_serres, name='liste_serres'),
    path('serres/ajouter/', views.ajouter_serre, name='ajouter_serre'),
    path('serres/modifier/<int:pk>/', views.modifier_serre, name='modifier_serre'),
    path('serres/supprimer/<int:pk>/', views.supprimer_serre, name='supprimer_serre'),

    # Liaison capteurs-serres
    path('capteurs-serres/', views.liste_capteurs_serres, name='liste_cultures_capteurs'),
    path('capteurs-serres/ajouter/', views.ajouter_capteur_serre, name='ajouter_capteur_serre'), 
    path('capteurs-serres/modifier/<int:pk>/', views.modifier_capteur_serre, name='modifier_capteur_serre'),
    path('capteurs-serres/supprimer/<int:pk>/', views.supprimer_capteur_serre, name='supprimer_capteur_serre'),

    #Phase de fertilisation
    path('phase-fertilisations/', views.get_phase_fertilisations, name='get_phase_fertilisations'),
    path('phase-fertilisations/ajouter/', views.add_phase_fertilisation, name='add_phase_fertilisation'),
    path('phase-fertilisations/modifier/<int:pk>/', views.update_phase_fertilisation, name='update_phase_fertilisation'),
    path('phase-fertilisations/supprimer/<int:pk>/', views.delete_phase_fertilisation, name='delete_phase_fertilisation'),

    #Phase de croissance
    path('phase-croissances/', views.get_phase_croissances, name='get_phase_croissances'),
    path('phase-croissances/ajouter/', views.add_phase_croissance, name='add_phase_croissance'),
    path('phase-croissances/modifier/<int:pk>/', views.update_phase_croissance, name='update_phase_croissance'),
    path('phase-croissances/supprimer/<int:pk>/', views.delete_phase_croissance, name='delete_phase_croissance'),

    #Fertilisant
    path('fertilisants/', views.get_fertilisants, name='get_fertilisants'),
    path('fertilisants/ajouter/', views.add_fertilisant, name='add_fertilisant'),
    path('fertilisants/modifier/<int:pk>/', views.update_fertilisant, name='update_fertilisant'),
    path('fertilisants/supprimer/<int:pk>/', views.delete_fertilisant, name='delete_fertilisant'),

    #Fertilisation
    path('fertilisations/', views.get_fertilisations, name='get_fertilisations'),
    path('fertilisations/ajouter/', views.add_fertilisation, name='add_fertilisation'),
    path('fertilisations/modifier/<int:pk>/', views.update_fertilisation, name='update_fertilisation'),
    path('fertilisations/supprimer/<int:pk>/', views.delete_fertilisation, name='delete_fertilisation'),

    #Humidite
    path('humidites/', views.get_humidites, name='get_humidites'),
    path('humidites/ajouter/', views.add_humidite, name='add_humidite'),
    path('humidites/modifier/<int:pk>/', views.update_humidite, name='update_humidite'),
    path('humidites/supprimer/<int:pk>/', views.delete_humidite, name='delete_humidite'),

    #Frequence de remplissage 
    path('frequences-remplissage/', views.get_frequences_remplissage, name='get_frequences_remplissage'),
    path('frequences-remplissage/ajouter/', views.add_frequence_remplissage, name='add_frequence_remplissage'),
    path('frequences-remplissage/modifier/<int:pk>/', views.update_frequence_remplissage, name='update_frequence_remplissage'),
    path('frequences-remplissage/supprimer/<int:pk>/', views.delete_frequence_remplissage, name='delete_frequence_remplissage'),
   
]
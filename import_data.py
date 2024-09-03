import os
import django

from hello.models import (
    Capteur, Serre, CapteurSerre, Tanque, CapteurTanque, Culture, Fertilisant,
    FertilisationEffectue, FrequenceRemplissage, HumiditeSerre, NiveauTanque,
    PhaseCroissance, SerreCulture, User
)

# Initialisation de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'votre_projet.settings')
django.setup()




def import_data():
    # Insertion des données dans la table Culture
    cultures = [
        {'nom_culture': 'Tomate', 'humidite_maximal': 70, 'humidite_minimal': 60},
        {'nom_culture': 'Poivron', 'humidite_maximal': 24, 'humidite_minimal': 18},
        {'nom_culture': 'Chou', 'humidite_maximal': 80, 'humidite_minimal': 70},
        {'nom_culture': 'Melon', 'humidite_maximal': 60, 'humidite_minimal': 50}
    ]
    for culture_data in cultures:
        culture, created = Culture.objects.get_or_create(**culture_data)
        print(f"Culture {'created' if created else 'exists'}: {culture.nom_culture}")

    # Insertion des données dans la table Fertilisant
    fertilisants = [
        {'fertilisant': 'N_Azote', 'quantite': 5.0, 'periode': 14, 'culture_id': 1, 'phase_application_engrais': 'Implementation'},
        {'fertilisant': 'P_Phosphore', 'quantite': 17.0, 'periode': 14, 'culture_id': 1, 'phase_application_engrais': 'Implementation'},
        # Ajoutez les autres fertilisants ici...
    ]
    for fert_data in fertilisants:
        fert, created = Fertilisant.objects.get_or_create(**fert_data)
        print(f"Fertilisant {'created' if created else 'exists'}: {fert.fertilisant}")

    # Insertion des autres données en suivant une méthode similaire...
    # Vous pouvez suivre le même processus pour chaque modèle et ses données associées.

if __name__ == "__main__":
    import_data()

from django.shortcuts import get_object_or_404, redirect, render
from .models import Capteur, SerreCulture,Culture,CultureSurface,Tanque,PhaseCulture
from .forms import CultureSurfaceForm,TanqueForm,PhaseCultureForm

from django.views.decorators.http import require_http_methods



"""Gérer le calendrier des cultures"""
#Voir la liste (Phase, Type de culture, Periode)
def liste_phases(request):
    phases =  PhaseCulture.objects.all()
    return render(request, 'liste_phases.html', {'phases': phases})

#Ajouter
def ajouter_phase_culture(request):
    if request.method == 'POST':
        form = PhaseCultureForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_phases_culture')
    else:
        form = PhaseCultureForm()

    return render(request, 'ajouter_phase_culture.html', {'form': form})


"""Ajouter des cultures"""
#Voir la liste (Type de culture, Superficie)

def liste_cultures(request):
    cultures =  CultureSurface.objects.all()
    return render(request, 'liste_cultures.html', {'cultures': cultures})


#Ajouter
def ajouter_culture(request):
    if request.method == 'POST':
        form = CultureSurfaceForm(request.POST)
        if form.is_valid():
            nom_culture = form.cleaned_data['nom_culture']
            superficie = form.cleaned_data['superficie']
            
            # Vérification si le nom de culture existe déjà
            if Culture.objects.filter(nom_culture=nom_culture).exists():
                error_message = f"La culture de '{nom_culture}' existe déjà."
                return render(request, 'ajouter_culture.html', {'form': form, 'error_message': error_message})

            # Création de la nouvelle culture et association avec la superficie
            culture = Culture.objects.create(nom_culture=nom_culture)
            serre_culture = SerreCulture.objects.create(superficie=superficie)
            CultureSurface.objects.create(surface_culture_id=serre_culture, culture_id=culture)

            return redirect('liste_cultures')
    else:
        form = CultureSurfaceForm()

    return render(request, 'ajouter_culture.html', {'form': form})



"""Enregistrer des tanques"""
#Voir la liste (type de tanque[F/E/F+E],niveau[eau+fertilisant])
def liste_tanques(request):
    tanques = Tanque.objects.all()
    return render(request, 'liste_tanques.html', {'tanques': tanques})

#Ajouter tanque
def ajouter_tanque(request):
    if request.method == 'POST':
        form = TanqueForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_tanques')
    else:
        form = TanqueForm()
    return render(request, 'ajouter_tanque.html', {'form': form})



"""Ajouter un utilisateur"""


"""Ajouter un capteur"""
#Voir la liste (Type de capteur, Type de culture/tanque d'eau, humidité/niveau d'eau)
def liste_capteurs(request):
    capteurs = Capteur.objects.all()
    return render(request, 'liste_capteurs.html', {'capteurs': capteurs})



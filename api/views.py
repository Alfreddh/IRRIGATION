import json

from rest_framework.decorators import api_view 
from rest_framework.response import Response 


  


from api.serializers import CapteurHumiditeSerializer, CultureSurfaceSerializer, PhaseCultureSerializer, UsersSerializer
from hello.models import Culture, CultureSurface, PhaseCulture, Tanque, Users

"""Gérer le calendrier des cultures"""
#Modifier
@api_view(['PUT']) 
def modifier_phase_culture(request, pk):
    phase = PhaseCulture.objects.filter(pk=pk).first
    if phase is None :
        return Response({'error':'Phase de culture non trouvée'}, status=400)
    serializers = PhaseCultureSerializer(request.data, instance=phase)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Phase de culture modifiée avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)

  


#Supprimer
@api_view(['DELETE']) 
def supprimer_phase_culture(request, pk):
  
    culture_phase = PhaseCulture.objects.filter(pk=pk).first
    if culture_phase is None :
        return Response({'error':'Phase de culture non trouvée'}, status=400)

    culture_phase.delete()
    return Response({'message': 'Phase de culture supprimée avec succès'})
   
    
"""Ajouter des cultures"""
#Modifier
@api_view(['PUT']) 
def modifier_culture(request, pk):
    culture_surface = CultureSurface.objects.filter(pk=pk).first
    if culture_surface is None :
        return Response({'error':'Phase de culture non trouvée'}, status=400)
    culture = culture_surface.culture_id
    serre_culture = culture_surface.surface_culture_id  
    data = json.loads(request.body)
    serializers = CultureSurfaceSerializer(data)
    if serializers.is_valid():
        nom_culture = serializers.cleaned_data['nom_culture']
        superficie = serializers.cleaned_data['superficie']

        # Vérification si le nom de culture existe déjà et n'est pas celui en cours de modification
        if Culture.objects.filter(nom_culture=nom_culture).exclude(pk=culture.pk).exists():
            return Response({'error': f"La culture de '{nom_culture}' existe déjà."}, status=400)

        # Mise à jour de la culture et de la superficie
        culture.nom_culture = nom_culture
        culture.save()
        serre_culture.superficie = superficie
        serre_culture.save()
        return Response({'message': 'Culture modifiée avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)
    

#Supprimer
@api_view(['DELETE']) 
def supprimer_culture(request, pk):  
    culture_surface = CultureSurface.objects.filter(pk=pk).first
    if culture_surface is None :
        return Response({'error':'Phase de culture non trouvée'}, status=400)
    culture_surface.delete()
    return Response({'message': 'Culture supprimée avec succès'})

    
"""Enregistrer des tanques"""

#Supprimer tanque
@api_view(['DELETE']) 
def supprimer_tanque(request, pk):
    tanque = Tanque.objects.filter(pk=pk).first
    if tanque is None :
        return Response({'error':'Tanque non trouvée'}, status=400)
    tanque.delete()
    return Response({'message': 'Tanque supprimé avec succès'})

"""Ajouter un utilisateur"""
#Ajouter
@api_view(['POST']) 
def ajouter_utilisateur(request): 
    serializers = UsersSerializer(request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Utilisateur ajouté avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)

 
#Modifier
@api_view(['PUT']) 
def modifier_utilisateur(request, pk):
    user = Users.objects.filter(pk=pk).first
    if user is None :
        return Response({'error':'Tanque non trouvée'}, status=400)
    serializers = UsersSerializer(request.data, instance=user)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Utilisateur modifié avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)



"""Ajouter un capteur"""

#Ajouter(Humidité/Niveau/H+N)
@api_view(['POST']) 
def ajouter_capteur(request):
    serializers = CapteurHumiditeSerializer(request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Capteur ajouté avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)



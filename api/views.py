import json
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from api.serializers import CapteurHumiditeSerializer, CapteurHumiditeSerializerAdd, CultureSurfaceSerializer, CultureSurfaceSerializerAdd, PhaseCultureSerializer, TanqueSerializer, UsersSerializer
from hello.models import CapteurHumidite, Culture, CultureSurface, PhaseCulture, Planche, SerreCulture, Tanque, Users

"""Gérer le calendrier des cultures"""
#Voir la liste (Phase, Type de culture, Periode)
@api_view(['GET']) 
def get_phases(request):  
    phases =  PhaseCulture.objects.all()
    data = [PhaseCultureSerializer(phase).data for phase in phases]
    return Response({'data': data})
   

#Ajouter
@api_view(['POST']) 
def add_phase(request):  
    serializers = PhaseCultureSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Phase de culture ajoutée avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)


#Modifier
@api_view(['PUT']) 
def modifier_phase_culture(request, pk):
    phase = get_object_or_404(PhaseCulture, pk=pk)
    serializer = PhaseCultureSerializer(instance=phase, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phase de culture modifiée avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 


#Supprimer
@api_view(['DELETE']) 
def supprimer_phase_culture(request, pk):
  
    culture_phase = PhaseCulture.objects.filter(pk=pk).first()
    if culture_phase is None :
        return Response({'error':'Phase de culture non trouvée'}, status=400)

    culture_phase.delete()
    return Response({'message': 'Phase de culture supprimée avec succès'})


    
"""Ajouter des cultures"""
#Voir la liste (Type de culture, Superficie)
@api_view(['GET']) 
def liste_cultures(request):
    cultures = CultureSurface.objects.all()
    data = [CultureSurfaceSerializer(culture).data for culture in cultures]
    return Response({'data': data}, status=status.HTTP_200_OK)

#Ajouter
@api_view(['POST'])
def ajouter_culture(request):
    serializer = CultureSurfaceSerializerAdd(data=request.data)
    if serializer.is_valid():
        nom_culture = serializer.validated_data['nom_culture']
        superficie = serializer.validated_data['superficie']

        # Vérification si le nom de culture existe déjà
        if Culture.objects.filter(nom_culture=nom_culture).exists():
            return Response({'error': f"La culture de '{nom_culture}' existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

        # Création de la nouvelle culture et association avec la superficie
        culture = Culture.objects.create(nom_culture=nom_culture)
        serre_culture = SerreCulture.objects.create(superficie=superficie)
        CultureSurface.objects.create(surface_culture_id=serre_culture, culture_id=culture)

        return Response({'message': 'Culture ajoutée avec succès'}, status=status.HTTP_201_CREATED)

    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#Modifier
@api_view(['PUT']) 
def modifier_culture(request, pk):
    culture_surface = get_object_or_404(CultureSurface, pk=pk)
    culture = culture_surface.culture_id
    serre_culture = culture_surface.surface_culture_id

    # Utilisez request.data pour obtenir les données JSON
    data = request.data

    # Créez une instance de serializer avec les données
    serializer = CultureSurfaceSerializerAdd(data=data)
    
    if serializer.is_valid():
        nom_culture = serializer.validated_data.get('nom_culture')
        superficie = serializer.validated_data.get('superficie')

        # Vérifiez si le nom de culture existe déjà et n'est pas celui en cours de modification
        if Culture.objects.filter(nom_culture=nom_culture).exclude(pk=culture.pk).exists():
            return Response({'error': f"La culture de '{nom_culture}' existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

        # Mise à jour de la culture et de la superficie
        culture.nom_culture = nom_culture
        culture.save()
        serre_culture.superficie = superficie
        serre_culture.save()
        return Response({'message': 'Culture modifiée avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

#Supprimer
@api_view(['DELETE']) 
def supprimer_culture(request, pk):

    
    culture_surface = CultureSurface.objects.filter(pk=pk).first()
  
    if culture_surface is None:
        return Response({'error': 'Culture non trouvée'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Récupérer les instances associées
    culture = culture_surface.culture_id
    serre_culture = culture_surface.surface_culture_id
  
    # Supprimer l'entrée de CultureSurface
    culture_surface.delete()
    
    # Supprimer les entrées associées dans Culture et SerreCulture
    culture.delete()
    serre_culture.delete()
    CultureSurface.objects.delete(surface_culture_id=serre_culture, culture_id=culture)
  
    return Response({'message': 'Culture supprimée avec succès'}, status=status.HTTP_200_OK)


"""Enregistrer des tanques"""
#Voir la liste (type de tanque[F/E/F+E],niveau[eau+fertilisant])

#Ajouter


@api_view(['GET']) 
def liste_tanques(request):
    tanques = Tanque.objects.all()
    data = [TanqueSerializer(tanque).data for tanque in tanques]
    return Response({'data': data})

#Ajouter tanque
@api_view(['POST']) 
def ajouter_tanque(request):
    serializers = TanqueSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Tanque ajouté avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)


#Supprimer tanque
@api_view(['DELETE']) 
def supprimer_tanque(request, pk):
    tanque = Tanque.objects.filter(pk=pk).first()
    if tanque is None :
        return Response({'error':'Tanque non trouvée'}, status=400)
    tanque.delete()
    return Response({'message': 'Tanque supprimé avec succès'})



"""Ajouter un utilisateur"""
#Ajouter
@api_view(['POST']) 
def ajouter_utilisateur(request):
    serializer = UsersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Utilisateur ajouté avec succès'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

 
#Modifier
@api_view(['PUT']) 
def modifier_utilisateur(request, pk):
    user = get_object_or_404(Users, pk=pk)
    serializer = UsersSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Utilisateur modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




"""Ajouter un capteur"""
#Voir la liste (Type de capteur, Type de culture/tanque d'eau, humidité/niveau d'eau)
@api_view(['GET']) 
def liste_capteurs(request):
    capteurs = CapteurHumidite.objects.all()
    data = [CapteurHumiditeSerializer(capteur).data for capteur in capteurs]
    return Response({'data': data})

#Ajouter(Humidité/Niveau/H+N)

@api_view(['POST']) 
def ajouter_capteur(request):
    serializer = CapteurHumiditeSerializerAdd(data=request.data)
    if serializer.is_valid():
        name = serializer.validated_data['name']

        
        if Planche.objects.filter(name=name).exists():
            return Response({'error': f"La planche '{name}' existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

        value = serializer.validated_data['value']
        reference = serializer.validated_data['reference']
        planche =Planche.objects.create(name=name)
        CapteurHumidite.objects.create(surface_culture_id = planche, reference = reference, value = value)

        return Response({'message': 'Capteur ajouté avec succès'}, status=status.HTTP_201_CREATED)

    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
import json
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from api.serializers import Capteur_SerreSerializer, Capteur_SerreSerializerAdd,CapteurSerializer, CultureSerializer, CultureSurfaceSerializer, CultureSurfaceSerializerAdd, FertilisantSerializer, FertilisationSerializer, FrequenceRemplissageSerializer, HumiditeSerializer, PhaseCroissanceSerializer, PhaseCultureSerializer, PhaseFertilisationSerializer, SerreCultureSerializer, TanqueSerializer, UsersSerializer
from hello.models import Capteur, Capteur_Serre, Culture, CultureSurface, Fertilisant, Fertilisation, FrequenceRemplissage, Humidite, PhaseCroissance, PhaseCulture, PhaseFertilisation, Planche, SerreCulture, Tanque, Users

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


    
"""Liaison cultures-serres"""
#Voir la liste (Type de culture, Superficie)
@api_view(['GET']) 
def liste_cultures_serres(request):
    cultures = CultureSurface.objects.all()
    data = [CultureSurfaceSerializer(culture).data for culture in cultures]
    return Response({'data': data}, status=status.HTTP_200_OK)

#Ajouter
@api_view(['POST'])
def ajouter_culture_serre(request):
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
def modifier_culture_serre(request, pk):
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
def supprimer_culture_serre(request, pk):

    
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
    
#Modifier tanque
@api_view(['PUT']) 
def modifier_tanque(request, pk):
    tanque = get_object_or_404(Tanque, pk=pk)
    serializer = TanqueSerializer(instance=tanque, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Tanque modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 



#Supprimer tanque
@api_view(['DELETE']) 
def supprimer_tanque(request, pk):
    tanque = Tanque.objects.filter(pk=pk).first()
    if tanque is None :
        return Response({'error':'Tanque non trouvé'}, status=400)
    tanque.delete()
    return Response({'message': 'Tanque supprimé avec succès'})



"""Ajouter un utilisateur"""
#Voir la liste 
@api_view(['GET']) 
def liste_utilisateurs(request):
    users = Users.objects.all()
    data = [UsersSerializer(user).data for user in users]
    return Response({'data': data})


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




"""Ajouter une serre"""
#Voir la liste 
@api_view(['GET']) 
def liste_serres(request):
    serres = SerreCulture.objects.all()
    data = [SerreCultureSerializer(serre).data for serre in serres]
    return Response({'data': data})


#Ajouter 
@api_view(['POST']) 
def ajouter_serre(request):
    serializers = SerreCultureSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Serre ajoutée avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)
    
#Modifier 
@api_view(['PUT']) 
def modifier_serre(request, pk):
    serre = get_object_or_404(SerreCulture, pk=pk)
    serializer = SerreCultureSerializer(instance=serre, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Serre modifiée avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 



#Supprimer 
@api_view(['DELETE']) 
def supprimer_serre(request, pk):
    serre = SerreCulture.objects.filter(pk=pk).first()
    if serre is None :
        return Response({'error':'Serre non trouvée'}, status=400)
    serre.delete()
    return Response({'message': 'Serre supprimée avec succès'})


"""Ajouter un capteur"""
#Voir la liste 
@api_view(['GET']) 
def liste_capteurs(request):
    capteurs = Capteur.objects.all()
    data = [CapteurSerializer(capteur).data for capteur in capteurs]
    return Response({'data': data})


#Ajouter 
@api_view(['POST']) 
def ajouter_capteur(request):
    serializers = CapteurSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Capteur ajouté avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)
    
#Modifier 
@api_view(['PUT']) 
def modifier_capteur(request, pk):
    capteur = get_object_or_404(Capteur, pk=pk)
    serializer = CapteurSerializer(instance=capteur, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Capteur modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 



#Supprimer 
@api_view(['DELETE']) 
def supprimer_capteur(request, pk):
    capteur = Capteur.objects.filter(pk=pk).first()
    if capteur is None :
        return Response({'error':'Capteur non trouvé'}, status=400)
    capteur.delete()
    return Response({'message': 'Capteur supprimé avec succès'})




"""Ajouter une culture"""
#Voir la liste 
@api_view(['GET']) 
def liste_cultures(request):
    cultures = Culture.objects.all()
    data = [CultureSerializer(culture).data for culture in cultures]
    return Response({'data': data})


#Ajouter 
@api_view(['POST']) 
def ajouter_culture(request):
    serializers = CultureSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Culture ajoutée avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)
    
#Modifier 
@api_view(['PUT']) 
def modifier_culture(request, pk):
    culture = get_object_or_404(Culture, pk=pk)
    serializer = CultureSerializer(instance=culture, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Culture modifiée avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 



#Supprimer 
@api_view(['DELETE']) 
def supprimer_culture(request, pk):
    culture = Culture.objects.filter(pk=pk).first()
    if culture is None :
        return Response({'error':'Culture non trouvée'}, status=400)
    culture.delete()
    return Response({'message': 'Culture supprimée avec succès'})


"""Liaison capteurs-serres"""
#Voir la liste 
@api_view(['GET']) 
def liste_capteurs_serres(request):
    capteurs_serres = Capteur_Serre.objects.all()
    data = [Capteur_SerreSerializer(culture).data for culture in capteurs_serres]
    return Response({'data': data}, status=status.HTTP_200_OK)

#Ajouter
@api_view(['POST'])
def ajouter_capteur_serre(request):
    serializer = Capteur_SerreSerializerAdd(data=request.data)
    if serializer.is_valid():
        reference = serializer.validated_data['reference']
        numero_serre = serializer.validated_data['numero_serre']

        # Vérification si le nom de culture existe déjà
        if Capteur.objects.filter(reference=reference).exists():
            return Response({'error': f"Le capteur de '{reference}' existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

        # Création de la nouvelle culture et association avec la superficie
        culture = Capteur.objects.create(reference=reference)
        serre_culture = SerreCulture.objects.create(numero_serre=numero_serre)
        Capteur_Serre.objects.create(serre_id=serre_culture, capteur_id=culture)

        return Response({'message': 'Capteur ajouté avec succès'}, status=status.HTTP_201_CREATED)

    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#Modifier
@api_view(['PUT']) 
def modifier_capteur_serre(request, pk):
    capteur_serre = get_object_or_404(Capteur_Serre, pk=pk)
    capteur = capteur_serre.capteur_id
    serre_culture = capteur_serre.serre_id

    # Utilisez request.data pour obtenir les données JSON
    data = request.data

    # Créez une instance de serializer avec les données
    serializer = Capteur_SerreSerializerAdd(data=data)
    
    if serializer.is_valid():
        reference = serializer.validated_data.get('reference')
        numero_serre = serializer.validated_data.get('numero_serre')

        # Vérifiez si le nom de culture existe déjà et n'est pas celui en cours de modification
        if Culture.objects.filter(reference=reference).exclude(pk=capteur.pk).exists():
            return Response({'error': f"Le capteur '{reference}' existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

        # Mise à jour de la culture et de la superficie
        capteur.reference = reference
        capteur.save()
        serre_culture.numero_serre = numero_serre
        serre_culture.save()
        return Response({'message': 'Capteur modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

#Supprimer
@api_view(['DELETE']) 
def supprimer_capteur_serre(request, pk):

    
    capteur_serre = Capteur_Serre.objects.filter(pk=pk).first()
  
    if capteur_serre is None:
        return Response({'error': 'Capteur non trouvé'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Récupérer les instances associées
    capteur = capteur_serre.capteur_id
    serre_culture = capteur_serre.serre_id
  
    # Supprimer l'entrée de CultureSurface
    capteur_serre.delete()
    
    # Supprimer les entrées associées dans Culture et SerreCulture
    capteur.delete()
    serre_culture.delete()
    Capteur_Serre.objects.delete(serre_id=serre_culture, capteur_id=capteur)
  
    return Response({'message': 'Capteur supprimé avec succès'}, status=status.HTTP_200_OK)



"""Ajouter une phase de fertilisation"""
@api_view(['GET'])
def get_phase_fertilisations(request):
    phases = PhaseFertilisation.objects.all()
    data = [PhaseFertilisationSerializer(phase).data for phase in phases]
    return Response({'data': data})

@api_view(['POST'])
def add_phase_fertilisation(request):
    serializer = PhaseFertilisationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phase de fertilisation ajoutée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_phase_fertilisation(request, pk):
    phase = get_object_or_404(PhaseFertilisation, pk=pk)
    serializer = PhaseFertilisationSerializer(instance=phase, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phase de fertilisation modifiée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_phase_fertilisation(request, pk):
    phase = get_object_or_404(PhaseFertilisation, pk=pk)
    phase.delete()
    return Response({'message': 'Phase de fertilisation supprimée avec succès'})



"""Ajouter une phase de croissance"""
@api_view(['GET'])
def get_phase_croissances(request):
    phases = PhaseCroissance.objects.all()
    data = [PhaseCroissanceSerializer(phase).data for phase in phases]
    return Response({'data': data})

@api_view(['POST'])
def add_phase_croissance(request):
    serializer = PhaseCroissanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phase de croissance ajoutée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_phase_croissance(request, pk):
    phase = get_object_or_404(PhaseCroissance, pk=pk)
    serializer = PhaseCroissanceSerializer(instance=phase, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phase de croissance modifiée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_phase_croissance(request, pk):
    phase = get_object_or_404(PhaseCroissance, pk=pk)
    phase.delete()
    return Response({'message': 'Phase de croissance supprimée avec succès'})




"""Ajouter un fertilisant"""
@api_view(['GET'])
def get_fertilisants(request):
    fertilisants = Fertilisant.objects.all()
    data = [FertilisantSerializer(fertilisant).data for fertilisant in fertilisants]
    return Response({'data': data})

@api_view(['POST'])
def add_fertilisant(request):
    serializer = FertilisantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisant ajouté avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_fertilisant(request, pk):
    fertilisant = get_object_or_404(Fertilisant, pk=pk)
    serializer = FertilisantSerializer(instance=fertilisant, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisant modifié avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_fertilisant(request, pk):
    fertilisant = get_object_or_404(Fertilisant, pk=pk)
    fertilisant.delete()
    return Response({'message': 'Fertilisant supprimé avec succès'})

"""Fertilisation"""
@api_view(['GET'])
def get_fertilisations(request):
    fertilisations = Fertilisation.objects.all()
    data = [FertilisationSerializer(fertilisation).data for fertilisation in fertilisations]
    return Response({'data': data})

@api_view(['POST'])
def add_fertilisation(request):
    serializer = FertilisationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisation ajoutée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_fertilisation(request, pk):
    fertilisation = get_object_or_404(Fertilisation, pk=pk)
    serializer = FertilisationSerializer(instance=fertilisation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisation modifiée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_fertilisation(request, pk):
    fertilisation = get_object_or_404(Fertilisation, pk=pk)
    fertilisation.delete()
    return Response({'message': 'Fertilisation supprimée avec succès'})


"""Humidite"""
@api_view(['GET'])
def get_humidites(request):
    humidites = Humidite.objects.all()
    data = [HumiditeSerializer(humidite).data for humidite in humidites]
    return Response({'data': data})

@api_view(['POST'])
def add_humidite(request):
    serializer = HumiditeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Humidité ajoutée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_humidite(request, pk):
    humidite = get_object_or_404(Humidite, pk=pk)
    serializer = HumiditeSerializer(instance=humidite, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Humidité modifiée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_humidite(request, pk):
    humidite = get_object_or_404(Humidite, pk=pk)
    humidite.delete()
    return Response({'message': 'Humidité supprimée avec succès'})


"""Frequence de remplissage"""
@api_view(['GET'])
def get_frequences_remplissage(request):
    frequences = FrequenceRemplissage.objects.all()
    data = [FrequenceRemplissageSerializer(frequence).data for frequence in frequences]
    return Response({'data': data})

@api_view(['POST'])
def add_frequence_remplissage(request):
    serializer = FrequenceRemplissageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fréquence de remplissage ajoutée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['PUT'])
def update_frequence_remplissage(request, pk):
    frequence = get_object_or_404(FrequenceRemplissage, pk=pk)
    serializer = FrequenceRemplissageSerializer(instance=frequence, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fréquence de remplissage modifiée avec succès'})
    else:
        return Response({'errors': serializer.errors}, status=400)

@api_view(['DELETE'])
def delete_frequence_remplissage(request, pk):
    frequence = get_object_or_404(FrequenceRemplissage, pk=pk)
    frequence.delete()
    return Response({'message': 'Fréquence de remplissage supprimée avec succès'})

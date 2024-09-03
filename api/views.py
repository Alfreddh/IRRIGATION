from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from hello.models import (
    Capteur, Serre, CapteurSerre, Tanque, CapteurTanque,
    Culture, Fertilisant, FertilisationEffectue, FrequenceRemplissage,
    HumiditeSerre, NiveauTanque, PhaseCroissance, SerreCulture
)
from .serializers import (
    CapteurSerializer, SerreSerializer, CapteurSerreSerializer, CapteurSerreSerializerAdd,
    TanqueSerializer, CapteurTanqueSerializer, CultureSerializer, FertilisantSerializer,
    FertilisationEffectueSerializer, FrequenceRemplissageSerializer, HumiditeSerreSerializer,
    NiveauTanqueSerializer, PhaseCroissanceSerializer, SerreCultureSerializer
)
from drf_yasg.utils import swagger_auto_schema

# Bloc Capteurs

@swagger_auto_schema(method='get', responses={200: CapteurSerializer(many=True)})
@api_view(['GET'])
def liste_capteurs(request):
    capteurs = Capteur.objects.all()
    data = [CapteurSerializer(capteur).data for capteur in capteurs]
    return Response({'data': data})

@swagger_auto_schema(method='post', request_body=CapteurSerializer)
@api_view(['POST'])
def ajouter_capteur(request):
    serializers = CapteurSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({'message': 'Capteur ajouté avec succès'})
    else:
        return Response({'errors': serializers.errors}, status=400)

@swagger_auto_schema(method='put', request_body=CapteurSerializer)
@api_view(['PUT'])
def modifier_capteur(request, pk):
    capteur = get_object_or_404(Capteur, pk=pk)
    serializer = CapteurSerializer(instance=capteur, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Capteur modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='delete')
@api_view(['DELETE'])
def supprimer_capteur(request, pk):
    capteur = get_object_or_404(Capteur, pk=pk)
    capteur.delete()
    return Response({'message': 'Capteur supprimé avec succès'})

@swagger_auto_schema(method='get', responses={200: CapteurSerreSerializer(many=True)})
@api_view(['GET'])
def liste_capteurs_serres(request):
    capteurs_serres = CapteurSerre.objects.all()
    data = [CapteurSerreSerializer(culture).data for culture in capteurs_serres]
    return Response({'data': data}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=CapteurSerreSerializerAdd)
@api_view(['POST'])
def ajouter_capteur_serre(request):
    serializer = CapteurSerreSerializerAdd(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Capteur ajouté à la serre avec succès'}, status=status.HTTP_201_CREATED)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='put', request_body=CapteurSerreSerializerAdd)
@api_view(['PUT'])
def modifier_capteur_serre(request, pk):
    capteur_serre = get_object_or_404(CapteurSerre, pk=pk)
    serializer = CapteurSerreSerializerAdd(instance=capteur_serre, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Capteur-serre modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='delete')
@api_view(['DELETE'])
def supprimer_capteur_serre(request, pk):
    capteur_serre = get_object_or_404(CapteurSerre, pk=pk)
    capteur_serre.delete()
    return Response({'message': 'Capteur-serre supprimé avec succès'})

# Bloc Fertilisants

@swagger_auto_schema(method='get', responses={200: FertilisantSerializer(many=True)})
@api_view(['GET'])
def liste_fertilisants(request):
    fertilisants = Fertilisant.objects.all()
    data = [FertilisantSerializer(fertilisant).data for fertilisant in fertilisants]
    return Response({'data': data})

@swagger_auto_schema(method='post', request_body=FertilisantSerializer)
@api_view(['POST'])
def ajouter_fertilisant(request):
    serializer = FertilisantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisant ajouté avec succès'})
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='put', request_body=FertilisantSerializer)
@api_view(['PUT'])
def modifier_fertilisant(request, pk):
    fertilisant = get_object_or_404(Fertilisant, pk=pk)
    serializer = FertilisantSerializer(instance=fertilisant, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Fertilisant modifié avec succès'}, status=status.HTTP_200_OK)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='delete')
@api_view(['DELETE'])
def supprimer_fertilisant(request, pk):
    fertilisant = get_object_or_404(Fertilisant, pk=pk)
    fertilisant.delete()
    return Response({'message': 'Fertilisant supprimé avec succès'})

# Ajoutez d'autres blocs de la même manière, par exemple pour les Tanques, les Phases de Croissance, etc.

from django import forms
from .models import Tanque, Users,CapteurHumidite,PhaseCulture

class CultureSurfaceForm(forms.ModelForm):
    nom_culture = forms.CharField(max_length=100)
    superficie = forms.FloatField()

    class Meta:
       # model = CultureSurface
        fields = ['nom_culture', 'superficie']


class TanqueForm(forms.ModelForm):
    class Meta:
        model = Tanque
        fields = ['type', 'capacite']

class UsersForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = ['phone', 'type', 'code']

class CapteurHumiditeForm(forms.ModelForm):
    class Meta:
        model = CapteurHumidite
        fields = ['reference', 'value']

class PhaseCultureForm(forms.ModelForm):
    class Meta:
        model = PhaseCulture
        fields = ['culture_id', 'phase','periode_phase']

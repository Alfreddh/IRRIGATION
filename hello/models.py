from django.db import models


class Planche(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
#Capteur
class Capteur(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    reference = models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return f"{self.reference}"
    
 
class SerreCulture(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    superficie = models.ForeignKey(Planche, on_delete=models.CASCADE)
    numero_serre = models.CharField(max_length=8, unique=True)   

    def __str__(self):
        return f"{self.superficie}"


class Capteur_Serre(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    serre_id = models.ForeignKey(SerreCulture, on_delete=models.CASCADE)
    capteur_id = models.ForeignKey(Capteur, on_delete=models.CASCADE)
   

    def __str__(self):
        return f"{self.serre_id}"
   
class Culture(models.Model):
    id = models.AutoField(primary_key=True)
    nom_culture = models.CharField(max_length=100)
    date_ajout = models.DateTimeField(auto_now_add=True)
   
    
    def __str__(self):
        return self.nom_culture

class CultureSurface(models.Model):
    id = models.AutoField(primary_key=True)
    surface_culture_id = models.ForeignKey(SerreCulture, on_delete=models.CASCADE)
    culture_id = models.ForeignKey(Culture, on_delete=models.CASCADE)

class PhaseCulture(models.Model):
    id = models.AutoField(primary_key=True)
    culture_id = models.ForeignKey(Culture, on_delete=models.CASCADE)
    phase = models.CharField(max_length=255)
    periode_phase = models.IntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phase
    
class PhaseFertilisation(models.Model):
    id = models.AutoField(primary_key=True)
    culture_id = models.ForeignKey(Culture, on_delete=models.CASCADE)
    phase_fertilisation = models.CharField(max_length=255)
    periode_fertilisation = models.IntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phase_fertilisation
    

class Fertilisant(models.Model):
    id = models.AutoField(primary_key=True)
    fertilisant = models.CharField(max_length=255)
    quantite = models.FloatField()
    phase_fertilisation_id = models.ForeignKey(PhaseFertilisation, on_delete=models.CASCADE, null=True, blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fertilisant

class Fertilisation(models.Model):
    id = models.AutoField(primary_key=True)
    date_debut = models.DateTimeField()
    date_fin = models.DateTimeField()
    phase_fertilisation_id = models.ForeignKey(PhaseFertilisation, on_delete=models.CASCADE)

    def __str__(self):
        return f"Fertilisation {self.id}"

class Tanque(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    capacite = models.CharField(max_length=255)

    def __str__(self):
        return f"Tanque {self.id}"

class FrequenceRemplissage(models.Model):
    id = models.AutoField(primary_key=True)
    periode_remplissage = models.DateTimeField()
    tanque_id = models.ForeignKey(Tanque, on_delete=models.CASCADE)

    def __str__(self):
        return f"Frequence de remplissage {self.id}"

class Humidite(models.Model):
    id = models.AutoField(primary_key=True)
    valeur = models.FloatField()
    serre_culture_id = models.ForeignKey(SerreCulture, on_delete=models.CASCADE)

    def __str__(self):
        return f"Humidite de la serre {self.id}"





class PhaseCroissance(models.Model):
    id = models.AutoField(primary_key=True)
    culture_id = models.ForeignKey(Culture, on_delete=models.CASCADE)
    phase_croissance = models.CharField(max_length=255)
    periode_croissance = models.IntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phase_croissance

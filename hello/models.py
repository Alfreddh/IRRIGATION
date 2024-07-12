from django.db import models

class SerreCulture(models.Model):
    id = models.AutoField(primary_key=True)
    superficie = models.FloatField()
    date_ajout = models.DateTimeField(auto_now_add=True)
    pompe = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"SerreCulture {self.id}"

class Planche(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class CapteurHumidite(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    surface_culture_id = models.ForeignKey(Planche, on_delete=models.CASCADE)
    reference = models.CharField(max_length=255, unique=True)
    value = models.FloatField()

    def __str__(self):
        return f"{self.reference} - {self.value}"

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
    periode_phase = models.DateField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phase

class Fertilisant(models.Model):
    id = models.AutoField(primary_key=True)
    fertilisant = models.CharField(max_length=255)
    quantite = models.FloatField()
    phase_culture_id = models.ForeignKey(PhaseCulture, on_delete=models.CASCADE, null=True, blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fertilisant

class Fertilisation(models.Model):
    id = models.AutoField(primary_key=True)
    date_debut = models.DateTimeField()
    date_fin = models.DateTimeField()
    phase_culture_id = models.ForeignKey(PhaseCulture, on_delete=models.CASCADE)

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
        return f"FrequenceRemplissage {self.id}"

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    code = models.CharField(max_length=100, unique=True)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.id}"


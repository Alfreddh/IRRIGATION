from django.db import models


class Capteur(models.Model):
    id = models.AutoField(primary_key=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255)
    reference = models.CharField(max_length=255, unique=True)
    protocol_communication = models.CharField(max_length=255, null=True, blank=True)
    precision = models.FloatField(null=True, blank=True)
    etat = models.CharField(max_length=255, null=True, blank=True)
    fabricant = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.reference


class Serre(models.Model):
    id = models.AutoField(primary_key=True)
    superficie = models.FloatField()
    date_ajout = models.DateTimeField(auto_now_add=True)
    numero_serre = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"Serre {self.numero_serre}"


class CapteurSerre(models.Model):
    id = models.AutoField(primary_key=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    serre = models.ForeignKey(Serre, on_delete=models.CASCADE)
    capteur = models.ForeignKey(Capteur, on_delete=models.CASCADE)

    def __str__(self):
        return f"Capteur {self.capteur} dans Serre {self.serre}"


class Tanque(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    capacite = models.FloatField()

    def __str__(self):
        return f"Tanque {self.id}"


class CapteurTanque(models.Model):
    id = models.AutoField(primary_key=True)
    tanque = models.ForeignKey(Tanque, on_delete=models.CASCADE)
    capteur = models.ForeignKey(Capteur, on_delete=models.CASCADE)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Capteur {self.capteur} dans Tanque {self.tanque}"


class Culture(models.Model):
    id = models.AutoField(primary_key=True)
    nom_culture = models.CharField(max_length=100)
    date_ajout = models.DateTimeField(auto_now_add=True)
    archive = models.BooleanField(default=False)
    humidite_maximal = models.IntegerField()
    humidite_minimal = models.IntegerField()

    def __str__(self):
        return self.nom_culture


class Fertilisant(models.Model):
    id = models.AutoField(primary_key=True)
    fertilisant = models.CharField(max_length=255)
    quantite = models.FloatField()
    date_ajout = models.DateTimeField(auto_now_add=True)
    periode = models.IntegerField()
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE)
    phase_application_engrais = models.CharField(max_length=255)
    periode_debut = models.IntegerField(null=True, blank=True)
    periode_fin = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.fertilisant


class FertilisationEffectue(models.Model):
    id = models.AutoField(primary_key=True)
    date_debut = models.DateTimeField()
    date_fin = models.DateTimeField()
    serre_culture = models.ForeignKey('SerreCulture', on_delete=models.CASCADE)

    def __str__(self):
        return f"Fertilisation {self.id}"


class FrequenceRemplissage(models.Model):
    id = models.AutoField(primary_key=True)
    periode_remplissage = models.DateTimeField()
    quantite_envoye = models.FloatField()
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE)

    def __str__(self):
        return f"Frequence Remplissage {self.id}"


class HumiditeSerre(models.Model):
    id = models.AutoField(primary_key=True)
    valeur = models.FloatField()
    capteur = models.ForeignKey(Capteur, on_delete=models.CASCADE)

    def __str__(self):
        return f"Humidité Serre {self.id}"


class NiveauTanque(models.Model):
    id = models.AutoField(primary_key=True)
    valeur = models.IntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Niveau Tanque {self.id}"


class PhaseCroissance(models.Model):
    id = models.AutoField(primary_key=True)
    phase_croissance = models.CharField(max_length=255)
    periode = models.IntegerField()
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phase_croissance


class SerreCulture(models.Model):
    id = models.AutoField(primary_key=True)
    serre = models.ForeignKey(Serre, on_delete=models.CASCADE)
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE)
    date_ajout = models.DateTimeField(auto_now_add=True)
    phase_culture = models.ForeignKey(PhaseCroissance, on_delete=models.CASCADE)

    def __str__(self):
        return f"Serre {self.serre} - Culture {self.culture}"




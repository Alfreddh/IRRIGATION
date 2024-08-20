
# Irrigation Django Application

Ce projet est une application Django conçue pour gérer un système d'irrigation. Le projet utilise Django pour le backend, et Redis pour le caching ou le message broker. Vous pouvez exécuter cette application avec ou sans Docker.

## Prérequis

### Sans Docker
- Python 3.8+
- pipenv ou virtualenv (optionnel, mais recommandé pour la gestion des dépendances)

### Avec Docker
- Docker 20.10.7+
- Docker Compose 1.29.2+

## Configuration de l'environnement


## Exécution du projet

### 1. Exécution sans Docker

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/irrigation-app.git
   cd irrigation-app
   ```

2. **Créer un environnement virtuel et installer les dépendances**

   Si vous utilisez `pipenv` :

   ```bash
   pipenv install
   pipenv shell
   ```

   Si vous utilisez `virtualenv` :

   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```



3. **Appliquer les migrations et démarrer le serveur**

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

   L'application sera accessible sur `http://127.0.0.1:8000`.

### 2. Exécution avec Docker

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/irrigation-app.git
   cd irrigation-app
   ```

2. **Construire et démarrer les conteneurs**

   ```bash
   docker-compose up --build
   ```

   Cela va :
   - Construire l'image Docker pour l'application Django.
   - Démarrer les services Redis et Django.

   L'application sera accessible sur `http://localhost:8081`.

3. **Arrêter les conteneurs**

   Pour arrêter les conteneurs, vous pouvez utiliser la commande :

   ```bash
   docker-compose down
   ```

## Accès à l'application

- **Sans Docker** : `http://127.0.0.1:8000`
- **Avec Docker** : `http://localhost:8081`

## Gestion des migrations

Si vous avez besoin de créer ou d'appliquer des migrations, vous pouvez le faire soit en exécutant les commandes Django directement sur votre machine (sans Docker), soit dans le conteneur Docker.

### Sans Docker

```bash
python manage.py makemigrations
python manage.py migrate
```

### Avec Docker

```bash
docker-compose exec djangowim python manage.py makemigrations
docker-compose exec djangowim python manage.py migrate
```
# Gebruik het officiële Python image
FROM python:3.10-slim

# Stel de werkdirectory in binnen de container
WORKDIR /app

# Kopieer het requirements-bestand en installeer afhankelijkheden
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Kopieer de rest van de app
COPY . .

# Poort 8000 blootstellen (standaard voor Django)
EXPOSE 8000

# Django server draaien
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

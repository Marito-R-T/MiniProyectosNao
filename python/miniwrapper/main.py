import requests
from bs4 import BeautifulSoup

# URL de la página que deseas rastrear
url = "https://www.udeo.edu.gt/libertad/alcaldia2023/"

# Realizar la solicitud HTTP a la página
response = requests.get(url)

# Analizar el contenido HTML utilizando BeautifulSoup
soup = BeautifulSoup(response.text, "html.parser")

# Ejemplo: Extraer todos los enlaces de la página
enlaces = soup.find_all("a")
for enlace in enlaces:
    print(enlace.get("href"))

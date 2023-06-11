import tkinter as tk
from tkinter import messagebox
import requests

API_KEY = "a3d08c72"

def obtener_rating():
    titulo_pelicula = entry_pelicula.get()
    if titulo_pelicula:
        url = f"http://www.omdbapi.com/?s={titulo_pelicula}&apikey={API_KEY}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data["Response"] == "True":
                print(data['Search'][0]['imdbID'])
                url2 = f"http://www.omdbapi.com/?i={data['Search'][0]['imdbID']}&apikey={API_KEY}"
                response_movie = requests.get(url2)
                if response_movie.status_code == 200:
                    data_movie = response_movie.json()
                    print(data_movie)
                    if data_movie["Response"] == "True":
                        rating = data_movie["imdbRating"]
                        messagebox.showinfo("Rating de la película", f"El rating de {titulo_pelicula} es {rating}")
                    else:
                        messagebox.showerror("Error", f"No se encontró la película: {titulo_pelicula}")
                else:
                    messagebox.showerror("Error", "Error al realizar la solicitud.")
            else:
                messagebox.showerror("Error", f"No se encontró la película: {titulo_pelicula}")
                
        else:
            messagebox.showerror("Error", "Error al realizar la solicitud.")
        entry_pelicula.delete(0, tk.END)
    else:
        messagebox.showerror("Error", "Por favor, ingrese el título de una película.")

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Obtener Rating de Películas")

# Etiqueta y campo de entrada para el título de la película
label_pelicula = tk.Label(ventana, text="Título de la película:")
label_pelicula.pack()
entry_pelicula = tk.Entry(ventana)
entry_pelicula.pack()

# Botón para obtener el rating
btn_obtener_rating = tk.Button(ventana, text="Obtener Rating", command=obtener_rating)
btn_obtener_rating.pack()

# Ejecutar el bucle de eventos de la ventana
ventana.mainloop()

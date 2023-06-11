import tkinter as tk
from tkinter import messagebox
import random
import turtle

# Configuración de la ventana de turtle
ventana_turtle = turtle.Screen()
ventana_turtle.title("Ahorcado")
ventana_turtle.bgcolor("white")
ventana_turtle.setup(width=800, height=600)
ventana_turtle.tracer(0)

# Palabras para el juego de ahorcado
palabras = ["PYTHON", "PROGRAMACION", "INTERFAZ", "JUEGO", "ORDENADOR", "ALGORITMO", "DESARROLLO"]

# Palabra a adivinar
palabra_secreta = ""

# Lista de letras adivinadas
letras_adivinadas = []
letras_bien_adivinada = []

# Intentos restantes
intentos_restantes = 6

# Partes del cuerpo para dibujar
partes_cuerpo = [
    lambda: dibujar_cabeza(),
    lambda: dibujar_cuerpo(),
    lambda: dibujar_brazo_izquierdo(),
    lambda: dibujar_brazo_derecho(),
    lambda: dibujar_pierna_izquierda(),
    lambda: dibujar_pierna_derecha()
]

def seleccionar_palabra():
    borrar_dibujo()
    global palabra_secreta, letras_adivinadas, intentos_restantes, letras_bien_adivinada
    palabra_secreta = random.choice(palabras)
    letras_adivinadas = []
    letras_bien_adivinada = []
    intentos_restantes = 6
    actualizar_interfaz()
    dibujar_poste()

def verificar_letra():
    letra = entry_letra.get().upper()
    entry_letra.delete(0, tk.END)
    if (len(letra) != 1 or not letra.isalpha()) or (letra in letras_adivinadas):
        if len(letra) != 1 or not letra.isalpha():
            messagebox.showerror("Error", "Por favor, ingrese una letra válida.")
            return
        if letra in letras_adivinadas:
            messagebox.showinfo("Información", "Ya has adivinado esa letra.")
            return
    else:
        letras_adivinadas.append(letra)
    if letra in palabra_secreta:
        letras_bien_adivinada.append(letra)
        if len(set(letras_bien_adivinada)) == len(set(palabra_secreta)):
            messagebox.showinfo("¡Felicidades!", "¡Has adivinado la palabra!")
            seleccionar_palabra()
        else:
            actualizar_interfaz()
    else:
        global intentos_restantes
        intentos_restantes -= 1
        dibujar_parte_cuerpo()
        if intentos_restantes == 0:
            messagebox.showinfo("Juego Terminado", f"Lo siento, has perdido. La palabra era: {palabra_secreta}")
            seleccionar_palabra()
        else:
            messagebox.showinfo("Incorrecto", f"La letra '{letra}' no está en la palabra.")

def actualizar_interfaz():
    label_palabra.config(text="".join([letra if letra in letras_adivinadas else "_" for letra in palabra_secreta]))

def dibujar_parte_cuerpo():
    parte = partes_cuerpo[5 - intentos_restantes]
    parte()

def dibujar_poste():
    turtle.penup()
    turtle.setpos(-100, 220)
    turtle.pendown()
    turtle.setpos(-100, 240)
    turtle.penup()
    turtle.setpos(-100, 240)
    turtle.pendown()
    turtle.setpos(0, 200)
    turtle.penup()
    turtle.setpos(0, 200)
    turtle.pendown()
    turtle.setpos(0, -60)
    turtle.penup()
    turtle.setpos(-30, -60)
    turtle.pendown()
    turtle.setpos(30, -60)
    turtle.penup()

def dibujar_cabeza():
    turtle.penup()
    turtle.setpos(-100, 140)
    turtle.pendown()
    turtle.circle(40)
    turtle.penup()

def dibujar_cuerpo():
    turtle.penup()
    turtle.setpos(-100, 140)
    turtle.pendown()
    turtle.setpos(-100, 40)
    #turtle.forward(120)
    turtle.penup()

def dibujar_brazo_izquierdo():
    turtle.penup()
    turtle.setpos(-100, 120)
    turtle.pendown()
    turtle.setpos(-160, 80)
    turtle.penup()

def dibujar_brazo_derecho():
    turtle.penup()
    turtle.setpos(-100, 120)
    turtle.pendown()
    turtle.setpos(-40, 80)
    turtle.penup()

def dibujar_pierna_izquierda():
    turtle.penup()
    turtle.setpos(-100, 40)
    turtle.pendown()
    turtle.setpos(-160, -20)
    turtle.penup()

def dibujar_pierna_derecha():
    turtle.penup()
    turtle.setpos(-100, 40)
    turtle.pendown()
    turtle.setpos(-40, -20)
    turtle.penup()

def reiniciar_juego():
    borrar_dibujo()
    seleccionar_palabra()
    label_palabra.config(text="")

def borrar_dibujo():
    turtle.clear()

#Crear la ventana principal
ventana = tk.Tk()
ventana.title("Ahorcado")

#Etiqueta para mostrar la palabra a adivinar
label_palabra = tk.Label(ventana, text="", font=("Arial", 24))
label_palabra.pack(pady=10)

#Campo de entrada para ingresar una letra
entry_letra = tk.Entry(ventana, font=("Arial", 18))
entry_letra.pack(pady=10)

#Botón para verificar la letra ingresada
btn_verificar = tk.Button(ventana, text="Verificar", command=verificar_letra)
btn_verificar.pack(pady=10)

#Botón para reiniciar el juego
btn_reiniciar = tk.Button(ventana, text="Reiniciar", command=reiniciar_juego)
btn_reiniciar.pack(pady=10)

#Ejecutar la función para seleccionar una palabra al iniciar el juego
seleccionar_palabra()

#Ejecutar el bucle de eventos de turtle
turtle.mainloop()

#Cerrar la ventana de turtle al salir del bucle de eventos
ventana_turtle.bye()

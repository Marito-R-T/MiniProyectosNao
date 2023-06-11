import tkinter as tk
from tkinter import messagebox

contactos = {}

def agregar_contacto():
    nombre = entry_nombre.get()
    numero = entry_numero.get()
    if nombre and numero:
        contactos[nombre] = numero
        messagebox.showinfo("Éxito", "Contacto agregado correctamente.")
        entry_nombre.delete(0, tk.END)
        entry_numero.delete(0, tk.END)
    else:
        messagebox.showerror("Error", "Por favor, ingrese un nombre y un número telefónico.")

def buscar_contacto():
    nombre = entry_nombre.get()
    if nombre:
        if nombre in contactos:
            messagebox.showinfo("Resultado", f"Número telefónico de {nombre}: {contactos[nombre]}")
        else:
            messagebox.showinfo("Resultado", "Contacto no encontrado.")
        entry_nombre.delete(0, tk.END)
    else:
        messagebox.showerror("Error", "Por favor, ingrese un nombre.")

def listar_contactos():
    if contactos:
        texto = "Lista de contactos:\n\n"
        for nombre, numero in contactos.items():
            texto += f"{nombre}: {numero}\n"
    else:
        texto = "No hay contactos registrados."
    messagebox.showinfo("Contactos", texto)

def eliminar_contacto():
    nombre = entry_nombre.get()
    if nombre:
        if nombre in contactos:
            del contactos[nombre]
            messagebox.showinfo("Éxito", "Contacto eliminado correctamente.")
        else:
            messagebox.showinfo("Resultado", "Contacto no encontrado.")
        entry_nombre.delete(0, tk.END)
    else:
        messagebox.showerror("Error", "Por favor, ingrese un nombre.")

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Menú Telefónico")

# Etiqueta y campo de entrada para el nombre del contacto
label_nombre = tk.Label(ventana, text="Nombre:")
label_nombre.pack()
entry_nombre = tk.Entry(ventana)
entry_nombre.pack()

# Etiqueta y campo de entrada para el número telefónico
label_numero = tk.Label(ventana, text="Número:")
label_numero.pack()
entry_numero = tk.Entry(ventana)
entry_numero.pack()

# Botones de las acciones del menú
btn_agregar = tk.Button(ventana, text="Agregar contacto", command=agregar_contacto)
btn_agregar.pack()

btn_buscar = tk.Button(ventana, text="Buscar contacto", command=buscar_contacto)
btn_buscar.pack()

btn_listar = tk.Button(ventana, text="Listar contactos", command=listar_contactos)
btn_listar.pack()

btn_eliminar = tk.Button(ventana, text="Eliminar contacto", command=eliminar_contacto)
btn_eliminar.pack()

# Ejecutar el bucle de eventos de la ventana
ventana.mainloop()

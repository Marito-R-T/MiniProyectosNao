# Diccionarios para convertir números a palabras
unidades = {
    0: 'cero',
    1: 'uno',
    2: 'dos',
    3: 'tres',
    4: 'cuatro',
    5: 'cinco',
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve'
}

decenas = {
    10: 'diez',
    20: 'veinte',
    30: 'treinta',
    40: 'cuarenta',
    50: 'cincuenta',
    60: 'sesenta',
    70: 'setenta',
    80: 'ochenta',
    90: 'noventa'
}

especiales = {
    11: 'once',
    12: 'doce',
    13: 'trece',
    14: 'catorce',
    15: 'quince',
    16: 'dieciséis',
    17: 'diecisiete',
    18: 'dieciocho',
    19: 'diecinueve'
}

# Función para convertir números menores a 100 a palabras
def convertir_menor_a_100(numero):
    if numero in unidades:
        return unidades[numero]
    elif numero in decenas:
        return decenas[numero]
    else:
        decena = numero // 10 * 10
        unidad = numero % 10
        return decenas[decena] + " y " + unidades[unidad]

# Función principal para convertir números a palabras
def convertir_a_palabras(numero):
    if numero < 0 or numero > 9999:
        return "Número fuera de rango"
    elif numero == 0:
        return unidades[numero]
    elif numero < 100:
        return convertir_menor_a_100(numero)
    else:
        if numero in especiales:
            return especiales[numero]
        else:
            millar = numero // 1000
            centena = numero % 1000 // 100
            resto = numero % 100
            resultado = ""
            if millar > 0:
                resultado += unidades[millar] + " mil"
            if centena > 0:
                resultado += " " + unidades[centena] + " cientos"
            if resto > 0:
                resultado += " " + convertir_menor_a_100(resto)
            return resultado.strip()

# Ejemplo de uso
numero = int(input("Ingrese un número entre 0 y 9999: "))
palabras = convertir_a_palabras(numero)
print(palabras)

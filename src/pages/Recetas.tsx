import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Recetas.css';

interface Receta {
  id: number;
  slug: string;
  nombre: string;
  tiempo: string;
  dificultad: string;
  imagenPortada: string;
  ingredientes: Array<{cantidad: string; item: string}>;
  pasos: Array<{texto: string | string[]}>;
  imagen?: string;
  imagenAttribution?: string;
}

const recetasData: Receta[] = [
  {
    id: 1,
    slug: "hogaza-rustica-semiintegral",
    nombre: "HOGAZA RÚSTICA SEMIINTEGRAL",
    tiempo: "24 horas",
    dificultad: "Intermedio",
    imagenPortada: "/image/hogaza.jpeg",
    ingredientes: [
      {cantidad: "850 gramos", item: "harina"},
      {cantidad: "150 gramos", item: "harina integral de buena calidad"},
      {cantidad: "200 gramos", item: "masa madre"},
      {cantidad: "700 ml", item: "agua"},
      {cantidad: "20 gramos", item: "sal"}
    ],
    pasos: [
      {
        texto: "Unir todos los ingredientes y dejar reposar de 20 minutos a una hora para realizar la autólisis. (Todos menos la sal)"
      },
      {
        texto: [
          "Llevar a la canasta y de ser necesario realizar la costura de la futura base.",
          "Espolvorear con harina. Tapar con una bolsa y dejar leudar.",
          "Se puede leudar a temperatura ambiente (más rápido) o en la nevera (3 a 4 veces más lento).",
          "Se puede también leudar casi completamente a temperatura ambiente y luego las últimas horas en la nevera."
        ]
      }
    ],
    imagen: "/image/hogaza.jpeg",
    imagenAttribution: "https://cookidoo.es/recipes/recipe/es-ES/r430278"
  },
  {
    id: 2,
    slug: "focaccia-tradicional",
    nombre: "FOCACCIA TRADICIONAL",
    tiempo: "4-6 horas",
    dificultad: "Principiante",
    imagenPortada: "/image/foccacia.jpeg",
    ingredientes: [
      {cantidad: "500 gramos", item: "harina"},
      {cantidad: "30/50 ml", item: "aceite de oliva"},
      {cantidad: "380 ml", item: "agua"},
      {cantidad: "15 gramos", item: "sal"}
    ],
    pasos: [
      {
        texto: "Unir el agua, la harina y la masa madre. Reposar por 30/40 minutos en verano y 1 hora y 15 minutos en invierno."
      },
      {
        texto: "Agregar la sal diluida en un poco del agua que reservamos. Comenzar con los plegados, haremos 5 en total."
      },
      {
        texto: "Plegar la masa cada 20 minutos y en los últimos dos plegados agregar el aceite en dos partes para que la masa lo tome de a poco."
      },
      {
        texto: [
          "Fermentar en el Bowl hasta que duplique su tamaño.",
          "Pasar a la mesada y dividir las focaccias intentando no desgasificar, sobre la superficie agregar más aceite y dejar fermentar hasta que vuelvan a duplicar."
        ]
      }
    ],
    imagen: "/image/foccacia.jpeg",
    imagenAttribution: ""
  },
  {
    id: 3,
    slug: "hot-cakes",
    nombre: "HOT CAKES",
    tiempo: "30 minutos",
    dificultad: "Principiante",
    imagenPortada: "/image/hotCakes.jpeg",
    ingredientes: [
      {cantidad: "100 gramos", item: "masa madre"},
      {cantidad: "1 pizca", item: "sal"},
      {cantidad: "1 pizca", item: "pimienta"},
      {cantidad: "50 gramos", item: "queso rallado"},
      {cantidad: "1 cucharadita", item: "bicarbonato"}
    ],
    pasos: [
      {
        texto: "En una sartén engrasada con una grasa termoestable de buena calidad como ghee, grasa de cerdo o vaca, aceite de oliva o de coco"
      },
      {
        texto: "En un cuenco unir la masa madre, una pizca de sal y pimienta, nuestro queso rallado y cuando ya esté todo listo para cocinar, nuestro bicarbonato."
      },
      {
        texto: [
          "Revolver e inmediatamente volcar sobre la sartén, cocinar vuelta y vuelta.",
          "Se puede cambiar el queso por variantes dulces como miel y canela, coco y arándanos, frutas frescas y congeladas, cacao amargo, etc."
        ]
      }
    ],
    imagen: "/image/hotCakes.jpeg",
    imagenAttribution: "https://nataliaquintanilla0.wixsite.com/misitio/post/hot-cakes-de-masa-madre"
  },
  {
    id: 4,
    slug: "molde-de-centeno-queso-y-miel",
    nombre: "MOLDE DE CENTENO, QUESO Y MIEL",
    tiempo: "8-10 horas",
    dificultad: "Intermedio",
    imagenPortada: "/image/centeno.jpeg",
    ingredientes: [
      {cantidad: "500 gramos", item: "harina"},
      {cantidad: "200 gramos", item: "masa madre blanca"},
      {cantidad: "310 ml", item: "agua"},
      {cantidad: "10 gramos", item: "sal"},
      {cantidad: "10 gramos", item: "queso azul"},
      {cantidad: "10 gramos", item: "miel"}
    ],
    pasos: [
      {
        texto: "Unir el agua, la harina y la masa madre, realizar una autolisis como siempre."
      },
      {
        texto: "Agregar la sal diluida en un poco del agua de la receta y luego incorporarla con plegados."
      },
      {
        texto: [
          "Haz 4 a 6 plegados separados por un reposo de 30 minutos.",
          "Fermentar la masa en el bowl en bloque por 6 hs en invierno y 4 hs en verano o hasta que crezca por lo menos un 30% y se vea gasificada."
        ]
      },
      {
        texto: "Llevar a la mesada y armar los moldes sin desgasificar, enrollando dos veces en sentido de cruz como se explica en el curso para crear una buena tensión"
      },
      {
        texto: "Leudar a temperatura ambiente o en frío en la nevera hasta que crezca y llevar al horno máximo (230 a 250 grados) por 40 minutos."
      }
    ],
    imagen: "/image/centeno.jpeg",
    imagenAttribution: "Fotografía sacada de"
  },
  {
    id: 5,
    slug: "masa-brioche-dulce",
    nombre: "MASA BRIOCHE DULCE",
    tiempo: "6-8 horas",
    dificultad: "Avanzado",
    imagenPortada: "/image/briocheDulce.jpeg",
    ingredientes: [
      {cantidad: "600 gramos", item: "harina"},
      {cantidad: "40 ml", item: "leche"},
      {cantidad: "1 toque", item: "vainilla"},
      {cantidad: "10 gramos", item: "sal"},
      {cantidad: "100 gramos", item: "masa madre"},
      {cantidad: "50 gramos", item: "miel"},
      {cantidad: "2 yemas", item: "de huevo"},
      {cantidad: "60 gramos", item: "manteca"}
    ],
    pasos: [
      {
        texto: [
          "Unir todos los ingredientes con excepción de la manteca. Amasar por 2 minutos para que se incorporen completamente.",
          "Reposar la masa 20 minutos."
        ]
      },
      {
        texto: "Amasar vigorosamente con máquina (10 minutos en velocidad media) o a mano por 20 minutos. Incorporar en 3 tandas la manteca y amasar hasta que cada poquito sea incorporado a la masa antes de agregar las tandas de manteca siguientes."
      },
      {
        texto: [
          "En máquina el amasado con manteca será de 10 minutos más y a mano 20/30 minutos de amasado vigoroso.",
          "Nos damos cuenta que la masa está lista cuando logramos generar una malla de gluten con estructura como enseñamos en el curso."
        ]
      }
    ],
    imagen: "/image/briocheDulce.jpeg",
    imagenAttribution: "https://www.bonviveur.es/recetas/brioche-dulce"
  },
  {
    id: 6,
    slug: "pan-de-papa-criolla",
    nombre: "PAN DE PAPA CRIOLLA",
    tiempo: "12 horas",
    dificultad: "Intermedio",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"850 gramos", item:"Harina de trigo"},
      {cantidad:"500 ml", item:"Agua"},
      {cantidad:"300 gramos", item:"Masa madre"},
      {cantidad:"150 gramos", item:"Puré de papa criolla"},
      {cantidad:"20 gramos", item:"Sal"},
      {cantidad:"20 ml", item:"Aceite de oliva"},
      {cantidad:"30 gramos", item:"Cúrcuma"}
    ],
    pasos: [
      {
        texto:"Balancear la fórmula."
      },
      {
        texto: [
          "1. Pesar y medir todos los ingredientes.",
          "2. Hornear la papa criolla con sal, pimienta y aceite de oliva y hacer puré.",
          "3. Mezclar la harina, agua, puré, cúrcuma, aceite de oliva y masa madre y se acondiciona.",
          "4. Dejar en reposo por 2 horas realizando dobleces cada 30 minutos.",
          "5. Fermentar en bloque a temperatura ambiente de 18 °C a 25 °C, 6 horas aprox. hasta duplicar su volumen.",
          "6. Dividir la masa de acuerdo al peso deseado.",
          "7. Moldear o formar cada pan.",
          "8. Fermentar en frío 12 horas.",
          "9. Con un palo de pincho impregnado de cacao hacer huecos, para simular los ojos de la papa criolla.",
          "10. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
          "11. Enfriamiento durante 4 horas.",
          "12. Empaque y comercialización.",
          "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
        ]
      }
    ],
    imagen: "/image/masaMadre.jpeg"
  },  
  {
    id: 7,
    slug: "pan-de-banano-y-cacao",
    nombre: "PAN DE BANANO Y CACAO",
    tiempo: "6 horas",
    dificultad: "Principiante",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad: "950 gramos", item: "Harina de trigo"},
      {cantidad: "400 gramos", item: "Masa madre"},
      {cantidad: "50 gramos", item: "Cacao"},
      {cantidad: "300 gramos", item: "Chocolate"},
      {cantidad: "300 gramos", item: "Banano"},
      {cantidad: "300 ml", item: "Agua"},
      {cantidad: "10 gramos", item: "Sal"}
      
    ],
    pasos: [
      {texto: "Balancear la fórmula."},
      {texto: [
        "1. Pesar y medir todos los ingredientes.",
        "2. Elaborar puré de banano.",
        "3. Mezclar harina, cacao, sal y adicionar agua.",
        "4. Incorporar masa madre y agregar puré.",
        "5. Acondicionar la masa (dar punto).",
        "6. Al final del amasado agregar chocolate troceado o en chips.",
        "7. Reposo de la masa por 2 horas plegando cada 30 minutos.",
        "8. Dividir la masa de acuerdo al peso deseado.",
        "9. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
        "10. Fermentación en frío de 10 a 14 horas.",
        "11. Moldear o formar cada pan.",
        "12. Colocar en lata engrasada o enharinada.",
        "13. Fermentación final de 1 a 2 horas a una temperatura de 30 °C y una humedad relativa de 60%.",
        "14. Espolvorear cacao con tamiz.",
        "15. Decorar, hacer cortes con cuchilla.",
        "16. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
        "17. Enfriamiento durante 4 horas.",
        "18. Empaque y comercialización.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
 {
  id: 8,
  slug: "pan-de-ahuyama",
  nombre: "PAN DE AHUYAMA",
  tiempo: "6 horas",
  dificultad: "Avanzado",
  imagenPortada: "/image/masaMadre.jpeg",
  ingredientes: [
    {cantidad:"1000 gramos", item: "Harina de trigo"},
    {cantidad:"400 gramos", item: "Ahuyama"},
    {cantidad:"400 gramos", item: "Masa madre"},
    {cantidad:"400 ml", item:"Agua"},
    {cantidad:"22 gramos", item:"Sal"},
    {cantidad:"100 gramos", item:"Aceite de oliva"},
    {cantidad:"150 gramos", item:"Semillas de calabaza"},
    {cantidad:"5 gramos", item:"Cúrcuma"}

  ],
  pasos: [
    {texto: "Balancear la fórmula."},
    {texto: [
      "1. Pesar y medir todos los ingredientes.",
      "2. Elaborar puré de ahuyama.",
      "3. Mezclar harina, masa madre, sal y adicionar agua.",
      "4. Cocinar ahuyama en trozos con sal y aceite de oliva a 180 °C por 30 minutos.",
      "5. Retirar la cáscara y hacer puré.",
      "6. Mezclar la harina de trigo, puré de ahuyama, cúrcuma, aceite de oliva, agua, sal y masa madre.",
      "7. Al final de la etapa anterior agregar las semillas de calabaza.",
      "8. Acondicionar (dar punto).",
      "9. Reposo de 2 horas dando pliegues cada 30 minutos.",
      "10. Dividir la masa de acuerdo al peso deseado.",
      "11. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
      "12. Fermentación en frío de 12 a 18 horas.",
      "13. Moldear o formar cada pan.",
      "14. Colocar en lata engrasada o enharinada.",
      "15. Fermentación final de 1 a 2 horas a una temperatura de 30 °C y una humedad relativa de 60%.",
      "16. Decorar amarrando la masa con 3 pitas cruzadas y hacer cortes con cuchilla.",
      "17. Hornear a temperatura de acuerdo al tamaño.",
      "18. Enfriamiento durante 4 horas.",
      "19. Empaque y comercialización.",
      "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
    ]}
  ],
  imagen: "/image/masaMadre.jpeg"
 },
  {
    id: 9,
    slug: "pan-de-naranja",
    nombre: "PAN DE NARANJA",
    tiempo: "6 horas",
    dificultad: "Avanzado",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"1000 gramos", item: "Harina de trigo"},
      {cantidad:"300 gramos", item: "Zumo de naranja"},
      {cantidad:"400 gramos", item: "Masa madre"},
      {cantidad:"300 ml", item:"Agua"},
      {cantidad:"10 gramos", item:"Sal"},
      {cantidad:"200 gramos", item:"Miel"},
      {cantidad:"5 gramos", item:"Ralladura de naranja"},
      {cantidad:"200 gramos", item:"Naranja confitada"}

    ],
    pasos: [
      {texto: "Balancear la fórmula y pensar y medir todos los ingredientes."},
      {texto: [
        "1. Hervir las cáscaras 8 veces cambiando el agua para eliminar el amargor.",
        "2. Confitarlas en almíbar (70 % agua, 30 % azúcar) durante 3 días consecutivos. Guardar en recipiente hermético (se conserva hasta 1 año).",
        "3. Mezclar la harina, agua, zumo de naranja, miel, ralladura de naranja, sal y masa madre.",
        "4. Acondicionar (dar punto).",
        "5. Incorporar la cáscara de naranja confitada suavemente.",
        "6. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "7. Dividir la masa de acuerdo al peso deseado.",
        "8. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
        "9. Fermentación de 6 horas a temperatura ambiente o hasta duplicar su volumen.",
        "10. Fermentación en frío de 12 a 18 horas.",
        "11. Moldear o formar cada pan y colocar en lata engrasada o enharinada.",
        "12. Fermentación final de 1 a 2 horas, a una temperatura de 30 °C y una humedad relativa de 60%.",
        "13. Espolvorear harina tamizada.",
        "14. Hornear a temperatura de acuerdo al tamaño.",
        "15. Enfriamiento durante 4 horas.",
        "16. Empaque y comercialización.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 10,
    slug: "pan-de-santarrosano",
    nombre: "PAN DE SANTARROSANO",
    tiempo: "6 horas",
    dificultad: "Avanzado",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"1000 gramos", item: "Harina de trigo"},
      {cantidad:"200 gramos", item: "Chorizo santarrosano"},
      {cantidad:"400 gramos", item: "Masa madre"},
      {cantidad:"650 ml", item:"Agua"},
      {cantidad:"20 gramos", item:"Sal"},
      {cantidad:"150 gramos", item:"Aceite de oliva"},
      {cantidad:"300 gramos", item:"Queso doble crema"}

    ],
    pasos: [
      {texto: "Balancear la fórmula."},
      {texto: [
        "1. Pesar y medir todos los ingredientes.",
        "2. Sofreír el chorizo picado, dejar enfriar.",
        "3. Mezclar los ingredientes base: harina, agua, aceite de oliva, sal y masa madre.",
        "4. Acondicionar (dar punto).",
        "5. Incorporar el chorizo frío y parte del queso rallado.",
        "6. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "7. Estirar en bandeja (focaccia).",
        "8. Fermentación de 6 horas a temperatura ambiente o hasta duplicar su volumen.",
        "9. Fermentación en frío de 12 a 18 horas.",
        "10. Decorar con el resto del queso y aceite de oliva.",
        "11. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
        "12. Enfriamiento durante 4 horas.",
        "13. Empacar y comercializar.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 11,
    slug: "pan-de-cafe",
    nombre: "PAN DE CAFÉ",
    tiempo: "6 horas",
    dificultad: "Avanzado",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"1000 gramos", item: "Harina de trigo"},
      {cantidad:"50 gramos", item: "Café"},
      {cantidad:"300 gramos", item: "Masa madre"},
      {cantidad:"600 ml", item:"Agua"},
      {cantidad:"10 gramos", item:"Sal"},
      {cantidad:"180 gramos", item:"Miel"}

    ],
    pasos: [
      {texto: "Balancear la fórmula."},
      {texto: [
        "1. Pesar y medir todos los ingredientes.",
        "2. Mezclar los ingredientes base: harina, agua, miel, café liofilizado, sal y masa madre.",
        "3. Acondicionar (dar punto).",
        "4. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "5. Dividir la masa de acuerdo al peso deseado.",
        "6. Plegar cada pieza de 2 a 3 veces.",
        "7. Fermentación en frío de 12 a 18 horas.",
        "8. Moldear o formar cada pan.",
        "9. Fermentación final de 1 a 2 horas, a una temperatura de 30 °C y una humedad relativa de 60%.",
        "10. Decorar con cortes, simulando un grano de café.",
        "11. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
        "12. Enfriamiento durante 4 horas.",
        "13. Empacar y comercializar.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 12,
    slug: "pan-de-semillas",
    nombre: "PAN DE SEMILLAS",
    tiempo: "6 horas",
    dificultad: "Avanzado",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"1000 gramos", item: "Harina de trigo"},
      {cantidad:"100 gramos", item: "Aceite de oliva"},
      {cantidad:"400 gramos", item: "Masa madre"},
      {cantidad:"600 ml", item:"Agua"},
      {cantidad:"22 gramos", item:"Sal"},
      {cantidad:"100 gramos", item:"Linaza"},
      {cantidad:"100 gramos", item:"Ajonjolí tostado"},
      {cantidad:"100 gramos", item:"Chía"}

    ],
    pasos: [
      {texto: "Balancear la fórmula."},
      {texto: [
        "1. Pesar y medir todos los ingredientes.",
        "2. Tostar el ajonjolí e hidratar chía y linaza en agua (en la misma cantidad) mínimo 2 horas antes.",
        "3. Mezclar los ingredientes base: harina, agua, aceite de oliva, sal y masa madre.",
        "4. Acondicionar (dar punto).",
        "5. Incorporar las semillas hidratadas y el ajonjolí tostado.",
        "6. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "7. Dividir la masa de acuerdo al peso deseado.",
        "8. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
        "9. Fermentación en frío de 12 a 18 horas.",
        "10. Moldear o formar cada pan.",
        "11. Colocar en lata engrasada o enharinada.",
        "12. Fermentación final de 1 a 2 horas, a una temperatura de 30 °C y una humedad relativa de 60%.",
        "13. Espolvorear con harina y hacer cortes decorativos.",
        "14. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
        "15. Enfriamiento durante 4 horas.",
        "16. Empacar y comercializar.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 13,
    slug: "pan-de-chocolate",
    nombre: "PAN DE CHOCOLATE",
    tiempo: "6 horas",
    dificultad: "Intermedio",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad:"900 gramos", item:"Harina de trigo"},
      {cantidad:"100 gramos", item: "Cacao"},
      {cantidad:"400 gramos", item:"Masa madre"},
      {cantidad:"420 gramos", item:"Agua"},
      {cantidad:"10 gramos", item:"Sal"},
      {cantidad:"150 gramos", item:"Mantequilla"},
      {cantidad:"200 gramos", item:"Azúcar"},
      {cantidad:"100 gramos", item:"Huevo"},
      {cantidad:"50 gramos", item:"Leche en polvo"},
      {cantidad:"300 gramos", item:"Chocolate"},
      {cantidad:"5 gramos", item:"Canela"}
    ],
    pasos: [
      {texto: "Balancear la fórmula, pesar y medir todos los ingredientes."},
        {texto: [
          "1. Mezclar harina y cacao; agregar sal, leche en polvo, canela y agua.",
          "2. Adicionar azúcar, huevo, mantequilla y masa madre.",
          "3. Acondicionar (dar punto).",
          "4. Incorporar chocolate semiamargo troceado (si el clima es cálido se recomienda no agregar chocolate troceado ya que se funde).",
          "5. Reposo de 2 horas dando pliegues cada 30 minutos.",
          "6. Dividir la masa de acuerdo al peso deseado, y plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
          "7. Fermentación en frío de 12 a 18 horas y moldear o formar cada pan.",
          "8. Colocar en lata engrasada o enharinada.",
          "9. Fermentación final de 1 a 3 horas aprox.",
          "10. Espolvorear con harina y hacer cortes decorativos.",
          "11. Hornear a temperatura de acuerdo al tamaño.",
          "12. Enfriamiento durante 4 horas.",
          "13. Empacar y comercializar.",
          "Nota: La masa madre debe haberse refrescado 4 horas antes."
        ]}  
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 14,
    slug: "pan-de-avena",
    nombre: "PAN DE AVENA",
    tiempo: "4 horas",
    dificultad: "Principiante",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad: "850 gramos", item: "Harina de trigo"},
      {cantidad: "150 gramos", item: "Avena de hojuelas"},
      {cantidad: "300 gramos", item: "Masa madre"},
      {cantidad: "650 ml", item: "Agua"},
      {cantidad: "20 gramos", item:"Sal"},
      {cantidad: "50 gramos", item:"Aceite de oliva"},
      {cantidad: "100 gramos", item:"Miel de abejas"}
    ],
    pasos: [
      {texto: "Balancear la fórmula, pensar y medir todos los ingredientes."},
      {texto: [
        "1. Mezclar los ingredientes base: avena en hojuelas, agua, aceite de oliva, miel, sal y masa madre.",
        "2. Acondicionar (dar punto).",
        "3. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "4. Dividir la masa de acuerdo al peso deseado.",
        "5. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
        "6. Fermentación en frío de 12 a 18 horas.",
        "7. Moldear o formar cada pan.",
        "8. Colocar en lata engrasada o enharinada.",
        "9. Fermentación final de 1 a 2 horas, a una temperatura de 30 °C y una humedad relativa de 60%.",
        "10. Espolvorear con harina y hacer cortes decorativos.",
        "11. Temperatura de horno de acuerdo al tamaño: piezas grandes, menor temperatura y mayor tiempo (170 °C por 25 minutos aprox.); piezas pequeñas, mayor temperatura y menor tiempo (200 °C por 15 minutos aprox.).",
        "12. Enfriamiento durante 4 horas.",
        "13. Empacar y comercializar.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
     ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  },
  {
    id: 15,
    slug: "pan-de-remolacha",
    nombre: "PAN DE REMOLACHA",
    tiempo: "2 horas",
    dificultad: "Principiante",
    imagenPortada: "/image/masaMadre.jpeg",
    ingredientes: [
      {cantidad: "800 gramos", item: "Harina de trigo"},
      {cantidad: "200 gramos", item: "Remolacha"},
      {cantidad: "400 gramos", item: "Masa madre"},
      {cantidad: "500 ml", item: "Agua"},
      {cantidad: "20 gramos", item: "Sal"},
      {cantidad: "100 gramos", item: "Aceite de oliva"}
    ],
    pasos: [
      {texto: "Balancear la fórmula, pesar y medir todos los ingredientes."},
      {texto: [
        "1. Cocer la remolacha, cortar en cubos pequeños y reservar el agua de cocción.",
        "2. Mezclar los ingredientes base: harina, agua de cocción, aceite de oliva, sal y masa madre.",
        "3. Acondicionar (dar punto).",
        "4. Incorporar la remolacha en cubos al final del amasado.",
        "5. Reposo de 2 horas dando pliegues cada 30 minutos.",
        "6. Dividir la masa de acuerdo al peso deseado.",
        "7. Plegar cada pieza de 2 a 3 veces a fin de generar fuerza.",
        "8. Fermentación en frío de 12 a 18 horas.",
        "9. Moldear o formar cada pan.",
        "10. Colocar en lata engrasada o enharinada.",
        "11. Fermentación final de 1 a 2 horas, a una temperatura de 30 °C y una humedad relativa de 60%.",
        "12. Espolvorear con harina y colocar una rama de hierbabuena.",
        "13. Hornear a temperatura de acuerdo al tamaño.",
        "14. Enfriamiento durante 4 horas.",
        "15. Empacar y comercializar.",
        "Nota: La masa madre debe haberse refrescado con 4 horas de anterioridad."
      ]}
    ],
    imagen: "/image/masaMadre.jpeg"
  }
];



const Recetas: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const selectedReceta = slug
    ? recetasData.find((r) => r.slug === slug) ?? null
    : null;

  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = selectedReceta
      ? `${selectedReceta.nombre} | Masa Madre`
      : 'Recetas | Masa Madre';
  }, [slug, selectedReceta]);

  const compartirReceta = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt('Copia el link de la receta:', url);
    }
  };

  return (
    <div className="recetas">
      <Navbar />
      <div className="recetas-content">
        {!selectedReceta ? (
          <div className="container">
            <div className="recetas-tradicionales">
              <h1 className="recetas-main-title">RECETAS</h1>
              <h2 className="recetas-subtitle">TRADICIONALES</h2>
              
              {['Principiante', 'Intermedio', 'Avanzado'].map((nivel) => {
                const recetasNivel = recetasData.filter((r) => r.dificultad === nivel);
                if (recetasNivel.length === 0) return null;
                return (
                  <div key={nivel} className="dificultad-seccion">
                    <h3 className="dificultad-titulo">{nivel}</h3>
                    <div className="recetas-grid">
                      {recetasNivel.map((receta) => (
                        <div key={receta.id} className="receta-card" onClick={() => navigate(`/recetas/${receta.slug}`)}>
                          <div className="card-image-container">
                            <img src={receta.imagenPortada} alt={receta.nombre} className="card-image" />
                          </div>
                          <div className="card-content">
                            <h3 className="card-title">{receta.nombre}</h3>
                            <div className="card-meta">
                              <span className="card-tiempo">⏱️ {receta.tiempo}</span>
                              <span className="card-dificultad">👨‍🍳 {receta.dificultad}</span>
                            </div>
                            <button className="card-button">Ver Receta</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="receta-detalle-container">
            <div className="container">
              <button className="back-button" onClick={() => navigate('/recetas')}>
                ← Volver a las recetas
              </button>
              
              {!selectedReceta ? (
                <div className="receta-no-encontrada">
                  <h2>Receta no encontrada</h2>
                  <p>La receta que buscas no existe o fue movida.</p>
                </div>
              ) : (
              <div className="receta-detalle">
                <div className="receta-header">
                  <h1>{selectedReceta.nombre}</h1>
                  <div className="receta-meta">
                    <span>⏱️ {selectedReceta.tiempo}</span>
                    <span>👨‍🍳 {selectedReceta.dificultad}</span>
                    <button className="share-button" onClick={compartirReceta}>
                      {copiado ? '✓ Link copiado' : '🔗 Compartir'}
                    </button>
                  </div>
                </div>

                <div className="receta-imagen-principal">
                  <img 
                    src={selectedReceta.imagen || selectedReceta.imagenPortada} 
                    alt={selectedReceta.nombre}
                  />
                  {selectedReceta.imagenAttribution && (
                    <div className="imagen-attribution">
                      <a href={selectedReceta.imagenAttribution} target="_blank" rel="noopener noreferrer">
                        Ver receta original
                      </a>
                    </div>
                  )}
                </div>

                <div className="receta-contenido">
                  <div className="ingredientes-section">
                    <h2>Ingredientes</h2>
                    <ul className="ingredientes-lista">
                      {selectedReceta.ingredientes.map((ingrediente, index) => (
                        <li key={index}>
                          <span className="cantidad">{ingrediente.cantidad}</span>
                          <span className="item">{ingrediente.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="preparacion-section">
                    <h2>Preparación</h2>
                    <div className="pasos-lista">
                      {selectedReceta.pasos.map((paso, index) => (
                        <div key={index} className="paso">
                          <div className="paso-contenido">
                            {Array.isArray(paso.texto) ? (
                              <div className="paso-text-multiple">
                                {paso.texto.map((texto, textIndex) => (
                                  <p key={textIndex} className="paso-text">{texto}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="paso-text">{paso.texto}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recetas;

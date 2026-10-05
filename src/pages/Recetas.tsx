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

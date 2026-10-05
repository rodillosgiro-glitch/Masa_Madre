import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Calculadora.css";

type Unidad = "g" | "kg" | "lb";

type Hidratacion = {
  valor: number;
  descripcion: string;
};

const HIDRATACIONES: Hidratacion[] = [
  {
    valor: 60,
    descripcion: "Masa firme y fácil de trabajar",
  },
  {
    valor: 65,
    descripcion: "Masa suave y manejable",
  },
  {
    valor: 70,
    descripcion: "Masa suave, equilibrada y versátil",
  },
  {
    valor: 75,
    descripcion: "Masa húmeda y más aireada",
  },
  {
    valor: 80,
    descripcion: "Masa muy hidratada y difícil de manejar",
  },
  {
    valor: 85,
    descripcion: "Masa extremadamente hidratada y difícil de manejar",
  },
];

const SAL_PORCENTAJE = 0.02;

function convertirAGramos(cantidad: number, unidad: Unidad): number {
  switch (unidad) {
    case "kg":
      return cantidad * 1000;

    case "lb":
      return cantidad * 453.59237;

    case "g":
    default:
      return cantidad;
  }
}

function formatearNumero(numero: number, decimales = 0): string {
  return numero.toLocaleString("es-CO", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

function obtenerTiempoFermentacion(temperatura: number): string {
  let tiempoBase: number;

  if (temperatura <= 18) {
    tiempoBase = 10;
  } else if (temperatura <= 20) {
    tiempoBase = 8;
  } else if (temperatura <= 22) {
    tiempoBase = 7;
  } else if (temperatura <= 25) {
    tiempoBase = 6;
  } else if (temperatura <= 27) {
    tiempoBase = 5;
  } else if (temperatura <= 30) {
    tiempoBase = 4;
  } else {
    tiempoBase = 3;
  }

  const minimo = Math.max(2, tiempoBase - 1);
  const maximo = tiempoBase + 1;

  return `${minimo}–${maximo} horas`;
}

export default function CalculadoraMasa() {
  const [cantidadHarina, setCantidadHarina] = useState<number>(6);
  const [unidad, setUnidad] = useState<Unidad>("lb");
  const [hidratacion, setHidratacion] = useState<number>(70);
  const [temperatura, setTemperatura] = useState<number>(24);

  useEffect(() => {
    document.title = "Calculadora | Masa Madre";
  }, []);

  const resultados = useMemo(() => {
    const harinaGramos = convertirAGramos(cantidadHarina, unidad);

    const aguaGramos = harinaGramos * (hidratacion / 100);

    // La sal se calcula automáticamente al 2%
    const salGramos = harinaGramos * SAL_PORCENTAJE;

    const pesoTotal = harinaGramos + aguaGramos + salGramos;

    return {
      harinaGramos,
      aguaGramos,
      salGramos,
      pesoTotal,
      fermentacion: obtenerTiempoFermentacion(temperatura),
    };
  }, [cantidadHarina, unidad, hidratacion, temperatura]);

  const hidratacionSeleccionada = HIDRATACIONES.find(
    (item) => item.valor === hidratacion
  );

  const aguaLitros = resultados.aguaGramos / 1000;

  return (
    <div className="calculadora-container">
      <Navbar />
      <div className="calculadora-grid">
        {/* FORMULARIO */}
        <section className="calculadora-card">
          <div className="calculadora-header">
            <h2> Datos de tu masa</h2>
            <p>
              Ingresa la cantidad de harina y selecciona la hidratación que
              deseas.
            </p>
          </div>

          {/* HARINA */}
          <div className="campo">
            <label htmlFor="harina">Cantidad de harina</label>

            <div className="harina-input">
              <input
                id="harina"
                type="number"
                min="0.1"
                step="0.1"
                value={cantidadHarina}
                onChange={(e) =>
                  setCantidadHarina(Number(e.target.value))
                }
              />

              <select
                value={unidad}
                onChange={(e) =>
                  setUnidad(e.target.value as Unidad)
                }
              >
                <option value="lb">Libras (lb)</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="g">Gramos (g)</option>
              </select>
            </div>
          </div>

          {/* HIDRATACIÓN */}
          <div className="campo">
            <label htmlFor="hidratacion">
               Hidratación
            </label>

            <select
              id="hidratacion"
              className="select-hidratacion"
              value={hidratacion}
              onChange={(e) =>
                setHidratacion(Number(e.target.value))
              }
            >
              {HIDRATACIONES.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.valor}% — {item.descripcion}
                </option>
              ))}
            </select>

            {hidratacionSeleccionada && (
              <div className="descripcion-hidratacion">
                <strong>{hidratacionSeleccionada.valor}%</strong>{" "}
                — {hidratacionSeleccionada.descripcion}.
              </div>
            )}
          </div>

          {/* TEMPERATURA */}
          <div className="campo">
            <label htmlFor="temperatura">
               Temperatura ambiente
            </label>

            <div className="temperatura-input">
              <input
                id="temperatura"
                type="number"
                min="15"
                max="35"
                value={temperatura}
                onChange={(e) =>
                  setTemperatura(Number(e.target.value))
                }
              />

              <span>°C</span>
            </div>
          </div>

          {/* INFORMACIÓN DE SAL */}
          <div className="sal-info">
            <span className="sal-icon"></span>

            <div>
              <strong>Sal calculada automáticamente</strong>
              <p>
                Se utiliza un estándar del 2% respecto a la cantidad
                de harina.
              </p>
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="calculadora-card resultado-card">
          <div className="calculadora-header">
            <h2>Tu receta</h2>

            <span className="badge-hidratacion">
              {hidratacion}% de hidratación
            </span>
          </div>

          {/* HARINA */}
          <div className="resultado-row">
            <span> Harina</span>

            <strong>
              {formatearNumero(cantidadHarina, unidad === "g" ? 0 : 1)}{" "}
              {unidad}
            </strong>
          </div>

          {/* AGUA */}
          <div className="resultado-row">
            <span>Agua</span>

            <strong>
              {formatearNumero(aguaLitros, 2)} L
              <small>
                {formatearNumero(resultados.aguaGramos)} ml
              </small>
            </strong>
          </div>

          {/* SAL */}
          <div className="resultado-row">
            <span>Sal</span>

            <strong>
              {formatearNumero(resultados.salGramos)} g
            </strong>
          </div>

          {/* PESO TOTAL */}
          <div className="resultado-row resultado-total">
            <span> Peso total de la masa</span>

            <strong>
              {formatearNumero(resultados.pesoTotal / 1000, 2)} kg
              <small>
                {formatearNumero(resultados.pesoTotal)} g
              </small>
            </strong>
          </div>

          {/* FERMENTACIÓN */}
          <div className="resultado-row">
            <span> Fermentación</span>

            <strong className="tiempo-fermentacion">
              {resultados.fermentacion}
            </strong>
          </div>

          {/* CONSEJO */}
          <div className="consejo">
            <strong>Consejo:</strong> el tiempo de fermentación es
            aproximado. Observa la masa: debe aumentar de volumen y
            presentar señales de fermentación, como burbujas y una
            textura más aireada.
          </div>
        </section>
      </div>
    </div>
  );
}

const materias = {
  "Cálculo vectorial": ["Cálculo integral"],
  "Álgebra lineal": ["Cálculo vectorial", "Ecuaciones diferenciales", "Señales y sistemas"],
  "Introducción a la programación": ["Programación avanzada", "Diseño de sistemas con procesadores"],
  "Lab de adquisición de señales": ["Fundamentos de circuitos eléctricos"],
  "Innovación y diseño de producto": ["Fundamentos de los materiales"],
  "Introduccion a la ingenieria": ["Proyecto de diseño de ingeniería"],

  "Cálculo integral": ["Cálculo vectorial", "Ecuaciones diferenciales", "Señales y sistemas", "Probabilidad y estadística inferencial", "Electricidad y magnetismo"],
  "Programación avanzada": ["Proyecto de diseño en mecatrónica"],
  "Física mecánica": ["Fluidos y termodinámica"],
  "Fundamentos de los materiales": ["Procesos de manufactura moderna"],
  "Proyecto de diseño de ingeniería": ["Significación teológica", "Proyecto de diseño en mecatrónica"],

  "Cálculo vectorial (2)": ["Estática y dinámica"],
  "Ecuaciones diferenciales": ["Análisis de sistemas dinámicos"],
  "Señales y sistemas": ["Control de sistemas"],
  "Fluidos y termodinámica": ["Análisis de sistemas dinámicos"],
  "Fundamentos de circuitos eléctricos": ["Electrónica analógica y sus aplicaciones"],
  "Procesos de manufactura moderna": ["Diseño de máquinas"],

  "Probabilidad y estadística inferencial": ["Metrología e instrumentación"],
  "Estática y dinámica": ["Diseño de máquinas"],
  "Electricidad y magnetismo": ["Metrología e instrumentación"],
  "Análisis de sistemas dinámicos": ["Control de sistemas"],

  "Control de sistemas": ["Herramientas de robótica"],
  "Diseño de sistemas con procesadores": ["Proyecto de diseño en mecatrónica"],
  "Automatización": ["Proyecto de diseño en mecatrónica", "Manufactura flexible"],
  "Metrología e instrumentación": ["Trabajo de grado"],

  "Proyecto de diseño en mecatrónica": ["Proyecto social universitario", "Ética, tecnología e ingeniería", "Seminario de Trabajo de Grado", "Emprendimiento tecnológico"],
  "Seminario de Trabajo de Grado": ["Trabajo de grado"]
};

const malla = {
  "PRIMER SEMESTRE": [
    "Cálculo vectorial", "Álgebra lineal", "Introducción a la programación",
    "Lab de adquisición de señales", "Innovación y diseño de producto",
    "Introduccion a la ingenieria"
  ],
  "SEGUNDO SEMESTRE": [
    "Cálculo integral", "Programación avanzada", "Física mecánica",
    "Fundamentos de los materiales", "Proyecto de diseño de ingeniería", "Electiva"
  ],
  "TERCER SEMESTRE": [
    "Cálculo vectorial (2)", "Ecuaciones diferenciales", "Señales y sistemas",
    "Fluidos y termodinámica", "Fundamentos de circuitos eléctricos",
    "Procesos de manufactura moderna"
  ],
  "CUARTO SEMESTRE": [
    "Probabilidad y estadística inferencial", "Estática y dinámica",
    "Electricidad y magnetismo", "Análisis de sistemas dinámicos",
    "Significación teológica", "Electiva"
  ],
  "QUINTO SEMESTRE": [
    "Electiva", "Control de sistemas", "Diseño de sistemas con procesadores",
    "Automatización", "Diseño de máquinas", "Metrología e instrumentación"
  ],
  "SEXTO SEMESTRE": [
    "Electiva", "Herramientas de robótica", "Proyecto de diseño en mecatrónica",
    "Manufactura flexible", "Electrónica analógica y sus aplicaciones",
    "Constitución política"
  ],
  "SÉPTIMO SEMESTRE": [
    "Énfasis", "Énfasis", "Complementaria",
    "Seminario de Trabajo de Grado", "Proyecto social universitario",
    "Ética, tecnología e ingeniería", "Fe y compromiso del ingeniero"
  ],
  "OCTAVO SEMESTRE": [
    "Énfasis", "Complementaria", "Complementaria",
    "Trabajo de grado", "Emprendimiento tecnológico", "Epistemología de la ingeniería"
  ]
};

const contenedor = document.getElementById("malla");
const botones = {};

for (let semestre in malla) {
  const divSemestre = document.createElement("div");
  divSemestre.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  divSemestre.appendChild(titulo);

  malla[semestre].forEach(materia => {
    const btn = document.createElement("button");
    btn.textContent = materia;
    btn.className = "materia";
    const tienePrereq = Object.values(materias).some(arr => arr.includes(materia));
    btn.disabled = tienePrereq;
    btn.addEventListener("click", () => aprobarMateria(materia));
    botones[materia] = btn;
    divSemestre.appendChild(btn);
  });

  contenedor.appendChild(divSemestre);
}

function aprobarMateria(materia) {
  const btn = botones[materia];
  btn.classList.add("aprobada");
  btn.disabled = true;

  for (let siguiente in materias) {
    if (materias[siguiente].includes(materia)) {
      const requisitos = materias[siguiente];
      const aprobados = requisitos.every(req => botones[req]?.classList.contains("aprobada"));
      if (aprobados && botones[siguiente]) {
        botones[siguiente].disabled = false;
      }
    }
  }
}

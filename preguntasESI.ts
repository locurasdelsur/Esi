export type EjeId = 'cuerpo-salud' | 'afectividad' | 'equidad-genero' | 'diversidad-sexual' | 'derechos'
export type Dificultad = 'facil' | 'media' | 'dificil'

export type PreguntaESI = {
  id: number
  eje: EjeId
  dificultad: Dificultad
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

export const preguntasESI: PreguntaESI[] = [
  { id: 1, eje: 'cuerpo-salud', dificultad: 'facil', pregunta: '¿Qué significa cuidar el cuerpo desde la perspectiva de la ESI?', opciones: ['Preocuparse únicamente por la apariencia física.', 'Cumplir con determinados modelos de belleza.', 'Reconocer el cuerpo, cuidarlo, respetarlo y conocer los derechos relacionados con la salud.', 'Evitar hablar sobre el cuerpo.'], respuestaCorrecta: 2, explicacion: 'La ESI propone reconocer el cuerpo como una dimensión integral y promover su cuidado, respeto y bienestar.' },
  { id: 2, eje: 'cuerpo-salud', dificultad: 'media', pregunta: '¿Qué situación representa una forma de cuidado?', opciones: ['Consultar a una persona profesional de la salud cuando es necesario.', 'Ignorar una molestia física.', 'Ocultar siempre los problemas de salud.', 'Comparar nuestro cuerpo con el de otras personas.'], respuestaCorrecta: 0, explicacion: 'Buscar información confiable y recurrir a profesionales cuando corresponde forma parte del cuidado integral.' },
  { id: 3, eje: 'afectividad', dificultad: 'facil', pregunta: '¿Qué caracteriza a un vínculo respetuoso?', opciones: ['Controlar a la otra persona.', 'Imponer siempre nuestra opinión.', 'Evitar cualquier desacuerdo.', 'Escuchar, respetar límites y poder expresar lo que sentimos.'], respuestaCorrecta: 3, explicacion: 'Los vínculos saludables incluyen escucha, respeto, reconocimiento de límites y diálogo.' },
  { id: 4, eje: 'afectividad', dificultad: 'media', pregunta: 'Si una persona dice que no quiere recibir un abrazo, ¿qué corresponde hacer?', opciones: ['Insistir hasta que acepte.', 'Tomarlo como una broma.', 'Respetar su decisión.', 'Preguntar a otras personas si debería aceptar.'], respuestaCorrecta: 2, explicacion: 'Los límites personales deben ser respetados. Nadie está obligado a aceptar un contacto físico que no desea.' },
  { id: 5, eje: 'equidad-genero', dificultad: 'facil', pregunta: '¿Qué es un estereotipo de género?', opciones: ['Una ley.', 'Una característica biológica.', 'Una idea social que atribuye roles o características según el género.', 'Una elección personal.'], respuestaCorrecta: 2, explicacion: 'Los estereotipos son ideas generalizadas sobre cómo deberían ser o comportarse las personas.' },
  { id: 6, eje: 'equidad-genero', dificultad: 'media', pregunta: '¿La elección de una profesión debería estar limitada por el género?', opciones: ['Sí.', 'Solamente algunas profesiones.', 'No.', 'Depende de los estereotipos sociales.'], respuestaCorrecta: 2, explicacion: 'Todas las personas deben poder desarrollar sus intereses sin quedar limitadas por estereotipos.' },
  { id: 7, eje: 'diversidad-sexual', dificultad: 'facil', pregunta: '¿Qué significa respetar la diversidad?', opciones: ['Aceptar solamente a quienes piensan como nosotros.', 'Evitar hablar sobre diferencias.', 'Reconocer diferentes formas de vivir y construir la identidad, respetando derechos.', 'Hacer que todas las personas sean iguales.'], respuestaCorrecta: 2, explicacion: 'La diversidad forma parte de la vida social y merece reconocimiento, respeto y protección.' },
  { id: 8, eje: 'diversidad-sexual', dificultad: 'media', pregunta: '¿Qué actitud favorece una escuela inclusiva?', opciones: ['Usar apodos que incomodan.', 'Excluir a quienes son diferentes.', 'No intervenir ante una burla.', 'Escuchar, respetar identidades y evitar la discriminación.'], respuestaCorrecta: 3, explicacion: 'Una escuela inclusiva garantiza participación y trato digno para todas las personas.' },
  { id: 9, eje: 'derechos', dificultad: 'facil', pregunta: '¿Qué significa ejercer nuestros derechos?', opciones: ['Hacer siempre lo que queremos.', 'Conocerlos, reclamarlos y respetar los derechos de las demás personas.', 'Evitar pedir ayuda.', 'Dejar que otras personas decidan por nosotros.'], respuestaCorrecta: 1, explicacion: 'Los derechos nos protegen y también implican responsabilidades de convivencia.' },
  { id: 10, eje: 'derechos', dificultad: 'media', pregunta: '¿Qué podemos hacer frente a una situación de vulneración de derechos?', opciones: ['Callar para evitar problemas.', 'Compartir datos íntimos en redes.', 'Buscar acompañamiento y pedir ayuda a personas o instituciones de confianza.', 'Resolverlo mediante violencia.'], respuestaCorrecta: 2, explicacion: 'Pedir ayuda y recurrir a redes de confianza es una forma de cuidado y ejercicio de derechos.' },
]

export const ejes = [
  { id: 'cuerpo-salud' as EjeId, title: 'Cuidar el cuerpo y la salud', short: 'Cuerpo y salud', color: '#2e9b83', icon: '✦', description: 'Bienestar integral, límites y cuidado.' },
  { id: 'afectividad' as EjeId, title: 'Valorar la afectividad', short: 'Afectividad', color: '#e68a55', icon: '◒', description: 'Emociones, vínculos y escucha.' },
  { id: 'equidad-genero' as EjeId, title: 'Garantizar la equidad de género', short: 'Equidad de género', color: '#8b72b7', icon: '◈', description: 'Oportunidades, estereotipos y respeto.' },
  { id: 'diversidad-sexual' as EjeId, title: 'Respetar la diversidad sexual', short: 'Diversidad sexual', color: '#d66977', icon: '✺', description: 'Identidades, inclusión y convivencia.' },
  { id: 'derechos' as EjeId, title: 'Ejercer nuestros derechos', short: 'Derechos', color: '#d4a52c', icon: '⊙', description: 'Participación, ciudadanía y voz.' },
]

export const actividades = [
  ['01', 'Desafío ESI', '¿Cuánto sabemos?', 'quiz'],
  ['02', '¿Qué harías si…?', 'Tomamos posición, reflexionamos y construimos respuestas.', 'situaciones'],
  ['03', 'La ESI en una palabra', 'Creamos consultas, mensajes y producciones colectivas.', 'ideas'],
  ['04', 'Mural de los vínculos', 'Diseñamos una producción visual para nuestra escuela.', 'mural'],
] as const
export type ActivityId = typeof actividades[number][3]

export const cursos = ['1°1', '1°2', '1°3', '1°4', '1°5', '1°6', '2°1', '2°2', '2°3', '2°4', '2°5', '2°6', '3°1', '3°2', '3°3', '3°4', '3°5', '3°6', '4°1', '4°2', '4°3', '4°4', '4°5', '5°1', '5°2', '5°3', '5°6', '5°7', '6°1', '6°2', '6°3', '6°6', '6°7', '7°1', '7°2', '7°3', '7°6', '7°7']
export const timeline = [{ year: '2006', title: 'La ESI se convierte en ley', text: 'Comienza un camino común para garantizar el derecho a la educación sexual integral.' }, { year: '2010', title: 'Nuevas voces en la escuela', text: 'La comunidad educativa amplía conversaciones sobre vínculos, derechos y diversidad.' }, { year: '2020', title: 'Cuidarnos también es aprender', text: 'La escuela encuentra nuevas formas de acompañar y sostener la participación.' }, { year: '2026', title: 'Nuestra huella', text: 'Celebramos 20 años y pensamos la escuela que queremos construir.' }]
export const quizModes = [{ id: 'all', title: 'Toda la ESI', text: '10 preguntas equilibradas entre los cinco ejes.', count: 10 }, { id: 'axis', title: 'Un eje', text: 'Elegí un eje y profundizá en sus preguntas.', count: 10 }, { id: 'five', title: 'Desafío de los cinco ejes', text: 'Tres preguntas por cada eje.', count: 15 }, { id: 'full', title: 'Desafío completo', text: '20 preguntas para recorrer todo el banco.', count: 20 }] as const
export type QuizMode = typeof quizModes[number]['id']

export const ejeById = (id: EjeId) => ejes.find((eje) => eje.id === id) ?? ejes[0]
export const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5)
export const buildQuiz = (mode: QuizMode, selectedEje?: EjeId) => {
  if (mode === 'axis' && selectedEje) return shuffle(preguntasESI.filter((p) => p.eje === selectedEje)).slice(0, 10)
  if (mode === 'five') return ejes.flatMap((eje) => shuffle(preguntasESI.filter((p) => p.eje === eje.id)).slice(0, 3))
  return shuffle(preguntasESI).slice(0, mode === 'full' ? 20 : 10)
}


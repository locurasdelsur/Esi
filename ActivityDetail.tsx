'use client'

import { useState, useRef } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Download, Sparkles } from 'lucide-react'
import { actividades } from '@/data/preguntasESI'
import { toPng } from 'html-to-image'

interface ActivityDetailProps {
activityId: string
onBack: () => void
onStartQuiz: () => void
onSave: (id: string, response: string) => void
}

const muralTemplates = [
{ id: 't1', name: 'Plantilla 1: Cohete y Estrellas', image: '/murals/planilla-01.png' },
{ id: 't2', name: 'Plantilla 2: Manos Unidas', image: '/murals/planilla-02.png' },
{ id: 't3', name: 'Plantilla 3: Diversidad', image: '/murals/planilla-03.png' },
{ id: 't4', name: 'Plantilla 4: Diálogo', image: '/murals/planilla-04.png' },
{ id: 't5', name: 'Plantilla 5: Futuro', image: '/murals/planilla-05.png' },
{ id: 't6', name: 'Plantilla 6: Respeto', image: '/murals/planilla-06.png' },
{ id: 't7', name: 'Plantilla 7: Comunidad', image: '/murals/planilla-07.png' },
]

export function ActivityDetail({ activityId, onBack, onStartQuiz, onSave }: ActivityDetailProps) {
const currentActivityInfo = actividades.find((act) => act[3] === activityId)
const [response, setResponse] = useState('')
const [saved, setSaved] = useState(false)

// Estados específicos para la Actividad de Mural
const [selectedTemplate, setSelectedTemplate] = useState(muralTemplates[0].image)
const [muralTexts, setMuralTexts] = useState<string[]>(['', ''])
const muralRef = useRef(null)

if (!currentActivityInfo) {
return (

Actividad no encontrada

Volver a actividades


)
}

const [number, title, description, id] = currentActivityInfo

const handleSave = () => {
if (id === 'mural') {
const muralData = JSON.stringify({
template: selectedTemplate,
texts: muralTexts,
})
onSave(id, muralData)
} else {
if (!response.trim()) return
onSave(id, response)
}
setSaved(true)
}

const handleDownloadMural = async () => {
if (muralRef.current) {
try {
const dataUrl = await toPng(muralRef.current, { cacheBust: true })
const link = document.createElement('a')
link.download = 'mural-esi-20anos.png'
link.href = dataUrl
link.click()

    // Guardamos el mural y su imagen en base64 para el PDF final
    const muralData = JSON.stringify({
      template: selectedTemplate,
      texts: muralTexts,
      images: [dataUrl],
    })
    onSave(id, muralData)
    setSaved(true)
  } catch (err) {
    console.error('Error al generar la imagen del mural:', err)
  }
}


}

return (


 Volver al recorrido guiado


  <div className="mt-6 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-[#e3e9e4] sm:p-12">
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-black text-[#e68a55]">
        Actividad {number}
      </span>
      {saved && (
        <span className="flex items-center gap-1.5 text-sm font-bold text-[#286f60]">
          <CheckCircle className="size-5 text-[#286f60]" /> Guardado correctamente
        </span>
      )}
    </div>

    <h2 className="mt-5 text-3xl font-black text-[#286f60] sm:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-relaxed text-[#718078]">{description}</p>

    {/* Renderizado especial para el Desafío */}
    {id === 'quiz' && (
      <div className="mt-10 rounded-3xl bg-[#e4f0e9] p-8 text-center">
        <Sparkles className="mx-auto mb-3 size-8 text-[#286f60]" />
        <h3 className="text-xl font-bold text-[#286f60]">Completá el Desafío ESI</h3>
        <p className="mt-2 text-sm text-[#66746e]">Respondé las preguntas para registrar tu avance en esta actividad.</p>
        <button onClick={onStartQuiz} className="mt-6 rounded-full bg-[#286f60] px-7 py-3.5 font-bold text-white shadow hover:bg-[#20574c]">
          Ir al Desafío ESI <ArrowRight className="ml-2 inline size-4" />
        </button>
      </div>
    )}

    {/* Renderizado especial para el Mural Interactivo */}
    {id === 'mural' && (
      <div className="mt-10 space-y-8">
        <div>
          <label className="block mb-3 text-sm font-bold text-[#286f60]">1. Elegí una plantilla para tu mural:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {muralTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.image)}
                className={`rounded-2xl border-2 p-2 transition text-left text-xs font-semibold ${selectedTemplate === template.image ? 'border-[#286f60] bg-[#e4f0e9]' : 'border-[#dfe6df] bg-white'}`}
              >
                <img src={template.image} alt={template.name} className="h-20 w-full object-cover rounded-xl mb-2" />
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contenedor del Mural que será capturado con html-to-image */}
        <div>
          <label className="block mb-3 text-sm font-bold text-[#286f60]">2. Vista previa y textos de tu mural:</label>
          <div ref={muralRef} className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-[#286f60] bg-white shadow-md">
            <img src={selectedTemplate} alt="Plantilla seleccionada" className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center pointer-events-none">
              <input
                type="text"
                value={muralTexts[0]}
                onChange={(e) => setMuralTexts([e.target.value, muralTexts[1]])}
                placeholder="Escribí un mensaje principal aquí..."
                className="w-3/4 rounded-xl bg-white/90 px-4 py-2 text-center text-sm font-bold text-[#28342f] shadow pointer-events-auto border border-[#286f60]/30"
              />
              <input
                type="text"
                value={muralTexts[1]}
                onChange={(e) => setMuralTexts([muralTexts[0], e.target.value])}
                placeholder="Escribí un segundo mensaje o frase..."
                className="w-3/4 rounded-xl bg-white/90 px-4 py-2 text-center text-sm font-bold text-[#28342f] shadow pointer-events-auto border border-[#286f60]/30"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={handleDownloadMural}
            className="flex items-center gap-2 rounded-full bg-[#286f60] px-7 py-3.5 font-bold text-white shadow hover:bg-[#20574c]"
          >
            <Download className="size-5" /> Guardar mural (Descargar imagen)
          </button>
        </div>
      </div>
    )}

    {/* Renderizado estándar para texto */}
    {id !== 'quiz' && id !== 'mural' && (
      <div className="mt-8 space-y-4">
        <label className="block text-sm font-bold text-[#286f60]">Tu respuesta / producción:</label>
        <textarea
          rows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Escribí tu reflexión o respuesta aquí..."
          className="w-full rounded-2xl border border-[#dfe6df] p-4 text-[#28342f] focus:border-[#286f60] focus:outline-none"
        />
        <button
          onClick={handleSave}
          disabled={!response.trim()}
          className="rounded-full bg-[#e68a55] px-7 py-3.5 font-bold text-white shadow hover:bg-[#d97845] disabled:opacity-50"
        >
          Guardar respuesta
        </button>
      </div>
    )}
  </div>
</section>


)
}

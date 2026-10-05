'use client'

import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle, Download, Sparkles } from 'lucide-react'
import { toPng } from 'html-to-image'
import { actividades } from '@/data/preguntasESI'

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
  const activity = actividades.find((item) => item[3] === activityId)
  const [response, setResponse] = useState('')
  const [saved, setSaved] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(muralTemplates[0].image)
  const [muralTexts, setMuralTexts] = useState(['', ''])
  const [downloading, setDownloading] = useState(false)
  const muralRef = useRef<HTMLDivElement>(null)

  if (!activity) return <section className="mx-auto max-w-7xl px-5 py-14"><p>Actividad no encontrada.</p><button onClick={onBack}>Volver a actividades</button></section>

  const [number, title, description, id] = activity
  const saveMural = (image?: string) => onSave(id, JSON.stringify({ template: selectedTemplate, texts: muralTexts, images: image ? [image] : [] }))
  const handleSave = () => {
    if (id === 'mural') saveMural()
    else if (response.trim()) onSave(id, response.trim())
    else return
    setSaved(true)
  }
  const handleDownloadMural = async () => {
    if (!muralRef.current || downloading) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(muralRef.current, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = 'mural-esi-20-anos.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      link.remove()
      saveMural(dataUrl)
      setSaved(true)
    } catch (error) {
      console.error('Error al descargar el mural:', error)
    } finally {
      setDownloading(false)
    }
  }

  return <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
    <button onClick={onBack} className="font-bold text-[#286f60]">← Volver al recorrido guiado</button>
    <div className="mt-6 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-[#e3e9e4] sm:p-12">
      <div className="flex items-center justify-between"><span className="rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-black text-[#e68a55]">Actividad {number}</span>{saved && <span className="flex items-center gap-1.5 text-sm font-bold text-[#286f60]"><CheckCircle className="size-5" /> Guardado correctamente</span>}</div>
      <h2 className="mt-5 text-3xl font-black text-[#286f60] sm:text-4xl">{title}</h2><p className="mt-3 text-base leading-relaxed text-[#718078]">{description}</p>
      {id === 'quiz' && <div className="mt-10 rounded-3xl bg-[#e4f0e9] p-8 text-center"><Sparkles className="mx-auto mb-3 size-8 text-[#286f60]" /><h3 className="text-xl font-bold text-[#286f60]">Completá el Desafío ESI</h3><button onClick={onStartQuiz} className="mt-6 rounded-full bg-[#286f60] px-7 py-3.5 font-bold text-white">Ir al Desafío ESI <ArrowRight className="ml-2 inline size-4" /></button></div>}
      {id === 'mural' && <div className="mt-10 space-y-8"><div><label className="mb-3 block text-sm font-bold text-[#286f60]">1. Elegí una plantilla para tu mural:</label><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{muralTemplates.map((template) => <button type="button" key={template.id} onClick={() => setSelectedTemplate(template.image)} className={`rounded-2xl border-2 p-2 text-left text-xs font-semibold ${selectedTemplate === template.image ? 'border-[#286f60] bg-[#e4f0e9]' : 'border-[#dfe6df] bg-white'}`}><img src={template.image} alt={template.name} className="mb-2 h-20 w-full rounded-xl object-cover" />{template.name}</button>)}</div></div><div><label className="mb-3 block text-sm font-bold text-[#286f60]">2. Vista previa y textos:</label><div ref={muralRef} className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-[#286f60] bg-white shadow-md"><img src={selectedTemplate} alt="Plantilla seleccionada" className="absolute inset-0 h-full w-full object-cover opacity-90" /><div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center"><input aria-label="Mensaje principal" value={muralTexts[0]} onChange={(e) => setMuralTexts([e.target.value, muralTexts[1]])} placeholder="Escribí un mensaje principal aquí..." className="w-3/4 rounded-xl border border-[#286f60]/30 bg-white/90 px-4 py-2 text-center text-sm font-bold text-[#28342f] shadow" /><input aria-label="Segundo mensaje" value={muralTexts[1]} onChange={(e) => setMuralTexts([muralTexts[0], e.target.value])} placeholder="Escribí un segundo mensaje o frase..." className="w-3/4 rounded-xl border border-[#286f60]/30 bg-white/90 px-4 py-2 text-center text-sm font-bold text-[#28342f] shadow" /></div></div></div><button type="button" onClick={handleDownloadMural} disabled={downloading} className="flex items-center gap-2 rounded-full bg-[#286f60] px-7 py-3.5 font-bold text-white disabled:opacity-50"><Download className="size-5" />{downloading ? 'Preparando imagen…' : 'Guardar mural (descargar PNG)'}</button></div>}
      {id !== 'quiz' && id !== 'mural' && <div className="mt-8 space-y-4"><label className="block text-sm font-bold text-[#286f60]">Tu respuesta / producción:</label><textarea rows={5} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Escribí tu reflexión o respuesta aquí..." className="w-full rounded-2xl border border-[#dfe6df] p-4 text-[#28342f]" /><button type="button" onClick={handleSave} disabled={!response.trim()} className="rounded-full bg-[#e68a55] px-7 py-3.5 font-bold text-white disabled:opacity-50">Guardar respuesta</button></div>}
    </div>
  </section>
}

export { muralTemplates }

'use client'

import { useState } from 'react'
import { cursos } from '@/data/preguntasESI'

export function CertificateCard({ score, total }: { score: number; total: number }) {
  const [student, setStudent] = useState('')
  const [course, setCourse] = useState(cursos[0])
  const percentage = Math.round((score / total) * 100)

  function downloadCertificate() {
    const safeName = student.trim() || 'Estudiante'
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Certificado ESI - ${safeName}</title><style>body{margin:0;background:#eef6f0;font-family:Arial,sans-serif;color:#286f60}.page{box-sizing:border-box;width:1120px;height:790px;margin:40px auto;padding:78px;border:14px solid #f5d963;background:#fff;text-align:center;outline:3px solid #286f60;outline-offset:-28px}.eyebrow{letter-spacing:5px;text-transform:uppercase;color:#e68a55;font-weight:bold}.name{font-size:54px;margin:48px 0 12px;color:#286f60}.score{font-size:42px;color:#e68a55;font-weight:bold}.small{color:#66746e;font-size:20px}.line{width:360px;border-top:1px solid #b9cec2;margin:70px auto 12px}</style></head><body><main class="page"><p class="eyebrow">E.S.I. N° 6 · Banfield · 20 años</p><h1>Certificado de participación</h1><p class="small">Se reconoce a</p><div class="name">${safeName.replace(/[<>&"']/g, '')}</div><p class="small">por completar el Desafío ESI y participar en la construcción de una escuela con más derechos.</p><p class="score">Puntaje: ${score}/${total} · ${percentage}%</p><p class="small">Curso: ${course}</p><div class="line"></div><p class="small">E.S.I. N° 6 — Escuela Secundaria Técnica de Banfield</p></main></body></html>`
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `certificado-esi-${course}.html`
    link.click()
    URL.revokeObjectURL(url)
  }

  return <section className="mx-auto mt-6 max-w-xl rounded-[2rem] bg-white p-7 ring-1 ring-[#dfe6df]">
    <p className="text-sm font-bold uppercase tracking-[.18em] text-[#e68a55]">Tu certificado</p>
    <h3 className="mt-2 text-2xl font-black text-[#286f60]">Descargá tu reconocimiento</h3>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <label className="text-left text-sm font-bold text-[#286f60]">Nombre y apellido<input value={student} onChange={(event) => setStudent(event.target.value)} placeholder="Escribí tu nombre" className="mt-2 w-full rounded-xl border border-[#b9cec2] bg-[#fbfaf7] px-3 py-3 font-normal outline-none focus:border-[#286f60]" /></label>
      <label className="text-left text-sm font-bold text-[#286f60]">Curso<select value={course} onChange={(event) => setCourse(event.target.value)} className="mt-2 w-full rounded-xl border border-[#b9cec2] bg-[#fbfaf7] px-3 py-3 font-normal outline-none focus:border-[#286f60]">{cursos.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <button onClick={downloadCertificate} disabled={!student.trim()} className="mt-5 w-full rounded-full bg-[#e68a55] px-6 py-3.5 font-bold text-white transition hover:bg-[#d97845] disabled:cursor-not-allowed disabled:opacity-50">Descargar certificado</button>
    <p className="mt-3 text-center text-xs text-[#718078]">Se descarga como un archivo listo para abrir, imprimir o guardar como PDF.</p>
  </section>
}

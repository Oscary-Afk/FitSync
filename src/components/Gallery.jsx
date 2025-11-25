import '../styles/Gallery.css'
import { useEffect, useState } from 'react';

export default function Gallery() {

   const imagesPreview = [
        "galeriaImagen1.webp",
        "galeriaImagen2.jpg",
        "galeriaImagen3.jpg",
        "galeriaImagen4.png"
    ];

    const [images, setImages] = useState([])
    const [zoomSrc, setZoomSrc] = useState(null);

    useEffect(() => {
  const controller = new AbortController()

  const load = async () => {
    try {
      const res = await fetch('/api/gallery', { signal: controller.signal }) // ojo con la barra final

      if (!res.ok) {
        console.error('Gallery load failed status', res.status)
        setImages([])
        return
      }

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        console.error('Gallery: expected JSON but got', contentType)
        const text = await res.text()   // lee el cuerpo aunque sea HTML
        console.log("Respuesta no JSON:", text)
        setImages([])
        return
      }

      const data = await res.json()
      console.log("Respuesta JSON cruda:", data)   // 👈 aquí ves lo que llega

      const normalized = (Array.isArray(data) ? data : []).map((d, i) => ({
        id: d.id ?? `api-${i}`,
        url: d.ruta_imagen ?? d.url ?? '',
        alt: d.titulo ?? d.alt ?? `Imagen ${i}`
      })).filter(x => x.url)

      console.log("Imágenes normalizadas:", normalized) // 👈 ves cómo quedaron
      setImages(normalized)
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Gallery fetch error:', err)
        setImages([])
      }
    }
  }

  load()
  return () => controller.abort()
}, [])


    const toggleZoom = (src) => {
        setZoomSrc(prev => (prev === src ? null : src));
        imagen.classList.toggle("zoom");
    };

    return (
        <section className="Gallery">
            <div className="Gallery-container">
                <div className="Gallery-content">
                    <div className="gallery-header">
                        <h2>Gallery</h2>
                    </div>
                    <div className="gallery-images">
                         {images.map((img) => (
                            <img
                            key={img.id}
                            src={img.url} // ruta relativa a public/
                            alt={img.alt || ''}
                            className='gallery-image'
                            onClick={() => toggleZoom(src)}
                            />
                        ))}

                        { /* images.map((img) => (
                            <img
                                key={img.id}
                                src={img.url}
                                alt={img.alt || ''}
                                className="gallery-thumb"
                                onClick={() => toggleZoom(img.url)}
                            />
                        )) */}
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
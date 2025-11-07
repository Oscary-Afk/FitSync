import '../styles/Gallery.css'
import { useEffect, useState } from 'react';

export default function Gallery() {

    const imagesPreview = [
        "galeriaImagen1.jpg",
        "galeriaImagen2.jpg",
        "galeriaImagen3.jpg",
    ];

    const [images, setImages] = useState([])
    const [zoomSrc, setZoomSrc] = useState(null);

    useEffect(() => {
    fetch('/api/gallery')
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed')
        return res.json()
      })
      .then(data => {
          if (cancelled) return
          // normaliza los campos que venga del backend (ruta_imagen o url)
          const normalized = data.map((d, i) => ({
            id: d.id ?? `api-${i}`,
            url: d.ruta_imagen ?? d.url ?? '',
            alt: d.titulo ?? d.alt ?? ''
          })).filter(x => x.url) // descarta entradas sin url
          setImages(normalized)
        })
      .catch(err => {
        console.error(err)
        setImages([])
      })
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
                         {imagesPreview.map((name, i) => (
                            <img
                            key={i}
                            src={`/galleryImages/${name}`} // ruta relativa a public/
                            alt={`Imagen ${i}`}
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
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="imagen chica"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
document.addEventListener('DOMContentLoaded', () => {
    // URL de tu API Node.js/Express
    const API_URL = 'http://localhost:3000/api/blog'; 

    const gridContainer = document.getElementById('blog-grid');

    // Función para obtener datos
    const fetchPosts = async () => {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('Error en la red');
            }

            const posts = await response.json();
            renderPosts(posts);

        } catch (error) {
            console.error('Error fetching posts:', error);
            gridContainer.innerHTML = `<p class="error-msg">Error cargando los datos. Asegúrate de que tu servidor Express esté corriendo en ${API_URL}</p>`;
            
            // FALLBACK: Si falla la API, cargamos los datos del JSON que proporcionaste manualmente
            // para que puedas ver el diseño funcionar inmediatamente.
            console.log("Cargando datos de respaldo...");
            renderPosts(fallbackData); 
        }
    };

    // Función para renderizar el HTML
    const renderPosts = (posts) => {
        gridContainer.innerHTML = ''; // Limpiar loader

        posts.forEach(post => {
            // Formatear fecha
            const dateObj = new Date(post.date);
            const dateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
            
            // Obtener imagen dinámica basada en categoría (Ya que el JSON no tiene imágenes)
            const imageUrl = getImageByCategory(post.category);
            
            // Avatar aleatorio (simulado)
            const avatarUrl = `https://ui-avatars.com/api/?name=${post.author}&background=random&color=fff`;

            const cardHTML = `
                <article class="card">
                    <img src="${imageUrl}" alt="${post.title}" class="card-image" loading="lazy">
                    <div class="card-content">
                        <span class="card-category">${post.category}</span>
                        <div class="card-header">
                            <h3 class="card-title">
                                <a href="#">${post.title}</a>
                            </h3>
                            <i class="ri-arrow-right-up-line" style="font-size: 24px;"></i>
                        </div>
                        <p class="card-excerpt">${post.content}</p>
                        
                        <div class="card-meta">
                            <img src="${avatarUrl}" alt="${post.author}" class="author-avatar">
                            <div class="meta-info">
                                <span class="author-name">${post.author}</span>
                                <span class="post-date">${dateStr}</span>
                            </div>
                        </div>
                    </div>
                </article>
            `;

            gridContainer.innerHTML += cardHTML;
        });
    };

    // Helper para imágenes bonitas (Simulando lo que falta en el JSON)
    const getImageByCategory = (category) => {
        const catLower = category.toLowerCase();
        // URLs de Unsplash
        if(catLower.includes('tecnología') || catLower.includes('ia') || catLower.includes('smartphone')) return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('salud') || catLower.includes('dietas')) return 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('deportes') || catLower.includes('fútbol')) return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('entretenimiento') || catLower.includes('cine')) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('ciencia') || catLower.includes('espacio')) return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('negocios') || catLower.includes('crypto')) return 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('viajes')) return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('gastronomía') || catLower.includes('recetas')) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
        if(catLower.includes('medio ambiente')) return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800';
        // Default
        return 'https://images.unsplash.com/photo-1499750310159-5254f5337ef2?auto=format&fit=crop&q=80&w=800';
    };

    // Datos de respaldo (Tu JSON) por si no tienes el servidor corriendo ahora mismo
    const fallbackData = [
        {"id": 1, "title": "El avance de la Inteligencia Artificial en 2024", "content": "La IA continúa transformando industrias enteras, desde la medicina hasta las finanzas.", "category": "Tecnología", "date": "2024-01-15", "author": "Admin"},
        {"id": 2, "title": "Nuevas tendencias en dietas saludables", "content": "Expertos recomiendan un enfoque más balanceado y menos restrictivo para este año.", "category": "Salud", "date": "2024-01-16", "author": "Nutricionista"},
        {"id": 3, "title": "Resultados de la última jornada de fútbol", "content": "Los equipos locales dominaron la tabla de posiciones en un fin de semana lleno de goles.", "category": "Deportes", "date": "2024-01-17", "author": "Deportes Hoy"},
        {"id": 2404, "title": "Novedades Crypto", "content": "La plataforma de criptomonedas Crypto.com está buscando contratar a un comerciante cuantitativo.", "category": "Negocios", "date": "2024-02-10", "author": "Carlso"}
    ];

    // Iniciar
    fetchPosts();
});
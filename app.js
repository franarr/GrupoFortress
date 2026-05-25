// ==========================================================================
// CONTROLADOR LOGICO DEL MAPA INTERACTIVO - GRUPO FORTRESS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- VARIABLES DE ESTADO ---
  let map;
  let currentTheme = "dark"; // Default theme
  let tileLayer;
  let activeMarkers = [];
  let currentFilter = "all";
  let searchText = "";
  
  // --- CAPAS DE MAPA (TILE LAYERS) ---
  const mapTiles = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  };

  const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

  // --- IMAGENES DE LOGOS OFICIALES (PROVISTAS POR EL USUARIO) ---
  const brandLogos = {
    fortress: "Imagenes y logos/fortresslogosinfondo.png",
    krafit: "Imagenes y logos/krafitlogo.png",
    valhalla: "Imagenes y logos/valhallasinfondo.png",
    wasabi: "Imagenes y logos/wasabisinfondo.png",
    polponero: "Imagenes y logos/polponerosinfondo.png"
  };

  // --- 1. INICIALIZAR EL MAPA ---
  function initMap() {
    // Centrar en Santa Fe Capital, Argentina
    const santaFeCoords = [-31.633, -60.70];
    map = L.map("map", {
      zoomControl: false, // Ocultar control por defecto
      minZoom: 9,
      maxZoom: 18
    }).setView(santaFeCoords, 13);

    // Cargar capa del mapa base
    tileLayer = L.tileLayer(mapTiles[currentTheme], {
      attribution: mapAttribution
    }).addTo(map);

    // Renderizar Pines Iniciales
    renderMarkers();

    // Ocultar la cajonera (timeline-bar) al abrir popups para evitar sobreposición en pantalla
    map.on("popupopen", (e) => {
      const bar = document.getElementById("timeline-bar");
      if (bar) bar.classList.add("hidden");

      // Vincular eventos de "Leer más / Leer menos" directamente al contenedor del popup abierto
      // Esto evita que Leaflet intercepte y detenga la propagación del click al document
      const popupNode = e.popup.getElement();
      if (popupNode) {
        popupNode.addEventListener("click", (evt) => {
          if (evt.target && evt.target.classList.contains("read-more-btn")) {
            evt.preventDefault();
            evt.stopPropagation();
            
            const btn = evt.target;
            const sedeId = parseInt(btn.getAttribute("data-sede-id"), 10);
            const sede = fortressSedes.find(s => s.id === sedeId);
            if (!sede) return;

            const descContainer = btn.parentElement;
            const isExpanded = descContainer.classList.contains("expanded");
            
            if (isExpanded) {
              descContainer.innerHTML = truncateText(sede.description, 80) + ` <span class="read-more-btn" data-sede-id="${sede.id}">Leer más</span>`;
              descContainer.classList.remove("expanded");
            } else {
              descContainer.innerHTML = sede.description + ` <span class="read-more-btn" data-sede-id="${sede.id}">Leer menos</span>`;
              descContainer.classList.add("expanded");
            }
            
            // Forzar actualización física del popup abierto en Leaflet
            e.popup.update();
          }
        });
      }
    });
    map.on("popupclose", () => {
      const bar = document.getElementById("timeline-bar");
      if (bar) bar.classList.remove("hidden");
    });

    // Cerrar el popup automáticamente si el usuario se aleja (minimiza) del mapa (zoom < 14)
    map.on("zoomend", () => {
      if (map.getZoom() < 14) {
        map.closePopup();
      }
    });

    // Desvanecer Pantalla de Carga (Splash Screen) al cargar
    setTimeout(() => {
      const splash = document.getElementById("splash-screen");
      if (splash) {
        splash.classList.add("fade-out");
        // Iniciar animación de contadores
        animateStatsCounters();
      }
    }, 1500);
  }

  // --- 2. RENDERIZAR MARCADORES (PINES VECTORIALES) ---
  function renderMarkers() {
    // Limpiar marcadores existentes del mapa
    activeMarkers.forEach(m => map.removeLayer(m.leafletMarker));
    activeMarkers = [];

    fortressSedes.forEach(sede => {
      // Aplicar filtro de marca
      const isValhalla = sede.brand === "valhalla";
      const isGastro = sede.brand === "wasabi" || sede.brand === "polponero";
      
      let matchesFilter = false;
      if (currentFilter === "all") matchesFilter = true;
      else if (currentFilter === "fortress" && sede.brand === "fortress") matchesFilter = true;
      else if (currentFilter === "krafit" && sede.brand === "krafit") matchesFilter = true;
      else if (currentFilter === "valhalla" && isValhalla) matchesFilter = true;
      else if (currentFilter === "gastro" && isGastro) matchesFilter = true;

      // Aplicar filtro de texto
      let matchesSearch = true;
      if (searchText !== "") {
        const text = searchText.toLowerCase();
        const inName = sede.name.toLowerCase().includes(text);
        const inAddr = sede.address.toLowerCase().includes(text);
        const inDesc = sede.description.toLowerCase().includes(text);
        const inServices = sede.services.some(s => s.toLowerCase().includes(text));
        matchesSearch = inName || inAddr || inDesc || inServices;
      }

      if (matchesFilter && matchesSearch) {
        // Renderizar el Rayo SVG para Fortress (legible y naranja-rojo) o PNG para otras marcas
        let logoContent = "";
        if (sede.brand === "fortress") {
          logoContent = `<svg viewBox="0 0 100 100" class="pin-logo-svg" style="width:20px; height:20px; color:#EA531D; fill:currentColor; display:block;"><path d="M38 18 L68 18 L50 48 L70 48 L32 82 L42 53 L28 53 Z" /></svg>`;
        } else {
          logoContent = `<img src="${brandLogos[sede.brand]}" alt="${sede.brand}" class="pin-logo-img">`;
        }

        // Crear elemento HTML personalizado para el pin con el logo PNG oficial provisto
        const pinHtml = `
          <div class="custom-marker-pin marker-${sede.brand}">
            <div class="pin-ring-glow"></div>
            <div class="pin-main">
              ${logoContent}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: pinHtml,
          className: "custom-leaflet-icon",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
          popupAnchor: [0, -18]
        });

        // Crear popup estilizado (Airbnb Style)
        const popupContent = createPopupCard(sede);

        const marker = L.marker(sede.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(popupContent);

        // Centrar y hacer zoom automáticamente (flyTo animado con offset) al hacer clic en un marcador
        marker.on("click", () => {
          flyToWithOffset(sede.coords, 15, {
            animate: true,
            duration: 1.2
          });
        });

        activeMarkers.push({
          id: sede.id,
          data: sede,
          leafletMarker: marker
        });
      }
    });
  }

  // --- 3. DISEÑO DEL POPUP (ESTILO AIRBNB / SIN EMOJIS) ---
  function createPopupCard(sede) {
    const isSpecial = sede.stats.especial ? true : false;
    const servicesHtml = sede.services.slice(0, 4).map(s => `<span class="popup-service-tag">${s}</span>`).join("");
    
    // Configuración de botones de acción
    let actionsHtml = "";
    const mapsLink = sede.googleMaps || `https://www.google.com/maps/dir/?api=1&destination=${sede.coords[0]},${sede.coords[1]}`;
    
    if (sede.whatsapp) {
      actionsHtml += `
        <a href="${sede.whatsapp}" target="_blank" class="popup-btn secondary">WhatsApp</a>
      `;
    } else if (sede.instagram) {
      actionsHtml += `
        <a href="${sede.instagram}" target="_blank" class="popup-btn secondary">Instagram</a>
      `;
    }

    actionsHtml += `
      <a href="${mapsLink}" target="_blank" class="popup-btn primary">Cómo Llegar</a>
    `;

    // Rayo SVG para Fortress (legible y naranja-rojo) o PNG para otras marcas en el Popup Badge
    let popupLogoContent = "";
    if (sede.brand === "fortress") {
      popupLogoContent = `<svg viewBox="0 0 100 100" class="popup-badge-logo-svg" style="width:20px; height:20px; color:#EA531D; fill:currentColor; display:block;"><path d="M38 18 L68 18 L50 48 L70 48 L32 82 L42 53 L28 53 Z" /></svg>`;
    } else {
      popupLogoContent = `<img src="${brandLogos[sede.brand]}" alt="${sede.brand}" class="popup-badge-logo-img">`;
    }

    const descText = sede.description;
    const needsTruncate = descText.length > 80;
    const displayDesc = needsTruncate ? truncateText(descText, 80) + ` <span class="read-more-btn" data-sede-id="${sede.id}">Leer más</span>` : descText;

    return `
      <div class="popup-card">
        <div class="popup-img-wrapper">
          <img src="${sede.image}" class="popup-img" alt="${sede.name}">
          <div class="popup-brand-badge ${sede.brand}">
            ${popupLogoContent}
            <span>${sede.brand.toUpperCase()}</span>
          </div>
        </div>
        <div class="popup-body">
          <div class="popup-title">${sede.name}</div>
          <div class="popup-address">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${sede.address}
          </div>
          <div class="popup-desc">${displayDesc}</div>
          
          ${isSpecial ? `
            <div class="popup-stats-grid">
              <div class="popup-stat-item">
                <span class="popup-stat-val">${sede.stats.socios}</span>
                <span class="popup-stat-lbl">Socios</span>
              </div>
              <div class="popup-stat-item">
                <span class="popup-stat-val">${sede.stats.superficie}</span>
                <span class="popup-stat-lbl">Espacio</span>
              </div>
            </div>
          ` : ""}

          <div class="popup-services">
            ${servicesHtml}
          </div>

          <div class="popup-schedule">
            <strong>Horarios:</strong><br>${sede.schedule}
          </div>

          <div class="popup-actions">
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // --- 4. ALTERNAR MODO CLARO / OSCURO (MAPA BASE Y UI) ---
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      if (currentTheme === "dark") {
        currentTheme = "light";
        document.body.classList.add("light-theme");
        themeBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        currentTheme = "dark";
        document.body.classList.remove("light-theme");
        themeBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
      
      // Actualizar tiles de Leaflet con una transición suave
      tileLayer.setUrl(mapTiles[currentTheme]);
    });
  }

  // --- 5. LOGICA DE FILTROS POR MARCA ---
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const isAlreadyActive = pill.classList.contains("active");
      
      // Quitar clase active de todos los pills
      filterPills.forEach(p => p.classList.remove("active"));
      
      if (isAlreadyActive) {
        currentFilter = "all";
      } else {
        pill.classList.add("active");
        currentFilter = pill.getAttribute("data-brand");
      }
      renderMarkers();
    });
  });

  // --- 6. LOGICA DE BUSCADOR ---
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchText = e.target.value.trim();
      if (searchText.length > 0) {
        clearSearchBtn.style.display = "flex";
      } else {
        clearSearchBtn.style.display = "none";
      }
      renderMarkers();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchText = "";
      clearSearchBtn.style.display = "none";
      renderMarkers();
    });
  }

  // --- 7. PANEL DEL ECOSISTEMA COMPLETO ---
  const toggleEcosistemaBtn = document.getElementById("toggle-ecosistema-btn");
  const closeEcosistemaBtn = document.getElementById("close-ecosistema-btn");
  const ecosistemaPanel = document.getElementById("ecosistema-panel");

  if (toggleEcosistemaBtn && ecosistemaPanel) {
    toggleEcosistemaBtn.addEventListener("click", () => {
      ecosistemaPanel.classList.toggle("open");
    });
  }

  if (closeEcosistemaBtn && ecosistemaPanel) {
    closeEcosistemaBtn.addEventListener("click", () => {
      ecosistemaPanel.classList.remove("open");
    });
  }

  // Llenar panel de ecosistema dinámicamente
  function populateEcosistema() {
    const fitnessGrid = document.getElementById("eco-fitness-grid");
    const gastroGrid = document.getElementById("eco-gastro-grid");
    const serviciosGrid = document.getElementById("eco-servicios-grid");

    if (!fitnessGrid || !gastroGrid || !serviciosGrid) return;

    fitnessGrid.innerHTML = "";
    gastroGrid.innerHTML = "";
    serviciosGrid.innerHTML = "";

    // Sedes Fitness & CrossFit
    fortressSedes.forEach(sede => {
      const isGastro = sede.brand === "wasabi" || sede.brand === "polponero";
      
      let ecoLogoContent = "";
      if (sede.brand === "fortress") {
        ecoLogoContent = `<svg viewBox="0 0 100 100" class="eco-brand-logo-svg" style="width:20px; height:20px; color:#EA531D; fill:currentColor; display:block;"><path d="M38 18 L68 18 L50 48 L70 48 L32 82 L42 53 L28 53 Z" /></svg>`;
      } else {
        ecoLogoContent = `<img src="${brandLogos[sede.brand]}" alt="${sede.brand}" class="eco-brand-logo-img">`;
      }

      if (!isGastro) {
        const card = document.createElement("div");
        card.className = `eco-card eco-${sede.brand}`;
        card.innerHTML = `
          <div class="eco-card-header">
            <div class="eco-icon-wrapper">
              ${ecoLogoContent}
            </div>
            <div>
              <div class="eco-card-title">${sede.name}</div>
              <div class="eco-card-tag">${sede.address}</div>
            </div>
          </div>
        `;
        
        card.addEventListener("click", () => {
          ecosistemaPanel.classList.remove("open");
          focusOnSede(sede);
        });
        
        fitnessGrid.appendChild(card);
      } else {
        // Gastronómicos mapeados
        const card = document.createElement("div");
        card.className = `eco-card eco-${sede.brand}`;
        card.innerHTML = `
          <div class="eco-card-header">
            <div class="eco-icon-wrapper">
              ${ecoLogoContent}
            </div>
            <div>
              <div class="eco-card-title">${sede.name}</div>
              <div class="eco-card-tag">${sede.address}</div>
            </div>
          </div>
        `;
        
        card.addEventListener("click", () => {
          ecosistemaPanel.classList.remove("open");
          focusOnSede(sede);
        });
        
        gastroGrid.appendChild(card);
      }
    });

    // Marcas Especiales del Ecosistema (No Mapeables directamente)
    ecosistemaEspecial.forEach(serv => {
      const card = document.createElement("div");
      card.className = "eco-card eco-servicios-style";
      
      const link = serv.web ? serv.web : `https://instagram.com/${serv.instagram}`;
      
      card.innerHTML = `
        <div class="eco-card-header">
          <div class="eco-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
          <div>
            <div class="eco-card-title">${serv.name}</div>
            <div class="eco-card-tag">${serv.category} · ${serv.details}</div>
          </div>
        </div>
      `;
      
      card.addEventListener("click", () => {
        window.open(link, "_blank");
      });
      
      serviciosGrid.appendChild(card);
    });
  }

  // Enfocar sede en el mapa
  function focusOnSede(sede) {
    // Si no está visible en el filtro actual, cambiar filtro a 'todos'
    if (currentFilter !== "all") {
      const isValhalla = sede.brand === "valhalla";
      const isGastro = sede.brand === "wasabi" || sede.brand === "polponero";
      
      let isVisible = false;
      if (currentFilter === "fortress" && sede.brand === "fortress") isVisible = true;
      if (currentFilter === "krafit" && sede.brand === "krafit") isVisible = true;
      if (currentFilter === "valhalla" && isValhalla) isVisible = true;
      if (currentFilter === "gastro" && isGastro) isVisible = true;

      if (!isVisible) {
        currentFilter = "all";
        filterPills.forEach(p => p.classList.remove("active"));
        renderMarkers();
      }
    }

    flyToWithOffset(sede.coords, 16, {
      animate: true,
      duration: 1.5
    });

    // Encontrar el marcador correspondiente y abrir popup
    setTimeout(() => {
      const activeMark = activeMarkers.find(m => m.id === sede.id);
      if (activeMark) {
        activeMark.leafletMarker.openPopup();
      }
    }, 1500);
  }

  // --- 8. PANEL DE NOTIFICACIONES E AVISOS ---
  const notificationsToggleBtn = document.getElementById("notifications-toggle-btn");
  const closeNotificationsBtn = document.getElementById("close-notifications-btn");
  const notificationsPanel = document.getElementById("notifications-panel");
  const notiBadge = document.getElementById("noti-badge");

  if (notificationsToggleBtn && notificationsPanel) {
    notificationsToggleBtn.addEventListener("click", () => {
      notificationsPanel.classList.toggle("open");
      // Ocultar badge de leídos
      if (notiBadge) notiBadge.style.display = "none";
    });
  }

  if (closeNotificationsBtn && notificationsPanel) {
    closeNotificationsBtn.addEventListener("click", () => {
      notificationsPanel.classList.remove("open");
    });
  }

  function populateNotifications() {
    const listContainer = document.getElementById("notifications-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    fortressAnuncios.forEach(anuncio => {
      const card = document.createElement("div");
      card.className = "notification-card";
      
      let actionBtnHtml = "";
      if (anuncio.link) {
        actionBtnHtml = `<a href="${anuncio.link}" target="_blank" class="noti-action-btn">${anuncio.action}</a>`;
      } else if (anuncio.coords) {
        actionBtnHtml = `<button class="noti-action-btn locate-noti-btn" data-coords='${JSON.stringify(anuncio.coords)}'>${anuncio.action}</button>`;
      }

      card.innerHTML = `
        <div class="noti-header">
          <span class="noti-badge badge-${anuncio.type}">${anuncio.type}</span>
          <div class="noti-title">${anuncio.title}</div>
        </div>
        <div class="noti-desc">${anuncio.desc}</div>
        ${actionBtnHtml}
      `;

      // Evento para localizar si el aviso tiene coordenadas
      const locateBtn = card.querySelector(".locate-noti-btn");
      if (locateBtn) {
        locateBtn.addEventListener("click", () => {
          notificationsPanel.classList.remove("open");
          flyToWithOffset(anuncio.coords, 15, { animate: true, duration: 1.2 });
          
          // Buscar si hay sede en esa coord para abrir popup
          setTimeout(() => {
            const nearestSede = fortressSedes.find(s => s.coords[0] === anuncio.coords[0] && s.coords[1] === anuncio.coords[1]);
            if (nearestSede) {
              focusOnSede(nearestSede);
            }
          }, 1200);
        });
      }

      listContainer.appendChild(card);
    });
  }

  // --- 9. GEOLOCALIZACIÓN ("SEDE MÁS CERCANA") ---
  const geoBtn = document.getElementById("geo-location-btn");
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        showToast("La geolocalización no está soportada por tu navegador.", "error");
        return;
      }

      // Animación de carga en botón
      geoBtn.classList.add("loading");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.latitude, position.coords.longitude];
          geoBtn.classList.remove("loading");

          // Encontrar la sede más cercana
          let closestSede = null;
          let minDistance = Infinity;

          fortressSedes.forEach(sede => {
            const dist = getDistance(userCoords, sede.coords);
            if (dist < minDistance) {
              minDistance = dist;
              closestSede = sede;
            }
          });

          if (closestSede) {
            geoBtn.classList.add("accent");

            // Volar directamente a la sede más cercana y mostrar su popup
            flyToWithOffset(closestSede.coords, 16, { animate: true, duration: 1.5 });
            
            setTimeout(() => {
              focusOnSede(closestSede);
              showToast(`¡Ubicación activada! Sede más cercana: ${closestSede.name}`, "success");
              
              // Apagar indicador visual del botón después de 6 segundos
              setTimeout(() => {
                geoBtn.classList.remove("accent");
              }, 6000);
            }, 1500);
          }
        },
        (error) => {
          geoBtn.classList.remove("loading");
          let errorMsg = "No pudimos obtener tu ubicación actual.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg += " El acceso fue denegado. Activa los permisos de GPS en tu navegador.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg += " Señal de GPS no disponible actualmente.";
          } else if (error.code === error.TIMEOUT) {
            errorMsg += " Se agotó el tiempo de espera. Inténtalo de nuevo.";
          }
          showToast(errorMsg, "error");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }

  // Distancia euclidiana simple para ordenamiento
  function getDistance(c1, c2) {
    const latDiff = c1[0] - c2[0];
    const lonDiff = c1[1] - c2[1];
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  }

  // --- 10. TIMELINE DE EXPANSIÓN Y CONTADORES ---
  const timelineBar = document.getElementById("timeline-bar");
  const timelineHandle = document.getElementById("timeline-toggle-handle-btn");

  if (timelineHandle && timelineBar) {
    timelineHandle.addEventListener("click", () => {
      timelineBar.classList.toggle("open");
    });
  }

  function populateTimeline() {
    const track = document.getElementById("timeline-track-content");
    if (!track) return;

    track.innerHTML = "";

    expansionTimeline.forEach(h => {
      const node = document.createElement("div");
      node.className = "timeline-node";
      node.innerHTML = `
        <div class="timeline-year">${h.year}</div>
        <div class="timeline-title">${h.title}</div>
        <div class="timeline-desc">${h.desc}</div>
      `;
      track.appendChild(node);
    });
  }

  // Animación interactiva de contadores
  function animateStatsCounters() {
    // Definición de valores finales
    const targets = {
      sedes: fortressSedes.length,
      socios: 4000,
      ciudades: 4 // Santa Fe, Santo Tomé, Colastiné, Paraná
    };

    animateSingleCounter("stat-sedes", 0, targets.sedes, 1500, "");
    animateSingleCounter("stat-socios", 0, targets.socios, 2000, "+");
    animateSingleCounter("stat-ciudades", 0, targets.ciudades, 1500, "");
  }

  function animateSingleCounter(elementId, start, end, duration, prefix = "") {
    const el = document.getElementById(elementId);
    if (!el) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = Math.floor(progress * (end - start) + start);
      
      // Formatear miles con punto
      const formatted = currentVal.toLocaleString("es-AR");
      el.innerText = prefix + formatted;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // --- AUXILIARES POPUPS Y POSICIONAMIENTO ---
  function flyToWithOffset(coords, zoom, options) {
    const isMobile = window.innerWidth <= 768;
    let offset = 0;
    
    if (isMobile) {
      if (zoom === 15) {
        offset = 0.0035; // Desplazar al norte en zoom 15 en móvil
      } else if (zoom === 16) {
        offset = 0.0018; // Desplazar al norte en zoom 16 en móvil
      } else {
        offset = 0.0025 / Math.pow(2, zoom - 15);
      }
    } else {
      if (zoom === 15) {
        offset = 0.0012;
      } else if (zoom === 16) {
        offset = 0.0006;
      }
    }
    
    const targetCoords = [coords[0] + offset, coords[1]];
    map.flyTo(targetCoords, zoom, options);
  }

  function truncateText(text, limit) {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  }

  function showToast(message, type = "info") {
    // Eliminar toast anterior si existe
    const existing = document.querySelector(".custom-toast");
    if (existing) existing.remove();
    
    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    
    let icon = "⚡";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";
    
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Forzar reflow y animar entrada
    setTimeout(() => toast.classList.add("show"), 50);
    
    // Auto-remover en 4.5 segundos
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }



  // --- INICIALIZACIÓN ---
  initMap();
  populateEcosistema();
  populateNotifications();
  populateTimeline();
});

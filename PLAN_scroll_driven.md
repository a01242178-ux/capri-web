# Plan: Capri Web — Completar Sistema Scroll-Driven GSAP

**Fecha:** 2026-04-24  
**Estado:** Listo para ejecutar por fases

---

## Phase 0: Discovery (COMPLETADO en esta sesión)

### Findings — Estado actual

| Componente | GSAP | Animaciones actuales |
|------------|------|----------------------|
| IntroVideo | ❌ | Vanilla JS scroll scrub — 3 bugs activos |
| Hero | ✅ | Parallax foto + char stagger + eyebrow/sub/CTA fade |
| Timeline | ❌ | Solo CSS `[data-reveal]` + Intersection Observer |
| ProductGrid | ✅ | Clip-path wipe reveal — **falta hover tilt** |
| BranchMap | ✅ | Cascade stagger ✅ |
| Historia | ✅ | Filter scrub neon + quote glow + stats cascade ✅ |
| Header | ❌ | Sin scroll behavior |
| Footer | ❌ | Sin animaciones (ok, baja prioridad) |

### GSAP Stack confirmado
- **Versión:** `gsap@3.15.0` (package.json:18)
- **Plugin:** `ScrollTrigger` registrado per-component (NO global en main.jsx)
- **Patrón:** `gsap.matchMedia()` + `mm.revert()` para a11y
- **Scroll container:** document/window scroll (nativo)

### APIs confirmadas (copiar de estos archivos)
- Stagger cascade → `BranchMap.jsx:35-47`
- Clip-path wipe → `ProductGrid.jsx:43-59`
- Filter scrub → `Historia.jsx:80-95`
- matchMedia + cleanup → cualquier componente existente, e.g. `Hero.jsx:27,81`

### Anti-patterns a evitar
- ❌ No registrar ScrollTrigger globalmente en main.jsx (cada componente lo hace solo)
- ❌ No mezclar `[data-reveal]` CSS con GSAP en el mismo elemento
- ❌ No usar `gsap.set()` fuera del contexto del `matchMedia` callback
- ❌ No olvidar `return () => mm.revert()` en el cleanup de useEffect

---

## Phase 1: Timeline — GSAP Scroll-Driven Node Reveal

**Objetivo:** Reemplazar el patrón `[data-reveal]` CSS por GSAP ScrollTrigger node-by-node.

### Archivos a modificar
- `capri-web/src/components/Timeline.jsx`
- `capri-web/src/styles/Timeline.css` (remover estilos de `[data-reveal]` si están ahí)

### Qué implementar

1. **Agregar imports GSAP** (copiar de BranchMap.jsx:2-7):
   ```js
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   gsap.registerPlugin(ScrollTrigger)
   ```

2. **matchMedia setup** (copiar de BranchMap.jsx:18):
   ```js
   const mm = gsap.matchMedia()
   mm.add('(prefers-reduced-motion: no-preference)', () => { ... })
   ```

3. **Node reveal stagger** — cada `.timeline__node` aparece de abajo cuando scroll llega:
   - Targets: `.timeline__node` (9 nodos — Timeline.jsx:51)
   - From: `{ opacity: 0, y: 48 }`
   - Stagger: `60ms` (más lento que BranchMap porque hay video de fondo)
   - Trigger: el `.timeline__track` al 75% del viewport
   - Scrub: `false` — solo trigger on enter (no scrub, los nodos son texto)

4. **Remover** atributos `data-reveal` y `data-delay` de los nodos del JSX

5. **Estado inicial** con `gsap.set('.timeline__node', { opacity: 0, y: 48 })` ANTES del trigger

### Verificación Phase 1
- [ ] `grep -n 'data-reveal' Timeline.jsx` → cero resultados
- [ ] Abrir localhost:5173, scrollear hasta Timeline — nodos aparecen en cascada
- [ ] Probar con `prefers-reduced-motion: reduce` — nodos visibles inmediatamente

---

## Phase 2: ProductGrid — Hover Tilt 3D

**Objetivo:** Cards de producto tienen efecto de tilt 3D al hover (sin librería externa).

### Archivos a modificar
- `capri-web/src/components/ProductGrid.jsx`
- `capri-web/src/styles/ProductGrid.css`

### Qué implementar

1. **Efecto CSS base** — cada `.product-card` tiene `transform-style: preserve-3d` y `perspective: 600px` en el contenedor padre.

2. **Event handlers** en cada card (vanilla JS, NO GSAP para esto):
   ```js
   const handleMouseMove = (e, card) => {
     const rect = card.getBoundingClientRect()
     const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 to 0.5
     const y = (e.clientY - rect.top)  / rect.height - 0.5
     gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, duration: 0.3, ease: 'power2.out' })
   }
   const handleMouseLeave = (card) => {
     gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' })
   }
   ```

3. **Añadir** `onMouseMove` y `onMouseLeave` al `<div className="product-card">` en JSX

4. **Solo desktop** — `matchMedia('(hover: hover)')` antes de attachar los handlers

### Verificación Phase 2
- [ ] Hover sobre cualquier card en desktop — tilt suave
- [ ] Mouse leave → card vuelve a plano con ease
- [ ] Mobile: sin efecto (hover: none)

---

## Phase 3: IntroVideo — 3 Bug Fixes

**Objetivo:** Corregir los 3 problemas activos del IntroVideo.

### Archivos a modificar
- `capri-web/src/components/IntroVideo.jsx`
- `capri-web/src/styles/IntroVideo.css` (o globals si el video sizing está ahí)

### Bug 1: Lag en scroll scrubbing
**Root cause:** `video.currentTime` se setea en cada evento `scroll` — demasiada frecuencia.  
**Fix:**
```js
// En el scroll handler, solo seek si el delta es significativo
const newTime = p * video.duration
if (Math.abs(video.currentTime - newTime) > 0.05) {
  video.currentTime = newTime
}
```
**Alternativa:** usar `requestVideoFrameCallback` si el browser lo soporta.

### Bug 2: El mono de Capri se corta
**Root cause:** `object-position` del video no centrado en la parte superior.  
**Fix:** En IntroVideo.css, buscar el `<video>` y añadir:
```css
object-position: center 15%;
```
(Probar valores: `center top`, `center 15%`, `center 20%` — el que no corta al personaje)

### Bug 3: Espacio blanco alrededor del video
**Root cause:** Contenedor del intro video no ocupa 100vw/100vh.  
**Fix:** Verificar que el `.intro-video__sticky` y el video tag tengan:
```css
width: 100%;
height: 100%;
/* o bien */
width: 100vw;
height: 100vh;
margin: 0;
padding: 0;
overflow: hidden;
```

### Verificación Phase 3
- [ ] Scroll en IntroVideo — sin lag/stuttering visible
- [ ] El personaje Capri (mono) se ve completo
- [ ] Sin espacio blanco en bordes del video

---

## Phase 4: Header — Scroll Compact Behavior

**Objetivo:** Header se vuelve más compacto y opaco al scrollear (UX estándar).

### Archivos a modificar
- `capri-web/src/components/Header.jsx`
- `capri-web/src/styles/Header.css`

### Qué implementar

1. **GSAP ScrollTrigger** para añadir clase `.header--scrolled` cuando scroll > 80px:
   ```js
   ScrollTrigger.create({
     start: 'top -80px',
     end: 99999,
     toggleClass: { className: 'header--scrolled', targets: '.header' }
   })
   ```

2. **CSS para `.header--scrolled`**:
   ```css
   .header--scrolled {
     background: rgba(10, 5, 2, 0.95);
     backdrop-filter: blur(12px);
     padding-block: 0.5rem; /* más compacto */
     box-shadow: 0 2px 20px rgba(0,0,0,0.4);
   }
   ```

3. **Transición suave:**
   ```css
   .header {
     transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
   }
   ```

### Verificación Phase 4
- [ ] Scrollear 80px desde el top → header se vuelve oscuro y compacto
- [ ] Volver al top → header vuelve a estado original
- [ ] Sin flash/jump en el layout

---

## Phase 5: Historia Stats — Count-Up Animation

**Objetivo:** Los números de estadísticas en Historia cuentan de 0 al valor final cuando scroll llega.

### Archivos a modificar
- `capri-web/src/components/Historia.jsx`

### Qué implementar

Buscar los elementos `.historia__stat` (ya tienen cascade reveal en Historia.jsx:142-153).  
Añadir counter animation DESPUÉS del reveal:

```js
// Para cada stat que tenga un número
gsap.from(statValueEl, {
  textContent: 0,
  duration: 1.5,
  ease: 'power2.out',
  snap: { textContent: 1 },
  scrollTrigger: {
    trigger: statValueEl,
    start: 'top 85%',
    once: true,
  }
})
```

**Nota:** `snap: { textContent: 1 }` redondea a enteros durante la animación.

### Verificación Phase 5
- [ ] Scrollear hasta Historia stats — números cuentan de 0 al valor
- [ ] Solo se ejecuta una vez (once: true)
- [ ] Sin conflicto con el cascade reveal existente

---

## Phase 6 (Final): Verification Run

1. `npm run dev` en capri-web → abrir localhost:5173
2. Test scroll completo de arriba a abajo:
   - IntroVideo → sin lag, sin corte, sin espacio blanco
   - Hero → parallax + char stagger
   - Timeline → cascade node reveal
   - ProductGrid → wipe reveal + hover tilt
   - BranchMap → cascade
   - Historia → chapter reveals + neon scrub + stats count-up
   - Header → compact on scroll
3. Test mobile (DevTools mobile view): verificar que hover effects no aplican
4. `grep -rn 'data-reveal' src/components/Timeline.jsx` → 0 results
5. Build check: `npm run build` — sin errores

---

## Orden de ejecución recomendado

1. **Phase 3 primero** (IntroVideo bugs) — afecta la experiencia de entrada, impacto alto
2. **Phase 1** (Timeline GSAP) — el gap más grande visualmente
3. **Phase 4** (Header) — rápido, mejora UX inmediatamente
4. **Phase 2** (ProductGrid hover tilt) — delighter de detalle
5. **Phase 5** (Stats count-up) — polish final
6. **Phase 6** (Verification)

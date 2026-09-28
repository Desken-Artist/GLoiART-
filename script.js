function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function artworkCard(art) {
  const message = `Hello Ken, I'm interested in the original artwork "${art.title}". Please give me more information.`;
  return `
    <article class="art-card">
      <a href="artwork.html?id=${art.id}" class="art-image-wrap">
        <img src="${art.image}" alt="${art.title}" loading="lazy"
             onerror="this.parentElement.classList.add('placeholder'); this.style.display='none';">
        <span class="image-placeholder">Artwork image<br>to be added</span>
      </a>
      <div class="art-card-body">
        <div class="meta"><span>${art.year}</span><span>${art.status}</span></div>
        <h3>${art.title}</h3>
        <p>${art.medium}</p>
        <div class="card-actions">
          <a href="artwork.html?id=${art.id}">View artwork →</a>
          <a class="whatsapp-small" target="_blank" rel="noopener" href="${whatsappLink(message)}">WhatsApp</a>
        </div>
      </div>
    </article>`;
}

function renderHome() {
  const grid = document.getElementById("artwork-grid");
  if (grid) grid.innerHTML = artworks.map(artworkCard).join("");
}

function renderArtworkPage() {
  const container = document.getElementById("artwork-page");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const art = artworks.find(a => a.id === params.get("id"));

  if (!art) {
    container.innerHTML = `<section class="section"><h1>Artwork not found.</h1><a class="button" href="index.html#artworks">Back to artworks</a></section>`;
    return;
  }

  document.title = `${art.title} — Ken`;

  const originalMessage = `Hello Ken, I'm interested in the original artwork "${art.title}". Please tell me about availability and purchase details.`;

  const printsHTML = art.prints.map(print => {
    const printMessage = `Hello Ken, I'm interested in the print "${print.name}" of "${art.title}". Please tell me about availability and purchase details.`;
    return `
      <article class="print-card">
        <div class="print-image-wrap">
          <img src="${print.image}" alt="${print.name}" loading="lazy"
               onerror="this.parentElement.classList.add('placeholder'); this.style.display='none';">
          <span class="image-placeholder">Print preview<br>to be added</span>
        </div>
        <div class="print-info">
          <span class="print-size">${print.size}</span>
          <h3>${print.name}</h3>
          <strong>${print.price}</strong>
          <a class="button button-dark" target="_blank" rel="noopener" href="${whatsappLink(printMessage)}">Ask about this print</a>
        </div>
      </article>`;
  }).join("");

  container.innerHTML = `
    <section class="art-detail section">
      <a class="back-link" href="index.html#artworks">← Back to artworks</a>
      <div class="detail-grid">
        <div class="detail-main-image">
          <img src="${art.image}" alt="${art.title}"
               onerror="this.parentElement.classList.add('placeholder'); this.style.display='none';">
          <span class="image-placeholder">Artwork image<br>to be added</span>
        </div>
        <div class="detail-info">
          <p class="eyebrow">${art.category} · ${art.year}</p>
          <h1>${art.title}</h1>
          <p class="lead">${art.description}</p>
          <dl>
            <div><dt>Medium</dt><dd>${art.medium}</dd></div>
            <div><dt>Dimensions</dt><dd>${art.dimensions}</dd></div>
            <div><dt>Original</dt><dd>${art.price}</dd></div>
            <div><dt>Status</dt><dd>${art.status}</dd></div>
          </dl>
          <a class="button whatsapp-button" target="_blank" rel="noopener" href="${whatsappLink(originalMessage)}">Ask about the original on WhatsApp</a>
        </div>
      </div>
    </section>

    <section class="process section">
      <div class="section-heading">
        <p class="eyebrow">THE PROCESS</p>
        <h2>Watch it come to life.</h2>
      </div>
      <div class="video-box">
        <video controls preload="metadata" poster="${art.image}">
          <source src="${art.video}" type="video/mp4">
          Your browser does not support video playback.
        </video>
        <p class="video-note">Replace the video file in <code>assets/videos/</code> with your process video.</p>
      </div>
    </section>

    <section class="prints section">
      <div class="section-heading">
        <p class="eyebrow">AVAILABLE PRINTS</p>
        <h2>Own a print of this artwork.</h2>
        <p>The original is one piece. Prints make the artwork available in different sizes.</p>
      </div>
      <div class="prints-grid">${printsHTML}</div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderArtworkPage();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  if (toggle) toggle.addEventListener("click", () => nav.classList.toggle("open"));
});
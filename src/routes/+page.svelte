<script>
  import { weeks, vimeoEmbedUrl, vimeoThumbnailUrl } from '$lib/videos.js';

  let { data } = $props();
  let isPaid = $derived(data.isPaid);

  let activeVideo = $state(null); // { id, hash, title } — currently playing

  function play(video) {
    activeVideo = video;
  }

  function closePlayer() {
    activeVideo = null;
  }

  // Close on backdrop click
  function onBackdropClick(e) {
    if (e.target === e.currentTarget) closePlayer();
  }
</script>

<svelte:head>
  <title>Mapping & Protomaps — Video Course</title>
  <meta name="description" content="Learn to build beautiful interactive maps with Protomaps. 19 videos across 4 weeks." />
</svelte:head>

<!-- Video lightbox -->
{#if activeVideo}
  <div class="lightbox" onclick={onBackdropClick} onkeydown={(e) => e.key === 'Escape' && closePlayer()} role="dialog" aria-modal="true" tabindex="-1">
    <div class="lightbox-inner">
      <button class="close-btn" onclick={closePlayer} aria-label="Close video">✕</button>
      <div class="embed-wrap">
        <iframe
          src={vimeoEmbedUrl(activeVideo)}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title={activeVideo.title}
        ></iframe>
      </div>
      <p class="lightbox-title">{activeVideo.title}</p>
    </div>
  </div>
{/if}

<div class="page">
  <!-- Header -->
  <header class="header">
    <div class="container">
      <h1 class="site-title">Mapping &amp; Protomaps</h1>
      <p class="site-subtitle">A hands-on video course — 19 lessons across 4 weeks</p>

      {#if isPaid}
        <div class="paid-badge">✓ Full access unlocked</div>
      {:else}
        <div class="cta-bar">
          <a href="/api/checkout" class="btn-unlock">Unlock All Videos — $20</a>
          <span class="or-link">or <a href="/access">already paid?</a></span>
        </div>
      {/if}
    </div>
  </header>

  <!-- Intro -->
  <section class="intro container">
    <p>
      This course covers everything you need to build interactive, publication-ready maps —
      from basic setup to custom Protomaps basemaps, vector data overlays, and deployment.
      Whether you're a journalist, researcher, or developer, you'll finish with a working
      toolkit and a project you're proud of.
    </p>
    <p>
      <a href="https://docs.google.com/document/d/1qxJxRgUNmNYR8QtnkbCXXVeBAGfV7rJsoQ8WK2Lbe7s/edit" target="_blank" rel="noopener">
        Read the full course introduction →
      </a>
    </p>

    {#if isPaid}
      <div class="paid-extras">
        <a href="https://docs.google.com/document/d/1LXeTE-j988wlSNlTjxxU3YhodMR9RDOBNrolYQKYjX8/edit" target="_blank" rel="noopener" class="extra-link">
          📄 Course Preparation Guide
        </a>
        <a href="https://github.com/jkeefe/protomaps-workshop" target="_blank" rel="noopener" class="extra-link">
          💻 GitHub Repository
        </a>
      </div>
    {/if}
  </section>

  <!-- Video weeks -->
  {#each weeks as week}
    <section class="week container">
      <h2 class="week-title">{week.title}</h2>
      <div class="video-grid">
        {#each week.videos as video, i}
          {#if video.free || isPaid}
            <!-- Playable video -->
            <button class="video-card playable" onclick={() => play(video)}>
              <div class="thumbnail">
                <img
                  src={vimeoThumbnailUrl(video)}
                  alt={video.title}
                  loading="lazy"
                  onerror={(e) => e.currentTarget.style.display='none'}
                />
                <div class="play-icon">▶</div>
                {#if video.free}
                  <span class="free-badge">Free</span>
                {/if}
              </div>
              <div class="card-info">
                <span class="video-num">{i + 1}</span>
                <span class="video-title">{video.title}</span>
              </div>
            </button>
          {:else}
            <!-- Locked video -->
            <div class="video-card locked">
              <div class="thumbnail locked-thumb">
                <img
                  src={vimeoThumbnailUrl(video)}
                  alt=""
                  loading="lazy"
                  onerror={(e) => e.currentTarget.style.display='none'}
                />
                <div class="lock-overlay">
                  <span class="lock-icon">🔒</span>
                </div>
              </div>
              <div class="card-info">
                <span class="video-num">{i + 1}</span>
                <span class="video-title">{video.title}</span>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </section>
  {/each}

  <!-- Bottom CTA -->
  {#if !isPaid}
    <div class="bottom-cta container">
      <p>Ready to unlock all 15 remaining videos?</p>
      <a href="/api/checkout" class="btn-unlock">Get Full Access — $20 one-time</a>
      <p class="access-link">Already paid? <a href="/access">Get a new access link</a></p>
    </div>
  {/if}

  <footer class="footer container">
    <p>Questions? Email <a href="mailto:john.keefe@gmail.com">john.keefe@gmail.com</a></p>
  </footer>
</div>

<style>
  .page {
    max-width: 100%;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0f1117 0%, #1a1f2e 100%);
    border-bottom: 1px solid #2d3147;
    padding: 48px 0 36px;
    text-align: center;
  }

  .site-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: #f0f4ff;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }

  .site-subtitle {
    font-size: 1.05rem;
    color: #8b93b0;
    margin-bottom: 28px;
  }

  .paid-badge {
    display: inline-block;
    background: #14532d;
    color: #86efac;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .cta-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-unlock {
    background: #2563eb;
    color: white;
    padding: 12px 28px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s;
  }

  .btn-unlock:hover {
    background: #1d4ed8;
    color: white;
  }

  .or-link {
    color: #8b93b0;
    font-size: 0.9rem;
  }

  /* Intro */
  .intro {
    padding: 36px 20px;
    border-bottom: 1px solid #1e2235;
  }

  .intro p {
    color: #c0c8e0;
    line-height: 1.7;
    margin-bottom: 12px;
    max-width: 720px;
  }

  .paid-extras {
    margin-top: 20px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .extra-link {
    background: #1e2235;
    color: #93c5fd;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.9rem;
    border: 1px solid #2d3455;
    transition: background 0.2s;
  }

  .extra-link:hover {
    background: #252d47;
    color: #bfdbfe;
  }

  /* Week sections */
  .week {
    padding: 40px 20px;
    border-bottom: 1px solid #1e2235;
  }

  .week-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 20px;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }

  /* Video cards */
  .video-card {
    border-radius: 8px;
    overflow: hidden;
    background: #1a1f2e;
    border: 1px solid #2d3147;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: transform 0.15s, border-color 0.15s;
  }

  .video-card.playable:hover {
    transform: translateY(-2px);
    border-color: #3d5080;
  }

  .video-card.locked {
    cursor: default;
    opacity: 0.6;
  }

  .thumbnail {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #0d1020;
    overflow: hidden;
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    background: rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .video-card.playable:hover .play-icon {
    opacity: 1;
  }

  .free-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background: #16a34a;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .locked-thumb img {
    filter: blur(4px) brightness(0.4);
  }

  .lock-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }

  .card-info {
    padding: 10px 12px;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .video-num {
    color: #4b5580;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  .video-title {
    color: #c8d0e8;
    font-size: 0.85rem;
    line-height: 1.3;
  }

  /* Bottom CTA */
  .bottom-cta {
    padding: 60px 20px;
    text-align: center;
  }

  .bottom-cta p {
    color: #8b93b0;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .access-link {
    margin-top: 16px;
    font-size: 0.9rem;
  }

  /* Footer */
  .footer {
    padding: 32px 20px;
    text-align: center;
    border-top: 1px solid #1e2235;
  }

  .footer p {
    color: #4b5580;
    font-size: 0.85rem;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;
  }

  .lightbox-inner {
    width: 100%;
    max-width: 880px;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 4px 8px;
  }

  .close-btn:hover {
    color: white;
  }

  .embed-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    background: black;
    border-radius: 8px;
    overflow: hidden;
  }

  .embed-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .lightbox-title {
    margin-top: 12px;
    color: #94a3b8;
    font-size: 0.95rem;
    text-align: center;
  }
</style>

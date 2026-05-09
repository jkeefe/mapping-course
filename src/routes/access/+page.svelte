<script>
  let email = $state('');
  let status = $state('idle'); // 'idle' | 'sending' | 'sent' | 'error' | 'not-found'
  let errorMsg = $state('');

  async function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    status = 'sending';
    try {
      const res = await fetch('/api/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        status = 'sent';
      } else if (res.status === 404) {
        status = 'not-found';
      } else {
        status = 'error';
        errorMsg = data.error || 'Something went wrong.';
      }
    } catch {
      status = 'error';
      errorMsg = 'Network error — please try again.';
    }
  }
</script>

<svelte:head>
  <title>Get Access Link — Mapping & Protomaps</title>
</svelte:head>

<div class="page">
  <div class="card">
    <a href="/" class="back">← Back to course</a>
    <h1>Already paid?</h1>
    <p>Enter your email address and we'll send you a new magic link to access the full course.</p>

    {#if status === 'sent'}
      <div class="success">
        <p>✓ Check your inbox! A new access link has been sent to <strong>{email}</strong>.</p>
        <p>The link will log you in automatically — no password needed.</p>
      </div>
    {:else if status === 'not-found'}
      <div class="warning">
        <p>We don't have a purchase on file for that email address.</p>
        <p>
          Want to get full access?
          <a href="/api/checkout">Unlock all videos for $20</a>
        </p>
      </div>
    {:else}
      <form onsubmit={submit}>
        <label for="email">Email address</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="you@example.com"
          required
          disabled={status === 'sending'}
        />
        {#if status === 'error'}
          <p class="error">{errorMsg}</p>
        {/if}
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send me a link'}
        </button>
      </form>
    {/if}
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .card {
    background: #1a1f2e;
    border: 1px solid #2d3147;
    border-radius: 12px;
    padding: 40px;
    max-width: 440px;
    width: 100%;
  }

  .back {
    display: inline-block;
    color: #8b93b0;
    font-size: 0.85rem;
    text-decoration: none;
    margin-bottom: 24px;
  }

  .back:hover {
    color: #c0c8e0;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #f0f4ff;
    margin-bottom: 10px;
  }

  p {
    color: #8b93b0;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  label {
    display: block;
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 6px;
  }

  input {
    width: 100%;
    background: #0f1117;
    border: 1px solid #2d3147;
    border-radius: 6px;
    color: #e8eaf0;
    padding: 10px 14px;
    font-size: 1rem;
    margin-bottom: 16px;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #2563eb;
  }

  button {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 11px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover:not(:disabled) {
    background: #1d4ed8;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success {
    background: #14532d;
    border: 1px solid #16a34a;
    border-radius: 8px;
    padding: 16px;
  }

  .success p {
    color: #86efac;
    margin-bottom: 8px;
  }

  .success p:last-child {
    margin-bottom: 0;
  }

  .warning {
    background: #451a03;
    border: 1px solid #92400e;
    border-radius: 8px;
    padding: 16px;
  }

  .warning p {
    color: #fcd34d;
    margin-bottom: 8px;
  }

  .warning p:last-child {
    margin-bottom: 0;
  }

  .error {
    color: #f87171;
    font-size: 0.85rem;
    margin-top: -8px;
    margin-bottom: 12px;
  }
</style>

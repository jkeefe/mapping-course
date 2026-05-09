<script>
  let { children, data } = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</svelte:head>

{@render children()}

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0f1117;
    color: #e8eaf0;
    min-height: 100vh;
  }

  :global(a) {
    color: #60a5fa;
  }

  :global(a:hover) {
    color: #93c5fd;
  }
</style>

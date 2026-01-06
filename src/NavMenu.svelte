<script>
  import { Menu, X } from "lucide-svelte";

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<div class="nav-wrapper">
  <!-- Hamburger Button -->
  <button
    on:click={toggleMenu}
    class="focus:outline-none transition-opacity bg-transparent"
    aria-label="Toggle navigation menu"
  >
    {#if isOpen}
      <X class="w-8 h-8" />
    {:else}
      <Menu class="w-8 h-8" />
    {/if}
  </button>

  <!-- Navigation Menu -->
  {#if isOpen}
    <div class="absolute left-0 mt-2 w-48 bg-white rounded-lg nav-menu">
      <a
        href="/"
        on:click={closeMenu}
        class="nav-link block px-4 py-2 text-gray-800 rounded-t-lg"
      >
        Home
      </a>
      <a
        href="/travel"
        on:click={closeMenu}
        class="nav-link block px-4 py-2 text-gray-800 rounded-b-lg"
      >
        Travel
      </a>
      <a
        href="/reception"
        on:click={closeMenu}
        class="nav-link block px-4 py-2 text-gray-800 rounded-b-lg"
      >
        Event details
      </a>
    </div>
  {/if}
</div>

<style>
  .nav-wrapper {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 50;
  }

  @media (min-width: 769px) {
    .nav-wrapper {
      position: fixed;
    }
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    -webkit-tap-highlight-color: transparent;
  }

  :global(.nav-menu) {
    background-color: rgba(255, 255, 255, 0.95);
  }

  :global(.nav-link) {
    text-decoration: none;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  :global(.nav-link:hover),
  :global(.nav-link:active),
  :global(.nav-link:focus) {
    background-color: #f3f4f6;
    color: #064e3b;
  }

  @media (hover: none) {
    :global(.nav-link:active) {
      background-color: #f3f4f6;
      color: #064e3b;
    }
  }
</style>

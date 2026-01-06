<!-- TimelineCarousel.svelte -->
<script>
  import { fade } from 'svelte/transition';

  let currentPhotoIndex = 0;
  const photo_directory = '../../photos/';
  const years = ["zelda", "zelda", "zelda", "zelda", "zelda", "zelda", "zelda", "zelda"];
  const locations = [
        'Jersey City, NJ', 
        'Jersey City, NJ', 
        'Jersey City, NJ',
        'Jersey City, NJ', 
        'Jersey City, NJ',
        'Jersey City, NJ',
        'Jersey City, NJ', 
        'Jersey City, NJ'];

  // Touch handling variables
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // Minimum distance for a swipe to register

  function previousPhoto() {
    currentPhotoIndex = currentPhotoIndex === 0 ? years.length - 1 : currentPhotoIndex - 1;
  }

  function nextPhoto() {
    currentPhotoIndex = currentPhotoIndex === years.length - 1 ? 0 : currentPhotoIndex + 1;
  }

  function setPhoto(index) {
    currentPhotoIndex = index;
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) >= minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right - show previous photo
        previousPhoto();
      } else {
        // Swiped left - show next photo
        nextPhoto();
      }
    }
    
    // Reset touch coordinates
    touchStartX = 0;
    touchEndX = 0;
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Parkinsans:wght@300..800&family=Prata&display=swap" rel="stylesheet">
</svelte:head>

<section class="timeline" id="timeline">
  <h2>Over the years</h2>
  <div class="carousel-container">
    <h3 class="year-header">{years[currentPhotoIndex]}</h3>
    
    <div class="carousel">
      <button class="nav-button prev" on:click={previousPhoto} aria-label="previous photo">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path 
            d="M15 4l-8 8 8 8" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </button>
      
      <div 
        class="image-wrapper"
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
      >
        {#key currentPhotoIndex}
          <img 
            transition:fade={{ duration: 300 }}
            class="carousel-img" 
            src={`${photo_directory}/${years[currentPhotoIndex]}.webp`} 
            alt={`Zelda in ${years[currentPhotoIndex]}`} 
            draggable="false"
          />
          <div class="location-label">
            <span>{locations[currentPhotoIndex]}</span>
          </div>
        {/key}
      </div>
      
      <button class="nav-button next" on:click={nextPhoto} aria-label="next photo">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path 
            d="M9 4l8 8-8 8" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    
    <div class="dots">
      {#each years as year, i}
        <button 
          class="dot {i === currentPhotoIndex ? 'active' : ''}"
          on:click={() => setPhoto(i)}
          aria-label={`View photo from ${year}`}>
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 0.8rem;
    color: #656565;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .carousel-container {
    max-width: 600px;
    margin: 0 auto;
    /* padding: 0 1rem; */
  }

  .year-header {
    font-family: "Instrument Serif", serif;
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 300;
    color: #064e3b;
    text-align: center;
  }

  .carousel {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 15px;
    overflow: hidden;
    touch-action: pan-y pinch-zoom;
  }

  .carousel-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.6);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    color: #064e3b;
    padding: 0;
    z-index: 10;
  }

  .nav-button:hover {
    background: rgba(255, 255, 255, 1);
  }

  .prev {
    left: 8px;
  }

  .next {
    right: 8px;
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 1rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffffff;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .dot.active {
    background: #064e3b;
  }

  .location-label {
    font-family: "Inter", sans-serif;
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #000000;
  }

  @media (max-width: 768px) {
    .carousel-container {
      padding: 0 0.5rem;
    }

    .nav-button {
      width: 30px;
      height: 30px;
    }

    .nav-button svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    .year-header {
      font-size: 2.5rem;
    }

    .nav-button {
      width: 25px;
      height: 25px;
    }

    .nav-button svg {
      width: 18px;
      height: 18px;
    }
  }
</style>
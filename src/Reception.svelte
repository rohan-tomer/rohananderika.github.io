<script>
  import NavMenu from "./NavMenu.svelte";

  const schedule = [
    {
      time: "10:30 am",
      title: "Guests arrive",
    },
    {
      time: "11:00 am",
      title: "Ceremony",
    },
    {
      time: "11:30 am",
      title: "Cocktail hour",
    },
    {
      time: "12:15 pm",
      title: "Lunch",
    },
    {
      time: "1:15 pm",
      title: "First dance",
    },
    {
      time: "3:30 pm",
      title: "Reception Ends",
    },
  ];
  export let url;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Freehand&family=Mr+De+Haviland&family=Playwrite+DE+LA:wght@100..400&family=Qwitcher+Grypen:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Freehand&family=Instrument+Serif:ital@0;1&family=Mr+De+Haviland&family=Playwrite+DE+LA:wght@100..400&family=Qwitcher+Grypen:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Parkinsans:wght@300..800&family=Prata&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<nav>
  <NavMenu />
</nav>

<div class="container">
  <section class="hero" style="margin-top: 3vh;">
    <h2>Event Details</h2>
    <div class="divider"></div>

    <!-- <section id="welcome-dinner" style="margin-bottom: 3vh;">
      <h2 class="category-title">Welcome Dinner</h2>
      <div class="options-container">
        <div class="content-box">
          <p class="section-body">
            Join us for a casual welcome dinner at our apartment rooftop on Friday, May 16th at 6:00 PM. This gathering is completely optional. If you're planning to attend, please let us know by April 30th so we can plan accordingly.
          </p>
        </div>
      </div>
    </section> -->

    <section id="schedule" style="margin-bottom: 3vh;">
      <h2 class="category-title">Schedule</h2>

      <div class="icon-container" style="padding-top: 5px">
        <img class="icon-img" src="../../photos/zelda.webp" alt="cheers" />
      </div>

      <div class="options-container">
        <div class="content-box">
          <table class="section-body" >
            <tbody>
              {#each schedule as event}
                <tr>
                  <td class="option-title">{event.time}</td>
                  <td class="event-desc" style="text-align: left">{event.title}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="accommodations">
      <h2 class="category-title">Dress Code</h2>
      <div class="icon-container" style="padding-top: 5px">
        <img class="icon-img" src="../../photos/zelda.webp" alt="attire" />
      </div>
      <div class="options-container">
        <div class="content-box">
          <h3 class="option-title">Semi-Formal or Cocktail Attire</h3>
          <p class="section-body">
            Please dress your best while still being comfortable. A nice dress,
            dress shirt with slacks, or a suit would be perfect.
          </p>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <footer>
      <p>Rohan & Erika</p>
    </footer>
  </section>
</div>

<style>
  .category-title {
    font-size: 2.4rem;
  }

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .content-box {
    border-radius: 15px;
    padding: 1.5rem;
    width: 100%;
  }

  .section-body {
    width: 100%;
  }

  .option-title {
    font-family: "Instrument Serif", serif;
    font-size: 1.6rem;
    color: #064e3b;
    margin-bottom: 0.5rem;
  }

  .icon-img {
    width: 50px;
    height: auto;
  }



  @media (max-width: 768px) {
    .content-box {
      padding: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .option-title {
      font-size: 1.6rem;
      padding-right: 7px;
    }

    .event-desc {
      font-size: 1.1rem;
    }
  }
</style>

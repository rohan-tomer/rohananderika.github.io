<script>
  import NavMenu from "./NavMenu.svelte";
  import Map from "./Map.svelte";

  export let url;
  export let mapCenter = [40.71955, -74.03457];
  export let locations = [
    {
      name: "Lokal",
      position: { lat: 40.721420119776965, lng: -74.03182290243282 },
      address: "2 2nd St, Jersey City, NJ 07302",
      type: "Event Location",
      website: "https://www.lokaljc.com/",
      directions: "https://maps.app.goo.gl/55LbBkdN6UeFn5Rj6",
    },
    {
      name: "Hyatt House",
      position: { lat: 40.71583685852385, lng: -74.03399793367495 },
      address: "1 Exchange Pl, Jersey City, NJ 07302",
      type: "Hotel",
      website:
        "https://www.hyatt.com/hyatt-house/en-US/lgaxj-hyatt-house-jersey-city",
      directions: "https://maps.app.goo.gl/S6MXfEk55ZKiUgUT8",
    },
    {
      name: "Hyatt Regency",
      position: { lat: 40.71714945640742, lng: -74.03212542597716 },
      address: "2 Exchange Pl, Jersey City, NJ 07302",
      type: "Hotel",
      website:
        "https://www.hyatt.com/hyatt-regency/en-US/newjp-hyatt-regency-jersey-city-on-the-hudson",
      directions: "https://maps.app.goo.gl/nkMrt6q8Fi63WaFg7",
    },
    {
      name: "Residence Inn",
      position: { lat: 40.719090967206405, lng: -74.04095757705882 },
      address: "80 Christopher Columbus Dr, Jersey City, NJ 07302",
      type: "Hotel",
      website:
        "https://www.marriott.com/en-us/hotels/ewrjr-residence-inn-jersey-city/overview/",
      directions: "https://maps.app.goo.gl/SPqmpXB8N8qHfp7K9",
    },
    {
      name: "Canopy by Hilton",
      position: { lat: 40.71986256773888, lng: -74.0408217237937 },
      address: "159 Morgan St, Jersey City, NJ 07302",
      type: "Hotel",
      website:
        "https://www.hilton.com/en/hotels/ewradpy-canopy-jersey-city-arts-district/",
      directions: "",
    },
    {
      name: "DoubleTree by Hilton",
      position: { lat: 40.72370298796872, lng: -74.03665104792512 },
      address: "455 Washington Blvd, Jersey City, NJ 07310",
      type: "Hotel",
      website:
        "https://www.hilton.com/en/hotels/ewrwtdt-doubletree-hotel-and-suites-jersey-city/",
      directions: "",
    },
  ];
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
    <h2>Travel Information</h2>
    <div class="divider"></div>

    <section>
      <p class="section-body">
        We are grateful that you are taking the time and effort to celebrate
        with us. We have put together some information to help you plan your
        trip. If you have any questions, please don't hesitate to reach out to
        us.
      </p>

      <img class="map" src="../../photos/zelda.webp" alt="venue" />
    </section>

    <section id="getting-there" style="margin-bottom: 3vh;">
      <h2 class="category-title">Getting There</h2>
      <div class="icon-container" style="padding-top: 10px">
        <img class="icon-img" src="../../photos/zelda.webp" alt="cheers" />
      </div>
      <div class="options-container">
        <div class="content-box">
          <h3 class="option-title">Flying In</h3>
          <p class="section-body thin">
            Our venue is easily accessible from three major New York City
            airports: Newark Liberty International (EWR), LaGuardia (LGA), and
            John F. Kennedy International (JFK).
          </p>
          <br />
          <p class="section-body thin">
            Newark will be the most convenient to access Jersey City and the
            venue. If you want to stay in New York City, you may want to
            consider Laguardia or JFK.
          </p>
        </div>
        <div class="content-box">
          <h3 class="option-title">From New York City</h3>
          <p class="section-body thin">
            If you are staying in New York City, the venue is just minutes from
            Manhattan. For the most convenient route, we recommend taking the
            PATH train from the World Trade Center station - it's a quick
            one-stop ride to Exchange Place. You can use the same MetroCard you
            use for the MTA subway.
          </p>
        </div>
      </div>
    </section>

    <!-- <div class="divider" style="margin: 40px auto"></div> -->

    <section id="accommodations">
      <h2 class="category-title">Where to Stay</h2>
      <div class="icon-container" style="padding: 8px">
        <img class="icon-img" src="../../photos/zelda.webp" alt="cheers" />
      </div>
      <p class="section-body" style="margin-bottom: 1.5rem; max-width: 600px;">
        These hotels are in short walking distance from the wedding venue and
        are good options for your stay.
      </p>
      <p class="section-body" style="margin-bottom: 1.5rem; max-width: 600px;">
        We're working to reserve group rate rooms. If you have specific
        questions, please reach out to us.
      </p>
      <div class="options-container">
        {#each locations as hotel}
          {#if hotel.type === "Hotel"}
            <div class="content-box">
              <div class="icon-container">
                <!-- <MapPin class="icon" /> -->
              </div>
              <h3 class="option-title">{hotel.name}</h3>
              <p class="detail">{hotel.address}</p>
              <p style="padding-top: 10px">
                <a class="detail" href={hotel.website}>Hotel Website</a>
              </p>
            </div>
          {/if}
        {/each}
      </div>
    </section>
  </section>

  <Map center={mapCenter} zoom={15} markers={locations} />

  <div class="divider"></div>

  <footer>
    <p>Rohan & Erika</p>
  </footer>
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

  .icon-img {
    width: 50px;
    height: auto;
  }

  .section-body {
    width: 100%;
  }

  .option-title {
    font-family: "Instrument Serif", serif;
    font-size: 1.6rem;
    color: #064e3b;
    margin-bottom: 3px;
  }

  .icon-img {
    width: 50px;
    height: auto;
  }

  .map {
    width: 500px;
    height: auto;
    mix-blend-mode: multiply;
    display: inline-grid;
    /* filter: grayscale(100%); */
    /* filter: brightness(1.1); */
    border: 1px solid #064e3b;
    margin: 20px 0 10px 0;
    align-items: center;
    justify-self: center;
  }

  @media (max-width: 768px) {
    .content-box {
      padding: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .option-title {
      font-size: 1.6rem;
    }
  }
</style>

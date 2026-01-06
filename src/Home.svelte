<script>
    import { Calendar, Gift } from "lucide-svelte";
    import RSVPForm from "./RSVPForm.svelte";
    import TimelineCarousel from "./TimelineCarousel.svelte";

    import NavMenu from "./NavMenu.svelte";
    export let url;
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
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
    <section class="hero" id="home">
        <img
            class="duck"
            src="../../photos/zelda.webp"
            alt="duck"
            loading="eager"
        />
        <div class="divider"></div>
        <p class="title">Rohan & Erika</p>
        <img
            class="header-img"
            src="../../photos/zelda.webp"
            alt="Rohan & Erika"
        />
        <p class="body">We are so excited to celebrate our marriage with you</p>
    </section>

    <div class="icon-container">
        <img id="rings-icon" src="../../photos/zelda.webp" alt="rings" />
    </div>

    <div class="divider" style="margin-bottom: 24px"></div>
    <div class="info-leadin">WHEN</div>

    <div class="info">Saturday, May 17, 2025
        <div class="info-detail">
            <p>
                <a href="/reception"
                    >Event Details</a
                >
            </p>
        </div>
    </div>


    <div class="info-leadin">WHERE</div>
    
    <div class="info">
        Lokal Eatery & Bar
        <div class="info-detail">
            <p>
                <a href="https://maps.app.goo.gl/7yDwKgTijkzighe46"
                    >2 2nd St, Jersey City, NJ 07302</a
                >
            </p>
        </div>
    </div>

    <div class="divider"></div>

    <img
        class="header-img second-header-img"
        src="../../photos/zelda.webp"
        alt="Rohan & Erika"
    />

    <section class="rsvp" id="rsvp">
        <h2>RSVP</h2>
        <div class="content-box">
            <div class="icon-container">
                <img class="icon" src="../../photos/zelda.webp" alt="rsvp" />
            </div>
            <p class="section-body">RSVP has closed! Thank you!</p>
            <!-- <RSVPForm /> -->
        </div>
    </section>

    <section class="carousel" id="timeline">
        <TimelineCarousel />
    </section>

    <section class="registry" id="registry">
        <h2>Registry</h2>
        <div class="content-box">
            <div class="icon-container">
                <img class="icon" src="../../photos/zelda.webp" alt="gift" />
            </div>
            <p class="section-body">
                We are very fortunate to have the things we need and will not be
                registering for physical gifts.<br />
                <br />
                If you feel inclined to gift us something, we would be grateful for
                your contribution to our honeymoon!
            </p>
            <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                class="registry-button">Link to registry</a
            >
        </div>
    </section>

    <div class="divider"></div>

    <footer>
        <p>Rohan & Erika</p>
    </footer>
</div>

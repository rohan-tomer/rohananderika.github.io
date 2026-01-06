<script>
    const API_ENDPOINT = import.meta.env.PROD // DISABLED
        ? ""
        : "";

    let email = "";
    let name = "";
    let loading = false;
    let error = "";
    let success = false;

    async function handleSubmit(event) {
        event.preventDefault();
        loading = true;
        error = "";
        success = false;

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    // DISABLED
                    apiKey: "",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            if (data.success) {
                success = true;
                email = "";
                name = "";
            } else {
                error = data.data.message || "Something went wrong";
            }
        } catch (err) {
            error = "Failed to send RSVP. Please try again.";
            console.error("RSVP Error:", err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="w-full mx-auto p-6 rounded-lg form-container">
    {#if success}
        <div class="mb-4 p-4 bg-green-100 text-green-700 rounded">
            RSVP invitation sent successfully!
        </div>
    {/if}

    {#if error}
        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
        </div>
    {/if}

    <form on:submit={handleSubmit} class="space-y-4 w-full">
        <div class="w-full space-y-4">
            <div class="input-section w-full">
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 input-label"
                    >Name</label
                >
                <input
                    type="text"
                    id="name"
                    bind:value={name}
                    required
                    class="block w-full rounded-md bg-transparent border-[#666] focus:border-gold-500 focus:ring-gold-500"
                    style="padding: 0.5rem 0.75rem; border-width: 0.5px;"
                    placeholder="Enter full name"
                />
            </div>

            <div class="input-section w-full">
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 input-label"
                    >Email</label
                >
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    class="block w-full rounded-md bg-transparent border-[#666] focus:border-gold-500 focus:ring-gold-500"
                    style="padding: 0.5rem 0.75rem; border-width: 0.5px;"
                    placeholder="Enter email"
                />
            </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-medium font-medium text-white bg-[#3e5744] hover:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50"
            style="margin-top: 34px;"
        >
            {#if loading}
                Sending...
            {:else}
                Receive link to the RSVP form
            {/if}
        </button>
    </form>
</div>

<style>
    .form-container {
        font-family: "Quicksand", sans-serif;
        font-size: 1rem;
        font-weight: 300;
        width: 100%;
    }
    .input-label {
        font-size: 16px;
        padding-bottom: 4px;
    }
    .input-section {
        padding-bottom: 10px;
    }
    input[type="text"],
    input[type="email"] {
        width: 100% !important;
    }
</style>
<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2>Kalender</h2>
        <div class="container m-4 card p-1">
            <div class="card-body">
                <h5 class="card-title">
                    Årets gang i bigården - udvintring af bierne
                    (pas på indnøgling af dronningen i det tidlige forår)
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">Torsdag d. 23 marts kl. 19:00</h6>
                <p class="card-text">
                    - ryd op i staderne og ny dækplast /rengjort dækplade, rense bunde nu eller senere.
                </p>
                <p class="card-text">
                    - evt. fodring så der er 8 – 10 kg. til forårsudviklingen – for meget foder i stadet kan også

                    forekomme?
                </p>
                <p class="card-text">
                    - døde familier </p>
                <p class="card-text">
                    - vildbyg oven på tavlerne / gitteret efter vinteren </p>
                <p class="card-text">
                    - placering af en bigård, flora, læ, antal stader </p>
                <p class="card-text">
                    - om farver på bistader </p>
                <p class="card-text">
                    - skadegørere i overvintringstiden og sæsonen </p>
            </div>
        </div>
        <div class="container m-4 card p-1" v-for="(item, index) in test" :key="index">
            <div class="card-body">
                <h5 class="card-title">
                    {{ item.title }}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ item.date }}</h6>
                <p class="card-text">
                    {{ item.description }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "calender-route",
        data() {
            return {
                test: [{
                    id: 1,
                    title: "Test test",
                    date: "Lørdag d. 17 juni kl. 8:30",
                    description: "En grævling har gnavet sig ind til vinterkosttiskud 2014 med varmt forår var hvepseår og flere familier i Sødnge bigård belv røvet ud.2015 med meget koldt og vådt forår og sommeren var bogstavelig talt uden hvepse.  Dronningen rystes / flyttes ned i nederste kasse og gitteret flyttes ned på denne kasse, som bliverdet nye vinterleje. Bierne bygger måske dronningeceller over gitteret og det forklares, hvorfor det ikke udløser en sværm, men at det kan medføre andre konsekvenser, hvis disse dronningecellerikke fjernes efter dag 5 til 8. "
                }]
            }
        }
    }
</script>
<style>

</style>
<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h1>Kursus i praktis biavl</h1>
        <div class="col-md-4 col-sm-6 d-flex flex-row justify-content-center">
            <NoteCard category="obs" title="Tilmelding" description="Man tilmelder sig kursus i praktisk biavl ved at indbetale kursusgebyr og evt. kontingent ved
            bankoverførsel, give besked til <br> <b>Vagn Brogaard brogaardvagn@hotmail.com / 29902037</b> <br> eller
            blot møde op til første kursusaften, hvis man er lidt i tvivl.">
            </NoteCard>
            <NoteCard category="obs" title="Betaling" description="Kursusstedet er foreningens skolebigård,
            Sdr. Højrupvejen 104A, Søllinge, 5750 Ringe
            (skolebigården ligger bag ved forsamlingshuset)
            <b>Pris 600 kr.</b> <br>
            Medlemskab af Ringe & Omegns Biavlerforening koster 120 kr.
            Foreningens bank: <br> reg. nr: 1551 - konto nr: 7034024.
            <b>Husk at skrive navn, mail adresse, telefon nr. og besked om, hvad der betales for. </b>">
            </NoteCard>
            <NoteCard category="obs" title="Husk" description="NB – 25 % af pesttilfældene i Danmark relaterer sig til skolebigårde,
            så det er nødvendigt, at du anskaffer <b>vaskbare gummihandsker</b>, som kun bruges i
            skolebigården.">
            </NoteCard>
        </div>
        <div class="card w-75">
            <div class="row">
                <div class="col-md-7 px-3 m-4">
                    <h4 class="card-title">Hvad kan du forvente?</h4>
                    <p class="card-text">Formålet med undervisningen er at få kendskab til biernes samfund og praktisk arbejde i bigården og derved blive i stand til at håndtere egne bifamilier på en rationel måde.</p>
                    <p class="card-text">Undervisningen er med udgangspunkt i materialet til begynderundervisning udgivet af Danmarks Biavlerforening kapitlerne 1 – 12 / disk 1 og 2, hvor året i bigården følges. Dette begynder- materiale følges der op på i undervisningen både teoretisk og praktisk med et righoldigt billedmateriale, eksempler og praktisk arbejde i foreningens skolebigård, hvor vi følger bigården fra udvintring til indvintring.
                    Undervisningsmaterialet fra Danmarks Biavlerforening baserer sig på biavl i opstablingsstader, fordi stadetypen er den mest fremherskende. Princippet i opstablingsdrift er enkelt og rationelt, men foretrækker man i egen biavl at bruge trugstader, tilpasser man nemt driftsformen /tankegangen til denne stadetype.
                    Det praktiske arbejde omfatter biavl både i opstablingsstader og i trugstader.</p>
                    <p class="card-text">Trugstadet er i dag næsten helt fortrængt af opstablingsstadet og er ikke længere i almindelig handel.</p>
                </div>
                <div class="col-md-4">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../assets/bee.png" class="d-block w-20 h-20" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/flyingBee.png" class="d-block w-20 h-20" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/header.jpg" class="d-block w-20 h-20" alt="...">
                        </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NoteCard from '@/components/NoteCard.vue';

export default {
    name: "course-route",
    components: {
        NoteCard
    }
}
</script>

<style scoped>
    span {
        background-color: #f3ac19;
        border-radius: 20%;
    }
    img {
        width: 100%;
        height: 350px;
    }
    .carousel-indicators {
        background-color: #f3ac19;
        border-radius: 50%;
        opacity: 0.5;
    }
    .card {
        font-size: 1em;
        padding: 5;
        border: none;
        border-radius: .28571429rem;
        box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
        margin-top: 20px;
    }
    
</style>
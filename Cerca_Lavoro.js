console.log(contenuti);

let numPreferiti=0, numOfferte=0;

let stellaPiena="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/260px-Red_star.svg.png";
let stellaVuota="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Stellone_d%27Italia.svg/1200px-Stellone_d%27Italia.svg.png";

let main= document.getElementById("main");
let bloccoPreferiti= document.getElementById("bloccoPreferiti");
let avviso = document.getElementById("avviso");

bloccoPreferiti.classList.add("hide");
avviso.classList.add("hide");

for(let i=0; i<contenuti.length; i++){
    let contenitore=document.createElement("div");
    let testo  = document.createElement("div")
    let titolo=document.createElement("h1");
    let link= document.createElement("a");
    let immagine=document.createElement("img");
    let descrizione=document.createElement("p");
    let mostra=document.createElement("button");
    let nascondi=document.createElement("button");
    let stella=document.createElement("img");

    contenitore.classList.add("offerta");
    testo.classList.add("testo");
    titolo.classList.add("titolo");
    descrizione.classList.add("corpo");
    mostra.classList.add("bottone");
    nascondi.classList.add("bottone");
    nascondi.classList.add("hide");
    immagine.classList.add("immagine");
    descrizione.classList.add("hide");
    stella.classList.add("stella");

    stella.src=stellaVuota;
    immagine.src=contenuti[i].immagine;
    titolo.textContent=contenuti[i].titolo;
    descrizione.textContent=contenuti[i].descrizione;
    link.href=contenuti[i].link;
    link.textContent="Link Offerta";
    mostra.textContent="Mostra Descrizione";
    nascondi.textContent="Nascondi Descrizione";

    mostra.addEventListener("click", mostraDescrizione);
    nascondi.addEventListener("click", nascondiDescrizione);
    stella.addEventListener("click", aggiungiPreferiti);

    testo.appendChild(link);
    testo.appendChild(titolo);
    testo.appendChild(descrizione);
    testo.appendChild(mostra);
    testo.appendChild(nascondi);
    contenitore.appendChild(immagine);
    contenitore.appendChild(testo);
    contenitore.appendChild(stella);

    main.appendChild(contenitore);
    numOfferte++;
}

function mostraDescrizione(event){
    console.log("Ho cliccato")
    console.log(event.currentTarget);
    let descrizione= event.currentTarget.parentNode.childNodes[2];
    let nascondi= event.currentTarget.parentNode.childNodes[4];
    console.log(descrizione)
    descrizione.classList.remove("hide");
    event.currentTarget.classList.add("hide");
    nascondi.classList.remove("hide");

}

function nascondiDescrizione(event){

    console.log("Ho cliccato")
    console.log(event.currentTarget);
    let descrizione= event.currentTarget.parentNode.childNodes[2];
    let mostra= event.currentTarget.parentNode.childNodes[3];
    console.log(descrizione)
    descrizione.classList.add("hide");
    event.currentTarget.classList.add("hide");
    mostra.classList.remove("hide");
}

function aggiungiPreferiti(event){
    let offerta = event.currentTarget.parentNode;

    let preferiti = document.getElementById("preferiti");

    preferiti.appendChild(offerta);
    let stella =     offerta.childNodes[2];
    stella.src=stellaPiena;

    stella.removeEventListener("click", aggiungiPreferiti);
    stella.addEventListener("click", rimuoviPreferiti);

    numPreferiti++;
    numOfferte--;

    console.log(numPreferiti)
    if(numPreferiti==1)
        bloccoPreferiti.classList.remove("hide");

    if(numOfferte==0)
        avviso.classList.remove("hide");

}

function rimuoviPreferiti(event){

    let offerta = event.currentTarget.parentNode;

    let offerte = document.getElementById("main");

    let preferiti = document.getElementById("preferiti");



    offerte.appendChild(offerta);

    let stella =     offerta.childNodes[2];
    stella.src=stellaVuota;

    stella.removeEventListener("click", rimuoviPreferiti);
    stella.addEventListener("click", aggiungiPreferiti);

    numOfferte++;
    numPreferiti--;

    if(numPreferiti==0)
        bloccoPreferiti.classList.add("hide");

    if(numOfferte==1)
        avviso.classList.add("hide");
}

function ricerca(){

    let numRisultati=0;

    let offerte = document.getElementById("main")
    let ricerca = document.getElementById("ricerca");

    let testoRicerca=ricerca.value;                     //Prendiamo la sottostringa che vogliamo cercare nel titolo delle offerte

    for(let i=3; i<offerte.childNodes.length; i++){
        let offerta=offerte.childNodes[i];              //A turno controlliamo tutte le offerte presenti nella sezione Offerte di lavoro
        console.log(offerta)
        
        let blocco=offerta.childNodes[1];               //Prendiamo la parte testuale dell'offerta
        let titolo= blocco.childNodes[1].textContent;   //Prendiamo il titolo dell'offerta
        
        //Trasformiamo entrambe le stringhe in minuscolo in maniera tale da non essere Case Sensitive
        titolo= titolo.toLowerCase();
        testoRicerca= testoRicerca.toLowerCase();

        let result=titolo.indexOf(testoRicerca);        //Ritorna la posizione della sottostringa cercata nel titolo (Se non è presente ritorna -1)

        if(result==-1){
            console.log("Esito negativo")
            offerta.classList.add("hide");
        }
        else{
            console.log("Esito positvo")
            offerta.classList.remove("hide");
            numRisultati++;
        }

        if(numRisultati==0)
            avviso.classList.remove("hide");
        else
            avviso.classList.add("hide");
    }
}
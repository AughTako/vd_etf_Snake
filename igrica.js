$(document).ready(function () {
    var hrana = 0;
    var zmija = 0;
    var zmijaPoz = []
    var velicinaTable = 0;
    var rezultat = 0;
    var superHrana = 0;
    var kretanje = 'desno';
    var gameover = false;
    var prethSH = 0;
    var velMape = parseInt(localStorage.getItem('velicinaMape'));
    var igraci = [];
    
    function generisiMapu(){
        for (let i = 0; i < parseInt(localStorage.getItem('velicinaMape')); i++) {
            let noviRed = $('<tr>');
            for (let j = 0; j < parseInt(localStorage.getItem('velicinaMape')); j++) {
                let novPodatak = $('<td></td>');
                novPodatak.attr('id', velicinaTable);
                velicinaTable++;
                noviRed.append(novPodatak);
            }
            $('#mapa').append(noviRed);
        }
        generisiHranuZmiju(velicinaTable);
    }
    function generisiHranuZmiju(velicinaTable){
        while(hrana == zmija || zmija % velMape == velMape-1 || zmija % velMape == 0){
            hrana = Math.floor(Math.random() * velicinaTable);
            zmija = Math.floor(Math.random() * velicinaTable);
        }
        $('#'+zmija).css('background-color', 'magenta');
        zmijaPoz.push(zmija);
        $('#'+hrana).css('background-color', 'darkcyan');
    }

    generisiMapu();

    $(document).keydown(function(event){
        var keycode = event.which || event.keyCode;
        if(keycode >= 37 && keycode <= 40)
            pozoviOdgStrelicu(keycode);
    });

    function pozoviOdgStrelicu(keycode) {
        switch(keycode){
            case 37:
                kretanje = 'levo';
                break;
            case 38:
                kretanje = 'gore';
                break;
            case 39:
                kretanje = 'desno';
                break;
            case 40:
                kretanje = 'dole';
                break;
        }
    }

    function kreciSe(){
        if(kretanje == 'desno')
            idiDesno();
        else if(kretanje == 'levo')
            idiLevo();
        else if(kretanje == 'dole')
            idiDole();
        else if(kretanje == 'gore')
            idiGore();
    }

    function generisiSuperHranu(){
        prethSH = superHrana;
        do {
            superHrana = Math.floor(Math.random() * velicinaTable);
        } while(zmijaPoz.includes(superHrana))
        $('#'+superHrana).css('background-color', 'red');

    }
    function unistiSuperHranu(){
        $('#'+prethSH).css('background-color', 'mediumpurple');
    }

    function generisiHranu() {
        $("#"+hrana).removeAttr('class', 'hrana');
        while(zmijaPoz.includes(hrana))
            hrana = Math.floor(Math.random() * velicinaTable);
        $('#'+hrana).css('background-color', 'darkcyan');
    }

    function proveriKoliziju(pPozicija) {
        if(zmija == hrana){
            zmijaPoz.unshift(pPozicija);
            updatePoz();
            generisiHranu();
            rezultat++;
            $('#trenutniRez').text(rezultat);
        }
        if(zmija == superHrana){
            zmijaPoz.unshift(pPozicija);
            updatePoz();
            generisiHranu();
            rezultat += 10;
            $('#trenutniRez').text(rezultat);
        }
    }
    function updatePoz(){
        zmijaPoz.forEach(element => {
            $('#'+element).attr('class', 'zmija');
            $('#'+element).css('background-color', 'magenta');
        });     
    }
    function idiGore(){

        let sledecaPoz = zmija - velMape;
        let prethodnaPoz = zmija;

        if(sledecaPoz < 0 || zmijaPoz.includes(sledecaPoz)){
            ukloniIntervale();
            dodajKorisnika(rezultat);
            return;
        }

        let rep = zmijaPoz.shift();
        zmijaPoz.push(sledecaPoz);
        $('#'+rep).removeAttr('class', 'zmija');
        $('#'+rep).css('background-color', 'mediumpurple');

        zmija = sledecaPoz;

        updatePoz();
        proveriKoliziju(prethodnaPoz)
    }
    function idiDole(){

        let sledecaPoz = zmija + velMape;
        let prethodnaPoz = zmija;

        if(sledecaPoz > Math.pow(velMape, 2) - 1 || zmijaPoz.includes(sledecaPoz)){
            ukloniIntervale();
            dodajKorisnika(rezultat);
            return;
        }

        let rep = zmijaPoz.shift();
        zmijaPoz.push(sledecaPoz);

        $('#'+rep).removeAttr('class', 'zmija');
        $('#'+rep).css('background-color', 'mediumpurple');
        $('#'+rep).text('');

        zmija = sledecaPoz;
        updatePoz();
        proveriKoliziju(prethodnaPoz);
    }

    function idiLevo(){


        let sledecaPoz = zmija - 1;
        let prethodnaPoz = zmija;

        if(zmija % velMape == 0 || zmijaPoz.includes(sledecaPoz)){
            ukloniIntervale();
            dodajKorisnika(rezultat);
            return;
        }
        
        let rep = zmijaPoz.shift();
        zmijaPoz.push(sledecaPoz);

        $('#'+rep).removeAttr('class', 'zmija');
        $('#'+rep).css('background-color', 'mediumpurple');
        $('#'+rep).text('');

        zmija = sledecaPoz;
        
        updatePoz();
        proveriKoliziju(prethodnaPoz);
    }

    function idiDesno(){

        let sledecaPoz = zmija + 1;
        let prethodnaPoz = zmija;

        if(zmija % velMape == velMape-1 || zmijaPoz.includes(sledecaPoz)){
            ukloniIntervale();
            dodajKorisnika(rezultat);
            return;
        }
        
        let rep = zmijaPoz.shift();
        zmijaPoz.push(sledecaPoz);

        $('#'+rep).removeAttr('class', 'zmija');
        $('#'+rep).css('background-color', 'mediumpurple');
        $('#'+rep).text('');

        zmija = sledecaPoz;

        updatePoz();
        proveriKoliziju(prethodnaPoz);
    }
    // ================================================================================================
    function ukloniIntervale(){
        clearInterval(inter);
        clearInterval(sh);
        clearInterval(ush);
    }
    function dodajKorisnika(poeni_){
        if(gameover)
            return;

        let ime_ = prompt("Gotova igra! Upisite svoje ime");
        igraci.push({
            ime: ime_,
            poeni: poeni_
        });
        localStorage.setItem('igraci', JSON.stringify(igraci));
        gameover = true;
        window.open('zmijica-rezultati.html');
    }

    function inicijalizujIgrace(){
        let igraci_ = localStorage.getItem("igraci")
        if(igraci_ != null){
            igraci = JSON.parse(igraci_)
        }
    }
    var sh = setInterval(generisiSuperHranu, 10000);
    var ush = setInterval(unistiSuperHranu, 20000);
    var inter = setInterval(kreciSe, 750/(parseInt(localStorage.getItem('tezinaIgre'))));
    inicijalizujIgrace();
});
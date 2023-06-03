$(document).ready(function() {
    var igraci = [];

    function dohvatiIgrace(){
        let igraci_ = localStorage.getItem("igraci")
        if( igraci_ != null){
            igraci = JSON.parse(igraci_)
        } else {
            localStorage.setItem("igraci", JSON.stringify(igraci));
        }
    }
    function komparator(a, b){
        return b.poeni-a.poeni;
    }

    function iscrtajNajbolje(){
        igraci.sort(komparator);
        if(igraci.length < 1)
            return;
        for(let i = 0; i < 5; i++){
            let noviRed = $('<tr>');
            for(let j = 0; j < 1; j++){
                ime = $('<td>'+igraci[i].ime+'</td>');
                poeni = $('<td>'+igraci[i].poeni+'</td>');
                noviRed.append(ime);
                noviRed.append(poeni);
            }
            $('#tabela').append(noviRed);
        }
    }
    dohvatiIgrace();

    iscrtajNajbolje();
});
$(document).ready(function () {
    $('#zapocniIgru').click(function () {
        let velicinaMape = $('input[name=izbor]:checked').val();
        let tezinaIgre = $('#sliderTezine').val();
        if(velicinaMape){
            localStorage.setItem('velicinaMape', velicinaMape);
            localStorage.setItem('tezinaIgre', tezinaIgre);
            //var localStorageData = JSON.stringify(localStorage);
            window.open('zmijica-igra.html');
        }
    });
    $('#rezultatiIgre').click(function () {
        window.open('zmijica-rezultati.html');
    });
});
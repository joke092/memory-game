(function() {
    var LICZBA_KAFELKOW = 20;
    var KAFELKI_NA_RZAD = 5;
    var kafelki = [];
    var pobraneKafelki = [];
    var liczbaRuchow = 0;
    var moznaBrac = true;
    var obrazkiKafelkow = [
        'title_1.png',
        'title_2.png',
        'title_3.png',
        'title_4.png',
        'title_5.png',
        'title_6.png',
        'title_7.png',
        'title_8.png',
        'title_9.png',
        'title_10.png'
    ]
})();

function startGame() {
...
...
}

var plansza = $('.plansza').empty();;

kafelki = [];
pobraneKafelki = [];
moznaBrac = true;
liczbaRuchow = 0;

for (var i=0; i<LICZBA_KAFELKOW; i++) {
    kafelki.push(Math.floor(i/2));
}

for (i=LICZBA_KAFELKOW-1; i>0; i--) {
    var swap = Math.floor(Math.random()*i);
    var tmp = kafelki[i];
    kafelki[i] = kafelki[swap];
    kafelki[swap] = tmp;
}

for (i=0; i<LICZBA_KAFELKOW; i++) {
    var tile = $('<div class="kafelek"></div>');
    plansza.append(tile);

    tile.data('cardType',kafelki[i]);
    tile.data('index', i);

    tile.css({
        left : 5+(tile.width()+5)*(i%KAFELKI_NA_RZAD)
    });
    tile.css({
        top : 5+(tile.height()+5)*(Math.floor(i/KAFELKI_NA_RZAD))
    });

    tile.bind('click',function() {
        klikniecieKafelka($(this))
    });
}

var $p = $('p');

$p.data('numer', 'Jestem ważną informacją' );

console.log( $p.data('numer') ); //wypisze "Jestem ważną informację"

function klikniecieKafelka(element) {

    //jeżeli jeszcze nie pobraliśmy 1 elementu
    //lub jeżeli index tego elementu nie istnieje w pobranych...
    if (!pobraneKafelki[0] || (pobraneKafelki[0].data('index') != element.data('index'))) {
        pobraneKafelki.push(element);
        element.css({'background-image' : 'url('+obrazkiKafelkow[element.data('cardType')]+')'})
    }

    if (pobraneKafelki.length == 2) {
        moznaBrac = false;
        if (pobraneKafelki[0].data('cardType')==pobraneKafelki[1].data('cardType')) {
            window.setTimeout(function() {
                usunKafelki();
            }, 500);
        } else {
            window.setTimeout(function() {
                zresetujKafelki();
            }, 500);
        }
        liczbaRuchow++;
    }

}
}
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
    var LICZBA_KAFELKOW = 20;
    var KAFELKI_NA_RZAD = 5;
    var kafelki = [];
    var pobraneKafelki = [];
    var moznaBrac = true;
    var liczbaRuchow = 0;
    var paryKafelkow = 0;
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
    ];

    function startGame() {
        kafelki = [];
        pobraneKafelki = [];
        moznaBrac = true;
        liczbaRuchow = 0;
        paryKafelkow = 0;

        var plansza = $('.plansza').empty();

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
            tile.bind('click',function() {klikniecieKafelka($(this))});
        }
        $('.moves').html(liczbaRuchow);
    }

    function klikniecieKafelka(element) {
        if (moznaBrac) {
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
                $('.moves').html(liczbaRuchow)
            }
        }
    }

    function usunKafelki() {
        pobraneKafelki[0].fadeOut(function() {
            $(this).remove();
        });
        pobraneKafelki[1].fadeOut(function() {
            $(this).remove();

            paryKafelkow++;
            if (paryKafelkow >= LICZBA_KAFELKOW / 2) {
                alert('gameOver!');
            }
            moznaBrac = true;
            pobraneKafelki = new Array();
        });
    }

    function zresetujKafelki() {
        pobraneKafelki[0].css({'background-image':'url(title.png)'})
        pobraneKafelki[1].css({'background-image':'url(title.png)'})
        pobraneKafelki = new Array();
        moznaBrac = true;
    }

    $(document).ready(function() {

        $('.start_game').click(function() {
            startGame();
        });

    })
})();

/***/ })
/******/ ]);
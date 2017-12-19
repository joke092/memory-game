(function() {
    var TILES_COUNT = 20; //5x4 stała określająca ilość kafelków na planszy.
    var tiles = []; //tablica z wygenerowanymi kafelkami
    var clickedTiles = []; //kliknięte kafelki (max 2 a potem czyscimy)
    var canGet = true; //czy aktualnie mozna klikac
    var movesCount = 0; //liczba ruchów gracza
    var tilesPair = 0; //sparowane kafelki. Maksymalnie 2x mniej niż TILES_COUNT
    var engineSrc = 'miniengine.php'; //sciezka do pliku engine dla highscore

    startGame = function() {
        tiles = [];
        clickedTiles = [];
        canGet = true;
        movesCount = 0;
        tilesPair = 0;

        let $gameBoard = $('#gameBoard').empty();

        for (let i=0; i<TILES_COUNT; i++) {
            tiles.push(Math.floor(i/2));
        }

        for (i=TILES_COUNT-1; i>0; i--) {
            let swap = Math.floor(Math.random()*i);
            let tmp = tiles[i];
            tiles[i] = tiles[swap];
            tiles[swap] = tmp;
        }

        for (i=0; i<TILES_COUNT; i++) {
            const $cell = $('<div class="cell"></div>');
            const $tile = $('<div class="tile"><span class="avers"></span><span class="revers"></span></div>');
            $tile.addClass('card-type-'+tiles[i]);
            $tile.data('cardType', tiles[i])
            $tile.data('index', i);

            $cell.append($tile);
            $gameBoard.append($cell);
        }
        $gameBoard.find('.cell .tile').on('click', function() {
            tileClicked($(this))
        });
    }

    showMoves = function(moves) {
        $('#gameMoves').html(moves);
    }

    tileClicked = function(element) {
        if (canGet) {
            //jeżeli jeszcze nie pobraliśmy 1 elementu
            //lub jeżeli index tego elementu nie istnieje w pobranych...
            if (!clickedTiles.length || (element.data('index') != clickedTiles[0].data('index'))) {
                clickedTiles.push(element);
                element.addClass('show');
            }

            if (clickedTiles.length >= 2) {
                canGet = false;

                if (clickedTiles[0].data('cardType') === clickedTiles[1].data('cardType')) {
                    setTimeout(function() {deleteTiles()}, 500);
                } else {
                    setTimeout(function() {resetTiles()}, 500);
                }

                movesCount++;
                showMoves(movesCount);
            }
        }
    }

    resetTiles = function() {
        clickedTiles[0].removeClass('show');
        clickedTiles[1].removeClass('show');
        clickedTiles = new Array();
        canGet = true;
    }

    gameOver = function() {
        saveHighScore();
    }

    deleteTiles = function() {
        clickedTiles[0].fadeOut(function() {
            $(this).remove();
        });
        clickedTiles[1].fadeOut(function() {
            $(this).remove();
        });

        tilesPair++;
        clickedTiles = new Array();
        canGet = true;
        if (tilesPair >= TILES_COUNT / 2) {
            gameOver();
        }
    }

    showLoading = function() {
        $('.loading').show();
    }

    hideLoading = function() {
        $('.loading').hide();
    }

    showPlayerName = function() {
        showStage('stagePlayerName');
        $('#checkName').on('click', function() {
            if ($('#playerName').val()!='') {
                $('.player-name-box').removeClass('error');
                startGame();
                showStage('stageGame');
            } else {
                $('.player-name-box').addClass('error');
                return false;
            }
        })
    }

    saveHighScore = function() {
        showLoading();
        const playerName = $('#playerName').val();
        $.ajax({
            url : engineSrc,
            type : 'POST',
            data : {
                action : 'save',
                player : playerName,
                moves : movesCount
            },
            success : function() {

            },
            error : function() {
                console.log('Wystąpił jakis błąd :(')
            },
            complete : function() {
                showHighScore();
                hideLoading();
            }
        })
    }

    showHighScore = function() {
        showLoading();
        $.ajax({
            url : engineSrc,
            type : 'POST',
            data : {
                action : 'read'
            },
            dataType : 'json',
            success : function(r) {
                $('#highscoreBoard').empty();
                for (x=0; x<r.length; x++) {
                    const record = r[x];
                    const $div = $('<div class="line"><strong class="player">'+record.player+' :</strong><span class="moves">'+record.moves+'</span></div>');
                    $('#highscoreBoard').append($div);
                }
            },
            error : function() {
                console.log('Wystąpił jakis błąd :(')
            },
            complete : function() {
                hideLoading();
                showStage('stageHighscore');
            }
        })

    }

    showStage = function(stage) {
        $('[class^=slide-]').removeClass('show');
        $('#'+stage).addClass('show');
    }


    bindEvents = function() {
        $('#startGame').on('click', function(e) {
            e.preventDefault();
            showPlayerName();
        });
        $('#showHighscore').on('click', function(e) {
            e.preventDefault();
            showHighScore();
        })
        $('.close-highscore').on('click', function(e) {
            e.preventDefault();
            showStage('stageStart');
        })
    }

    init = function() {
        $(function() {
            bindEvents();
        });
    }

    init();
})();

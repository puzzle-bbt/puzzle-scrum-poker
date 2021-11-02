var ws;
$.when( $.ready ).then(function() {
    $('.cardsFrontSide').css({display: "none"});
    $('.cardsBackSide').css({display: "flex"});
    $(".tablemasterPlayground").css({display: "none"});
    $(".playerPlayground").css({display: "none"});

    if (checkForTablemaster()) {
        initTablemaster();
        onboardingTablemaster();
    } else {
        initPlayer();
        onboardingPlayer();
    }
});
function checkForTablemaster() {
    var currentUrl = window.location.href;
    if (currentUrl.includes('table')) {
        return false;
    } else {
        return true;
    }
}
function initTablemaster() {
    $(".formPlayer").css({display: "none"});
    $(".formTablemaster").css({display: "block"});
}
function initPlayer() {
    $(".formPlayer").css({display: "block"});
    $(".formTablemaster").css({display: "none"});
}
function onboardingTablemaster() {
    $('#create').click(function () {
        let tableMasterName = $('#tableMasterName').val();
        let tablename = $('#tablename').val();
        if (tableMasterName.length === 0) {
            alert("You have to enter a tableMasterName");
            return;
        } else if (tableMasterName.length > 25) {
            alert("Your Tablemastername must be shorter");
            return;
        }
        if (tablename.length === 0) {
            alert("You have to enter a tablename");
            return;
        }
        $.ajax({
            url: "http://localhost:8080/createTablemaster/" + tableMasterName + "/" + tablename,
            type: 'GET',
            success: function(res) {
                let gamekeyplayerID = res.split(",");
                let gamekey = gamekeyplayerID[0];
                let playerID = gamekeyplayerID[1];
                onboardingTablemasterFinish(gamekey, playerID);
            }
        });
    });
}
function onboardingTablemasterFinish(gamekey, playerID, isNewTablemaster = false) {
    $(".formTablemaster").css({display: "none"});
    $(".tablemasterPlayground").css({display: "block"});
    connectWebsocket(gamekey, playerID);
    getAllPlayers(gamekey, playerID);
    initGameControl(gamekey, playerID);
    checkForStartSpectatorMode(gamekey, playerID);

    if (!isNewTablemaster) {
        $('#link').html(window.location.href + "?table=" + gamekey);
        cardListener(gamekey, playerID);
    } else {
        $(".playerPlayground").css({display: "none"});
        $('#link').html(window.location.href);
    }

    $(window).on('beforeunload', function() {
        var confirmWindow = confirm();
        if(confirmWindow){
            return true;
        }
        else {
            return false;
        }
    });
    window.addEventListener('unload', function(event) {
        callBackendForOffboarding(gamekey, playerID, true);
    });
}
function onboardingPlayer() {
    $('#confirm').click(function () {
        let username = $('#username').val();
        if (username.length === 0) {
            alert("You must enter a username");
            return;
        } else if (username.length > 25) {
            alert("Your username must be shorter");
            return;
        }
        var currentUrl = window.location.href;
        let gamekey = currentUrl.split('table=').pop();
        $.ajax({
            url: "http://localhost:8080/createPlayer/" + username + "/" + gamekey,
            type: 'GET',
            success: function(res) {
                let playerID = res;
                onboardingPlayerFinish(gamekey, playerID);
            }
        });
    });
}
function onboardingPlayerFinish(gamekey, playerID) {
    $(".formPlayer").css({display: "none"});
    $(".playerPlayground").css({display: "block"});
    connectWebsocket(gamekey, playerID);
    getAllPlayers(gamekey, playerID);
    checkForStartSpectatorMode(gamekey, playerID);
    cardListener(gamekey, playerID);
    window.addEventListener('unload', function(event) {
        callBackendForOffboarding(gamekey, playerID, false);
    });
}
function callBackendForOffboarding(gamekey, playerID, isTablemaster) {
    $.ajax({
        url: "http://localhost:8080/tables/offboarding/" + gamekey + "/" + playerID + "/" + isTablemaster,
        type: 'GET',
        async: false
    });
    disconnect();
}
function askForNewTablemaster(gamekey, playerID) {
    if (confirm("Tablemaster left the game." + "\n" + "\n" + "Do you want to be new Tablemaster?")) {
        ws.send("Iamtheoneandonlymaster=" + gamekey + "=" + playerID);
    }

}
function showPlayersNewTablemaster(message) {
    alert(message);
}
function initGameControl(gamekey, playerID) {
    $('.middleButton').click(function () {
        if (isGameCurrentlyRunning()) {
            $.ajax({
                url: "http://localhost:8080/tables/gameover/" + gamekey,
                type: 'GET'
            });
            $('.averageRating').css({display: "flex"});
            $('.middleButton').html("Neue Runde starten");
            $('.buttonCreate').css({height: "150px"});
            $('.hiddenCardValue').css({display: "block"});
        }
        else {
            $.ajax({
                url: "http://localhost:8080/tables/gameStart/" + gamekey,
                type: 'GET'
            });
            $('.middleButton').html("Karten anzeigen");
            $('.buttonCreate').css({height: "80px"});
        }
        getSpectatorMode(gamekey, playerID);
    });
    $('.copyLink').click(function () {
        let r = document.createRange();
        r.selectNode(document.getElementById('link'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    });
}

function isGameCurrentlyRunning() {
    if ($('.cardsBackSide').css('display') == 'flex') {
        return false;
    } else {
        return true;
    }
}
function checkForStartSpectatorMode(gamekey, playerID) {
    var spectatorCheckingTablemaster = document.getElementById('spectatorCheckboxTablemaster');
    var spectatorCheckingplayer = document.getElementById('spectatorCheckboxPlayer');
    $('.spectatorToggle').click(function () {
        if (spectatorCheckingTablemaster.checked || spectatorCheckingplayer.checked) {
            $('.cardsFrontSide').css('visibility','hidden');
            $('.cardsBackSide').css('visibility','hidden');
            $('svg:not(.headerAndFooter)').css({display: "none"});
            setSpectatorMode(false, gamekey, playerID);
        }
        else {
            if (isGameCurrentlyRunning()) {
                $('.cardsFrontSide').css('visibility','visible');
                $('.cardsBackSide').css('visibility','visible');
                $('.cardsBackSide').css({display: "none"});
                $('.cardsFrontSide').css({display: "flex"});
            } else {
                $('.cardsFrontSide').css('visibility','visible');
                $('.cardsBackSide').css('visibility','visible');
                $('.cardsBackSide').css({display: "flex"});
                $('.cardsFrontSide').css({display: "none"});
            }
            $('svg:not(.headerAndFooter)').css({display: "block"});
            setSpectatorMode(true, gamekey, playerID);
        }
        getSpectatorMode(gamekey, playerID);
    });
}
function setSpectatorMode(isSpectator, gamekey, playerID) {
    $.ajax({
        url: "http://localhost:8080/players/setplayermode/" + gamekey + "/" + playerID + "/" + isSpectator,
        type: 'GET'
    });
}
function getSpectatorMode(gamekey, playerID) {
    $.ajax({
        url: "http://localhost:8080/players/getplayermode/"+ gamekey +"/" +playerID,
        type: 'GET',
        success: function(res) {
            let gameModeOfCurrentPlayer = res;
            printTextForSpectators(gameModeOfCurrentPlayer);
        }
    });
}
function printTextForSpectators(gameModeOfCurrentPlayer) {
    if (!gameModeOfCurrentPlayer) {
        if (isGameCurrentlyRunning()) {
            $('.averageRating').css({display: "flex"});
            $('.averageRating').html("Spieler sind am abstimmen");
        }
    } else {
        $('.averageRating').css({display: "none"});
    }
}
function fillPlayerlist(playerID, arrayWithAllPlayers) {
    let playerList = $('.player-list');
    for (var i = 0; i < arrayWithAllPlayers.length; i++) {
        var visibilityIcon = '<img src="Cards/visibility_black_48dp.svg" width="32" height="32">';

        if (arrayWithAllPlayers[i].playerMode) {
            visibilityIcon = '<img src="Cards/visibility_off_black_48dp.svg" width="32" height="32">'
        }
        
        var playerNameAtI = arrayWithAllPlayers[i].name;

        var playerListBackground = '<div class="player-row otherPlayer">';
        if (arrayWithAllPlayers[i].id == playerID) {
            playerNameAtI = playerNameAtI + " (me)";
            playerListBackground = '<div class="player-row selfPlayer">';
        }
        var choosenNumberValue = arrayWithAllPlayers[i].selectedCard;
        if (arrayWithAllPlayers[i].selectedCard == null) {
            if (arrayWithAllPlayers[i].playerMode) {
                choosenNumberValue = '<img class="blank-card" src="Cards/Blank-card.svg" width="28" height="45">';
            }
            else {
                choosenNumberValue = '<img class="blank-card-gray" src="Cards/Blank-card.svg" width="28" height="45">';
            }
        }
        var playerRow = playerListBackground +
            '<div class="list-item">' + choosenNumberValue + '</div>\n' +
            '<div class="list-item">' + playerNameAtI + '</div>\n' +
            '<div class="list-item">' + visibilityIcon + '</div>\n' +
            '</div>';
        playerList.append(playerRow);
    }
}
function getAllPlayers(gamekey, playerID) {
    $.ajax({
        url: "http://localhost:8080/tables/getplayers/" + gamekey,
        type: 'GET',
        success: function(arrayWithAllPlayers) {
            deletePlayerList();
            fillPlayerlist(playerID, arrayWithAllPlayers);
        }
    });
}
function showAverage(gamekey) {
    $.ajax({
        url: "http://localhost:8080/average/" + gamekey,
        type: 'GET',
        success: function(res) {
            $('.averageRating').html("Durchschnitt: " + res);
            $('.averageRating').css({display: "flex"});
        }
    });
}
function resetCards() {
    var cardCollection = document.getElementsByClassName("card");
    for (var i = 0; i < cardCollection.length; i++) {
        cardCollection[i].classList.remove("selectedcard");
    }
}
function deletePlayerList() {
    $('.player-list').empty();
}
function connectWebsocket(gamekey, playerID) {

    ws = new WebSocket('ws://localhost:8080/table');
    ws.onopen = function(event) {
        console.log(event);
        ws.send('table=' + gamekey + ',' + 'playerid=' + playerID);
    }
    ws.onmessage = function(data){

        if (data.data.startsWith("RefreshPlayer")){
            getAllPlayers(gamekey, playerID);
        }
        if (data.data.startsWith("AskForNewTablemaster")) {
            getAllPlayers(gamekey, playerID);
            askForNewTablemaster(gamekey, playerID);
        }
        if (data.data.startsWith("NewTablemaster")) {
            var messageSplit = data.data.split(",")
            var message = messageSplit[1];
            showPlayersNewTablemaster(message);
            getAllPlayers(gamekey, playerID);
        }
        if (data.data.startsWith("IAmNowTheOneAndOnlyTablemaster")) {
            onboardingTablemasterFinish(gamekey, playerID, true);
        }
        if (data.data.startsWith("CantBeNewTablemaster")) {
            alert("You can't be new Tablemaster, because someone else was earlier");
        }
        if (data.data.includes("gameStart")){
            $('.cardsFrontSide').css({display: "flex"});
            $('.cardsBackSide').css({display: "none"});
            $('.averageRating').css({display: "none"});
            getAllPlayers(gamekey, playerID);
            resetCards();
        }
        if (data.data.includes("gameOver")) {
            $('.cardsFrontSide').css({display: "none"});
            $('.cardsBackSide').css({display: "flex"});
            getAllPlayers(gamekey, playerID);
            showAverage(gamekey);
        }
    }
}
function disconnect() {
    if (ws != null) {
        ws.close();
    }
}
function sendName() {
    ws.send('hello from client');
}
var addSvgToCardContainer = function ($cardContainer, cardId, storyPoint, data) {
    let $svg = jQuery(data).find('svg').clone();
    $svg.attr('id', cardId);
    $svg.attr('storyPoint', storyPoint);
    $('#cardText', $svg).text(storyPoint);
    $cardContainer.append($svg);
}
function cardListener(gamekey, playerID) {

    jQuery.get('Cards/card_front.svg', function (data) {
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-1', 1, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-2', 2, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-3', 3, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-4', 5, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-5', 8, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-6', 13, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-7', 21, data);
        addSvgToCardContainer($(document.getElementsByClassName('cardsFrontSide')), 'card-8', '?', data);
    });
    $('.cardsFrontSide').click(function (event) {
        var currentElement = event.target;
        while (currentElement && !(currentElement.nodeName == "svg")) {
            currentElement = currentElement.parentElement;
        }
        if (!currentElement) {
            return
        }
        resetCards();
        if (!currentElement.classList.contains("selectedcard")) {
            currentElement.classList.add("selectedcard");
            selectedCard = currentElement.getAttribute("storyPoint");
            $.ajax({
                url: "http://localhost:8080/players/setselectedcard/"+gamekey+"/"+playerID+"/"+ encodeURIComponent(selectedCard),
                type: 'GET'
            });
        }
    });
}

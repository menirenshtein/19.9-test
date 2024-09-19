"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// url link
const URL_link = "https://nbaserver-q21u.onrender.com/api/filter";
// search player button
const SEARCH_BTN = document.getElementById('search-player-btn');
//points input
const POINTS_INPUT = document.getElementById('points-input');
// two percent input
const TWO_PREC_INPUT = document.getElementById('twoPer-input');
//three percent input
const THREE_PREC_INPUT = document.getElementById('threePer-input');
//position input
const POSITION_INPUT = document.getElementById('select-input');
// takes th table body
const TABLE = document.getElementById('tbody');
// add event to the search btn to put the plyers in the table
SEARCH_BTN === null || SEARCH_BTN === void 0 ? void 0 : SEARCH_BTN.addEventListener('click', ((e) => {
    searchPlayers(e);
}));
// the function gets a player request body and turn it to a json and calls the table show function
function getPlayerByBody(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const RESPONSE = yield fetch(URL_link, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            if (!RESPONSE.ok) {
                throw new Error('bla bla');
            }
            const DATA = yield RESPONSE.json();
            showTable(DATA);
        }
        catch (error) {
            console.log('bla');
        }
    });
}
// const a:PlayerReq = {position: 'PG', twoPercent: 10, threePercent: 12, points: 1000} 
// getPlayerByBody(a)
// the function gets array of players and create for each of them a table row
function showTable(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // debugger
        TABLE.innerHTML = "";
        data.forEach(player => {
            const tRow = document.createElement('tr');
            const tdPlayer = document.createElement('td');
            tdPlayer.innerText += player.playerName;
            tRow.appendChild(tdPlayer);
            const tdPosition = document.createElement('td');
            tdPosition.innerText += player.position;
            tRow.appendChild(tdPosition);
            const tdPoints = document.createElement('td');
            tdPoints.innerText += player.points;
            tRow.appendChild(tdPoints);
            const tdWPG = document.createElement('td');
            tdWPG.innerText += player.twoPercent;
            tRow.appendChild(tdWPG);
            const tdTPG = document.createElement('td');
            tdTPG.innerText += player.threePercent;
            tRow.appendChild(tdTPG);
            const tdAction = document.createElement('td');
            const addPlayerBtn = document.createElement('button');
            // addPlayerBtn.setAttribute('id', `${player.playerName}`)
            addPlayerBtn.innerText = `Add ${player.playerName.split(' ')[0]} to Current Team`;
            addPlayerBtn.addEventListener('click', ((e) => {
                addToCards(e, player);
            }));
            tdAction.appendChild(addPlayerBtn);
            tRow.appendChild(tdAction);
            TABLE === null || TABLE === void 0 ? void 0 : TABLE.appendChild(tRow);
        });
    });
}
// the function reacts for event and search for a player by the inputs
function searchPlayers(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const PLAYER = {
            position: POSITION_INPUT.value,
            twoPercent: parseInt(TWO_PREC_INPUT.value),
            threePercent: parseInt(THREE_PREC_INPUT.value),
            points: parseInt(POINTS_INPUT.value),
        };
        const a = yield getPlayerByBody(PLAYER);
    });
}
const a = {
    PG: "Points Guard",
    SG: "Shooting Guard",
    SF: "Small Forward",
    PF: "Power Forward",
    C: "Center"
};
//the function add the player and puts he`s details to the mached card
function addToCards(e, player) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        debugger;
        const div = document.getElementById(player.position.toString());
        div.innerHTML = '';
        const headLine = document.createElement('h4');
        headLine.innerText = `${player.position.toString()}`;
        headLine.style.color = '#17408B';
        div === null || div === void 0 ? void 0 : div.appendChild(headLine);
        const name = document.createElement('h4');
        name.innerText = `${player.playerName.toString()} `;
        div === null || div === void 0 ? void 0 : div.appendChild(name);
        const three = document.createElement('h4');
        three.innerText = `Tree Percent: ${player.threePercent} %`;
        div === null || div === void 0 ? void 0 : div.appendChild(three);
        const two = document.createElement('h4');
        two.innerText = `two Percent: ${player.twoPercent.toString()} %`;
        div === null || div === void 0 ? void 0 : div.appendChild(two);
        const points = document.createElement('h4');
        points.innerText = `Points: ${player.points.toString()} `;
        div === null || div === void 0 ? void 0 : div.appendChild(points);
    });
}

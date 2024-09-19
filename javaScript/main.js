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
console.log('sdkfjh');
const URL_link = "https://nbaserver-q21u.onrender.com/api/filter";
const POINTS_INPUT = document.getElementById('points-input');
const TWO_PREC_INPUT = document.getElementById('twoPer-input');
const THREE_PREC_INPUT = document.getElementById('threePer-input');
const TABLE = document.getElementById('table');
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
            console.log(DATA);
            showTable(DATA);
        }
        catch (error) {
            console.log('bla');
        }
    });
}
const a = { position: 'PG', twoPercent: 10, threePercent: 12, points: 1000 };
getPlayerByBody(a);
function showTable(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
            addPlayerBtn.innerText = `Add ${player.playerName.split(' ')[0]} to Current Team`;
            // addPlayerBtn.setAttribute('class', 'addPlayerBtn');
            tdAction.appendChild(addPlayerBtn);
            tRow.appendChild(tdAction);
            TABLE === null || TABLE === void 0 ? void 0 : TABLE.appendChild(tRow);
        });
    });
}

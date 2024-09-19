console.log('sdkfjh')

const URL_link: string = "https://nbaserver-q21u.onrender.com/api/filter"
const POINTS_INPUT = document.getElementById('points-input') as HTMLInputElement 
const TWO_PREC_INPUT = document.getElementById('twoPer-input') as HTMLInputElement
const THREE_PREC_INPUT = document.getElementById('threePer-input') as HTMLInputElement
const TABLE = document.getElementById('table') as HTMLElement

interface PlayerReq {
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number 
}


interface PlayerRes {
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number 
    playerName: string,
}

async function getPlayerByBody(obj:PlayerReq) : Promise<PlayerRes[] | void> {
    try {
        const RESPONSE = await fetch(URL_link,{
            method: 'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        })
        if (!RESPONSE.ok) {
            throw new Error('bla bla')
        }
        const DATA = await RESPONSE.json()
        console.log(DATA)        
        showTable(DATA)
    } catch (error) {
        console.log('bla')
    }
}

const a:PlayerReq = {position: 'PG', twoPercent: 10, threePercent: 12, points: 1000} 
getPlayerByBody(a)



async function showTable(data: PlayerRes[]) {
    data.forEach(player  => {
        const tRow = document.createElement('tr')

        const tdPlayer = document.createElement('td')
        tdPlayer.innerText += player.playerName
        tRow.appendChild(tdPlayer)

        const tdPosition = document.createElement('td')
        tdPosition.innerText += player.position
        tRow.appendChild(tdPosition)

        const tdPoints = document.createElement('td')
        tdPoints.innerText += player.points
        tRow.appendChild(tdPoints)

        const tdWPG = document.createElement('td')
        tdWPG.innerText += player.twoPercent
        tRow.appendChild(tdWPG)

        const tdTPG = document.createElement('td')
        tdTPG.innerText += player.threePercent
        tRow.appendChild(tdTPG)

        const tdAction = document.createElement('td');

        const addPlayerBtn = document.createElement('button');
        addPlayerBtn.innerText = `Add ${player.playerName.split(' ')[0]} to Current Team`;
        // addPlayerBtn.setAttribute('class', 'addPlayerBtn');
        tdAction.appendChild(addPlayerBtn);

        tRow.appendChild(tdAction);
        TABLE?.appendChild(tRow);
    });
}
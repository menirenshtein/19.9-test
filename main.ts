const URL_link: string = "https://nbaserver-q21u.onrender.com/api/filter"
const SEARCH_BTN = document.getElementById('search-player-btn')
const POINTS_INPUT = document.getElementById('points-input') as HTMLInputElement 
const TWO_PREC_INPUT = document.getElementById('twoPer-input') as HTMLInputElement
const THREE_PREC_INPUT = document.getElementById('threePer-input') as HTMLInputElement
const POSITION_INPUT = document.getElementById('select-input') as HTMLSelectElement
const TABLE = document.getElementById('tbody') as HTMLElement


SEARCH_BTN?.addEventListener('click', ((e)=>{
    searchPlayers(e)
}))

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
        // console.log(DATA)        
        showTable(DATA)
    } catch (error) {
        console.log('bla')
    }
}

const a:PlayerReq = {position: 'PG', twoPercent: 10, threePercent: 12, points: 1000} 
// getPlayerByBody(a)

async function showTable(data: PlayerRes[]) {
    // debugger
    TABLE.innerHTML = ""
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
        // addPlayerBtn.setAttribute('id', `${player.playerName}`)
        addPlayerBtn.innerText = `Add ${player.playerName.split(' ')[0]} to Current Team`;
        addPlayerBtn.addEventListener('click', ((e)=>{
            addToCards(e, player)
        }))
        tdAction.appendChild(addPlayerBtn);

        tRow.appendChild(tdAction);
        TABLE?.appendChild(tRow);
    });
}



async function searchPlayers(e:Event) {
    e.preventDefault();
    const PLAYER: PlayerReq = {
        position: POSITION_INPUT.value,
        twoPercent: parseInt(TWO_PREC_INPUT.value),
        threePercent: parseInt( THREE_PREC_INPUT.value),
        points: parseInt(POINTS_INPUT.value),
    }
    const a = await getPlayerByBody(PLAYER)
    const data = await a as PlayerRes[]

}

async function addToCards(e:Event, player:PlayerRes) {
    e.preventDefault();
   debugger
    const div = document.getElementById(player.position.toString())


    const name = document.createElement('h4')
    name.innerText = `${player.playerName.toString()} `
    div?.appendChild(name)

    const three = document.createElement('h4')
    three.innerText = `Tree Percent: ${player.threePercent} %`
    div?.appendChild(three)

    const two = document.createElement('h4')
    two.innerText = `two Percent: ${player.twoPercent.toString()} %`
    div?.appendChild(two)

    const points = document.createElement('h4')
    points.innerText = `Points: ${player.points.toString()} `
    div?.appendChild(points)    

    
}
localStorage.getItem('scoresimple') ? '':localStorage.setItem("scoresimple", 0)
localStorage.getItem("scorebonus") ? '':localStorage.setItem("scorebonus", 0)

const btn_rules = document.querySelector("#bouton button")
const btn_cancel_rules = document.querySelector(".modal-rules .head>button")
const btn_cancel_rules_mobiles = document.querySelector(".modal-rules-mobiles .foot>button")

btn_rules.addEventListener("click", handleClickRules)
function handleClickRules(){
    if (window.innerWidth >= 540){
        const rulesDiv = document.querySelector(".modal-rules")
        rulesDiv.style.display = "block";
        document.querySelector("#root").classList.add("root-flou")
    }
    else{
        const rulesDiv = document.querySelector(".modal-rules-mobiles")
        rulesDiv.style.display = "flex";
    }
}
btn_cancel_rules.addEventListener("click", handleClickCancel)
btn_cancel_rules_mobiles.addEventListener("click", handleClickCancel)
function handleClickCancel(){
    let rulesDiv;
    if (window.innerWidth >= 540){
        rulesDiv = document.querySelector(".modal-rules")
        document.querySelector("#root").classList.remove("root-flou")
    }
    else{
        rulesDiv = document.querySelector(".modal-rules-mobiles")
    }
    rulesDiv.style.display = "none";
}


//Gestion du score
const scoreText = document.querySelector("#score-tg")
scoreText.innerText = localStorage.scoresimple

const btncommande = document.querySelectorAll(".btn-commande div")

btncommande.forEach(e => {
    e.addEventListener("click", handleClickGame, true)
})

let pick = {}
let pickbonus = {};
const textuser = document.createElement("p")
const texthouse = document.createElement("p")
const textuserbonus = document.createElement("p")
const texthousebonus = document.createElement("p")
const gameContent = document.querySelector("#game-content")
const message_resultat = document.querySelector("#message-resultat")
const message_resultat_bonus = document.querySelector("#message-resultat-bonus")

gameContent.scrollLeft = 0

function handleClickGame(e){
    let parent;
    let tab = []
    textuser.innerText = "YOU PICKED"
    texthouse.innerText = "THE HOUSE PICKED"
    textuser.style = "color:white; font-size: 15px; font-family: sans-serif; font-weight: bold; position: absolute; text-align: center"
    texthouse.style = "color:white; font-size: 15px; font-family: sans-serif; font-weight: bold; position: absolute; text-align: center"

    if (e.target.tagName === "DIV"){
        parent = e.target.parentElement
    }
    else{
        parent = e.target.parentElement.parentElement
    }
    updatePick(parent, document.querySelector(`#${HousePick('simple')}`))

    document.querySelectorAll(".btn-commande").forEach(e => tab.push(e))

    tab = tab.filter(item => {
        return item !== pick.house && item !== pick.user
    })

    updatePick(pick.user.cloneNode(true), pick.house.cloneNode(true))
    //Ajout du texte
    //styling clone
    pick.house.style.opacity = '.3'
    grayelement(pick.house)

    if (window.innerWidth < 540){
        pick.user.style.top = "calc(50% - 62.5px)"
        pick.user.style.left = "calc(20% - 62.5px)"
        pick.house.style.top = "calc(50% - 62.5px)"
        pick.house.style.left = "calc(80% - 62.5px)"
        textuser.style.top = "27%"
        textuser.style.left = "calc(20% - 50px)"
        texthouse.style.top = '27%'        
        texthouse.style.left = "calc(80% - 62.5px)"
    }
    else{
        pick.user.style.width = "150px"
        pick.user.style.height = "150px"

        pick.user.style.top = "calc(50% - 75px)"
        pick.user.style.left = "10%"
    
        pick.house.style.top = "calc(50% - 75px)"
        pick.house.style.left = "calc(90% - 150px)"
        textuser.style.top = "20%"
        textuser.style.left = "10%"
        texthouse.style.top = '20%'        
        texthouse.style.left = "calc(90% - 150px)"
    }
    

    message_resultat.querySelector("p").innerText = calcWinnerSimple(pick.house.id, pick.user.id)
    //Hiding all elements
    hideFirstStep('simple')

    //Adding Clone node
    gameContent.querySelector("#game-simple").append(textuser, pick.user, texthouse, pick.house)
    waitingtill2second()
    waitforTranslate()
    setTimeout(()=>{
        if (message_resultat.querySelector("p").innerText === "YOU WIN"){
            scoreText.innerText = localStorage.scoresimple
            pick.user.classList.add("winnerbutton")
        }
        else if (message_resultat.querySelector("p").innerText === "YOU LOSE"){
            pick.house.classList.add("winnerbutton")
        }
        
    }, 1700)
}
function calcWinnerSimple(house, user){
    const simple = ['paper', 'scissor', 'rock']
    if (house === user){
        return "MATCH NULL"
    }
    else{
        const idhouse = simple.indexOf(house)
        const iduser = simple.indexOf(user)
        if (idhouse === (iduser+1)%simple.length){
            return "YOU LOSE"
        }
        else{
            localStorage.setItem('scoresimple', parseInt(localStorage.scoresimple) + 1)
            return "YOU WIN"
        }
    }
}
function waitingtill2second(){
    const timer = setTimeout(() => {
        pick.house.style.opacity = "1"
        ingrayelement(pick.house)
    }, 1000);
    return () => {
        clearTimeout(timer)
    }
}
function waitforTranslate(){
    const timer = setTimeout(()=>{
        if (window.innerWidth < 540){
            pick.user.style.transform = "translateY(-120px)"
            pick.house.style.transform = "translateY(-120px)"
            textuser.style.transform = 'translateY(-120px)'
            texthouse.style.transform = 'translateY(-120px)'
        }
        else{
            pick.user.style.transform = "translateX(-40px)"
            pick.house.style.transform = "translateX(40px)"
            textuser.style.transform = 'translateX(-40px)'
            texthouse.style.transform = 'translateX(40px)'
        }
        message_resultat.style.display = "block"
        
    }, 1600)
    return ()=>{
        clearTimeout(timer)
    }
}
function updatePick(user, house){
    pick.user = user
    pick.house = house
}

const btnPlayAgain = document.querySelector("#play-again")

btnPlayAgain.addEventListener("click", handlePlayAgain)
function handlePlayAgain(e){
    message_resultat.style.display = 'none'
    texthouse.remove()
    textuser.remove()
    pick.user.remove()
    pick.house.remove()
    pick = {}
    showFirstStep('simple')
}

const swapgame = document.querySelector("#bonus-button")

let type = "simple"
swapgame.addEventListener("click", (e)=>{
    gameswaping(e, type==="simple"?"bonus":"simple")
})
function gameswaping(e, types){
    type = types
    togglingWinnerClass(type)
    e.target.classList.toggle("bonus-btn-active")
    const ul = document.querySelector("header ul")
    const modal_rules = document.querySelectorAll(".modal-rules, .modal-rules-mobiles")
    if (types === "simple"){
        gameContent.scrollLeft = 0
        scoreText.innerText = localStorage.scoresimple
        if (ul.children.length > 3){
            ul.removeChild(ul.lastChild)
            ul.removeChild(ul.lastChild)
        }
        modal_rules.forEach(e => {
            e.querySelector(".rules img").src = "./images/image-rules.svg"
        })
    }else{
        gameContent.style.overflow = 'auto'
        setTimeout(()=>{
            gameContent.style.overflow = 'hidden'
        }, 0)
        gameContent.scrollLeft = gameContent.scrollLeftMax
        scoreText.innerText = localStorage.scorebonus
        const other = "Spock, lizard"
        other.split(", ").forEach(e => {
            let li = document.createElement("li")
            li.innerText = e
            ul.appendChild(li)
        })
        modal_rules.forEach(e => {
            e.querySelector(".rules img").src = "./images/image-rules-bonus.svg"
        })
    }
}

function togglingWinnerClass(type){
    if (pick.house){
        if (message_resultat.querySelector("p").innerText === "YOU LOSE"){
            type==="simple"?pick.house.classList.add("winnerbutton"):pick.house.classList.remove("winnerbutton")
        }
    }
    if (pick.user){
        if (message_resultat.querySelector("p").innerText === "YOU WIN"){
            type==="simple"?pick.user.classList.add("winnerbutton"):pick.user.classList.remove("winnerbutton")
        }
    }
    if (pickbonus.house){
        if (message_resultat_bonus.querySelector("p").innerText === "YOU LOSE"){
            type==="bonus"?pickbonus.house.classList.add("winnerbutton"):pickbonus.house.classList.remove("winnerbutton")
        }
    }
    if (pickbonus.user){
        if (message_resultat_bonus.querySelector("p").innerText === "YOU WIN"){
            type==="bonus"?pickbonus.user.classList.add("winnerbutton"):pickbonus.user.classList.remove("winnerbutton")
        }
    }
}
const btncommandebonus = document.querySelectorAll(".btn-commande-bonus")
btncommandebonus.forEach(e => {
    e.addEventListener("click", handleClickGameBonus)
})

function handleClickGameBonus(e){
    let parent;
    let tab = []
    textuserbonus.innerText = "YOU PICKED"
    texthousebonus.innerText = "THE HOUSE PICKED"
    textuserbonus.style = "color:white; font-size: 15px; font-family: sans-serif; font-weight: bold; position: absolute; text-align: center;"
    texthousebonus.style = "color:white; font-size: 15px; font-family: sans-serif; font-weight: bold; position: absolute; text-align: center;"

    if (e.target.tagName === "DIV"){
        parent = e.target.parentElement
    }
    else{
        parent = e.target.parentElement.parentElement
    }
    updatePickBonus(parent, document.querySelector(`#${HousePick('bonus')}bonus`))

    document.querySelectorAll(".btn-commande-bonus").forEach(e => tab.push(e))
    tab = tab.filter(item => {
        return item !== pickbonus.house && item !== pickbonus.user
    })
    updatePickBonus(pickbonus.user.cloneNode(true), pickbonus.house.cloneNode(true))
    pickbonus.house.style.opacity = '.3'
    grayelement(pickbonus.house)

    if (window.innerWidth < 540){
        textuserbonus.style.width = texthousebonus.style.width = '120px'
        pickbonus.user.style.width = pickbonus.house.style.width = '120px'
        pickbonus.user.style.height = pickbonus.house.style.height = '120px'
        pickbonus.user.style.top = "calc(50% - 60px)"
        pickbonus.user.style.left = "calc(120% - 60px)"
        pickbonus.house.style.top = "calc(50% - 60px)"
        pickbonus.house.style.left = "calc(180% - 60px)"
        textuserbonus.style.top = "27%"
        textuserbonus.style.left = "calc(120% - 60px)"
        texthousebonus.style.top = '27%'        
        texthousebonus.style.left = "calc(180% - 60px)"
    }
    else{
        textuserbonus.style.width = texthousebonus.style.width = '150px'
        pickbonus.user.style.width = "150px"
        pickbonus.user.style.height = "150px"
        pickbonus.house.style.width = '150px'
        pickbonus.house.style.height = '150px'
        pickbonus.user.style.top = "calc(50% - 75px)"
        pickbonus.user.style.left = "calc(120% - 75px)"
        pickbonus.house.style.top = "calc(50% - 75px)"
        pickbonus.house.style.left = "calc(180% - 75px)"
        textuserbonus.style.top = "20%"
        textuserbonus.style.left = "calc(120% - 75px)"
        texthousebonus.style.top = '20%'        
        texthousebonus.style.left = "calc(180% - 75px)"
    }
    
    message_resultat_bonus.querySelector("p").innerText = calcWinnerBonus(pickbonus.house.id, pickbonus.user.id)
    //Hiding all elements
    hideFirstStep('bonus')

    //Adding Clone node
    gameContent.querySelector("#game-bonus").append(textuserbonus, pickbonus.user, texthousebonus, pickbonus.house)
    waitingtill2secondBonus()
    waitforTranslateBonus()

    setTimeout(()=>{
        if (message_resultat_bonus.querySelector("p").innerText === "YOU WIN"){
            scoreText.innerText = localStorage.scorebonus
            pickbonus.user.classList.add("winnerbutton")
        }
        else if (message_resultat.querySelector("p").innerText === "YOU LOSE"){
            pickbonus.house.classList.add("winnerbutton")
        }
    }, 1700)
}
function hideFirstStep(type){
    const firststep = document.querySelector("#game-"+type);
    const child = [].slice.call(firststep.children)
    child.forEach(e => e.style.display = "none")
}
function showFirstStep(type){
    const firststep = document.querySelector("#game-"+type);
    const child = [].slice.call(firststep.children)
    child.forEach(e => e.style.display = "flex")
}
function HousePick(type){
    let listSimple; 
    if (type === 'simple'){
        listSimple = ['paper', 'scissor', 'rock']
    }
    else{
        listSimple = ['paper', 'scissor', 'rock', 'lizard', 'spock']
    }
    const random = Math.round(Math.random()*listSimple.length)
    const index = random ? random:random+1
    return listSimple[index - 1];
}
function grayelement(elem){
    elem.style.backgroundColor = "gray"
    elem.children[0].style.backgroundColor = 'inherit'
    elem.querySelector("img").style.display = 'none'
}
function ingrayelement(elem){
    elem.style.backgroundColor = ''
    elem.children[0].style.backgroundColor = ''
    elem.querySelector("img").style.display = ''
}
function waitingtill2secondBonus(){
    const timer = setTimeout(() => {
        pickbonus.house.style.opacity = "1"
        ingrayelement(pickbonus.house)
    }, 1000);
    return () => {
        clearTimeout(timer)
    }
}
function waitforTranslateBonus(){
    const timer = setTimeout(()=>{
        if (window.innerWidth < 540){
            pickbonus.user.style.transform = "translateY(-120px)"
            pickbonus.house.style.transform = "translateY(-120px)"
            textuserbonus.style.transform = 'translateY(-120px)'
            texthousebonus.style.transform = 'translateY(-120px)'
        }
        else{
            pickbonus.user.style.transform = "translateX(-20px)"
            pickbonus.house.style.transform = "translateX(20px)"
            textuserbonus.style.transform = 'translateX(-20px)'
            texthousebonus.style.transform = 'translateX(20px)'
        }
        message_resultat_bonus.style.display = "block"
    }, 1600)
    return ()=>{
        clearTimeout(timer)
    }
}
function updatePickBonus(user, house){
    pickbonus.user = user
    pickbonus.house = house
}
const playagainbonus = document.querySelector("#play-again-bonus")
playagainbonus.addEventListener("click", handlePlayAgainBonus)

function handlePlayAgainBonus(e){
    message_resultat_bonus.style.display = 'none'
    texthousebonus.remove()
    textuserbonus.remove()
    pickbonus.user.remove()
    pickbonus.house.remove()
    pickbonus = {}
    showFirstStep('bonus')
}

function calcWinnerBonus(house, user){
    const simple = ['scissor', 'paper', 'rock', 'lizard', 'spock']
    const idhouse = simple.indexOf(house.replace("bonus", ''))
    const iduser = simple.indexOf(user.replace('bonus', ''))
    let l = simple.length
    
    if (house === user){
        return "MATCH NULL"
    }
    else{  
        if (idhouse === (iduser + 1)%l || idhouse === (iduser + 3)%l){
            localStorage.setItem("scorebonus", parseInt(localStorage.scorebonus) + 1)
            return "YOU WIN"
        }
        else{
            return "YOU LOSE"
        }
    }
}
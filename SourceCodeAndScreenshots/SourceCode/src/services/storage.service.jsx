export function saveGames(jsonObj) {
    localStorage.setItem('games', JSON.stringify(jsonObj));
}

export function getAllGames() {
    return JSON.parse(localStorage.getItem('games'));
}

export function getGames(offset, limit) {
    let games = getAllGames();
    let toReturn = [];
    let startIndex = offset * limit;
    let endIndex = startIndex + limit - 1;
    for(let i = startIndex; i <= endIndex; i++) {
        if(games[i]) {
            toReturn.push(games[i]);
        }
    }
    return toReturn;
}

export function getSearchedGames(str) {
    let allGames = [];
    allGames = getAllGames();
    str = str.toLowerCase();
    let searchArr = allGames.filter(game => {
        let strName = game.Name;
        return (strName.toString().toLowerCase().includes(str))
    });
    return searchArr;
}

export function getSortedGames(option) {
    let allGames = [];
    allGames = getAllGames();
    let sortedList = [];
    if (option === 'Oldest To Latest') sortedList = allGames.sort((a, b) => a.Year - b.Year);
    else if (option === 'Latest To Oldest') sortedList = allGames.sort((a, b) => b.Year - a.Year);
    else sortedList = allGames.sort((a, b) => a.Rank - b.Rank);
    localStorage.setItem('games', JSON.stringify(sortedList));
}
const igdb = require('igdb-api-node').default;

const client = igdb(process.env.igdbKey);

function gameData(game) {
    
    client.games({
        search: game
    },[
        'name',
        'release_dates.date',
        'rating',
        'hypes',
        'cover'
    ]
    ).then(res => {
        //console.log(res.body);
        var image = res.body[0].cover.url;
        console.log(image);
        //not returning(async issue?)
        return image;
    });
};
module.exports = gameData;
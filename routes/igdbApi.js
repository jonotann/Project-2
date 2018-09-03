const igdb = require('igdb-api-node').default;
var db = require("../models");

const client = igdb(process.env.igdbKey);

function gameData(game, id) {
    
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
        
        var image = res.body[0].cover.url;
        
        db.Tournament.update({image: image}, {where: {id: id}}).then(function(result) {
            return;
        });

    });
};
module.exports = gameData;
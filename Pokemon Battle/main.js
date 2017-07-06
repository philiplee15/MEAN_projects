var game = {
  players: [],
  addPlayer: function(){
    var player = playerConstructor(name);
    this.players.push(player);
    return this;
  }
};
function playerConstructor(name){
  player = {};
  player.name = name;
  player.hand = [];
  player.addCard = function(card){
    player.hand.push(card);
  };
  return player;
};

function drawgame() {
  if(game.players){
    for(var i = 0; i<game.players.length; i++){
      $("#players").append()
    }
  }
}

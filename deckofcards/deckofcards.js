//numbers A=10, B=J, D=Q, E=K (these correspond to Unicode values, skip C=Knight)
//shapes A=Spades, B=Hearts, C=Diamonds, D=Clubs (also corresponds to Unicode)
//Unicode syntax: &#x1f0{{shapes}}{{numbers}};


/**************************************************
DECK CONSTRUCTOR DECLARATION
**************************************************/

function Deck() {
  this.numbers = [1,2,3,4,5,6,7,8,9,"A","B","D","E"];
  this.shapes = ["A", "B", "C", "D"];
  this.cards = [];
  for(var i=0; i<this.numbers.length; i++){
    for(var j=0; j<this.shapes.length; j++){
      var card = this.shapes[j]+ this.numbers[i];
      this.cards.push(card);
    }
  }
  this.deck = this.cards;
  this.deal = function() {
    var rand = Math.floor(Math.random()*(this.deck.length));
    var store = this.deck[rand];
    this.deck.splice(rand, 1);
    return store;
  }
  this.showcards = function() {
    $("#cards").empty();
    var uni = "&#x1f0";
    var counter = 0;
    for(var i = 0; i <this.deck.length; i++){
      counter++;
      var code = this.deck[i];
      var unicode = uni.concat(code);
      var id = i;
      if(counter==13){
        $("#cards").append("<span id='"+ id + "' class='single'>"+unicode+"</span>"+"<br>");
        counter = 0;
      } else {
        $("#cards").append("<span id='"+ id + "' class='single'>"+unicode+"</span>");
      }
    }
    return this;
  }
  this.shuffle = function () {
    var decky = this.deck;
    var copy = [], n = decky.length, i;
    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * decky.length);
      // If not already shuffled, move it to the new array.
      if (i in decky) {
        copy.push(decky[i]);
        delete decky[i];
        n--;
      }
    }
    this.deck = copy;
    return this;
  }
  this.reset = function () {
    var cards = [];
    for(var i=0; i<this.numbers.length; i++){
      for(var j=0; j<this.shapes.length; j++){
        var card = this.shapes[j]+ this.numbers[i];
        cards.push(card);
      }
    }
    this.deck = cards;
    return this;
  }
}

/**************************************************
PLAYER CONSTRUCTOR DECLARATION
**************************************************/

function Player(name){
  this.name = name;
  this.hand = [];
  this.addcard = function(){
    var args = Array.prototype.slice.call(arguments, 0);
    for(var i=0; i<args.length; i++){
      this.hand.push(args[i]);
    }
    return this;
  }
}


/**************************************************
TEST ENVIRONMENT
**************************************************/
var deck1 = new Deck();
console.log(deck1.deck);
// deal1 = deck1.deal();
// deal2 = deck1.deal();
// console.log(deal1, deal2);
// console.log(deck1.deck);

var p1;
// p1.addcard(deal1, deal2);
// console.log(p1.hand);
console.log(deck1.deck.length);
deck1.showcards();
$("#shuffle").click(function(){
  deck1.shuffle();
  deck1.showcards();
});
$("#reset").click(function(){
  $("#hand").empty();
  deck1.reset();
  p1.hand = [];
  deck1.showcards();
});
$("#player").click(function(){
  var name = prompt("What is your name?");
  if(name){
    p1 = new Player(name);
    $("#message").html("<p>Welcome "+name+", let's play!</p>");
  }
  else {
    alert("No name inputted! Try again.")
  }
})
$("#deal").click(function(){
  $("#hand").empty();
  var deal = deck1.deal();
  console.log(deal);
  if(p1){
    p1.addcard(deal);
  } else {
    alert("Please add a player.")
  }
  console.log(p1.hand);
  var uni = "&#x1f0";
  for(var i = 0; i < p1.hand.length; i++){
    var code = p1.hand[i];
    var unicode = uni.concat(code);
    if(isNaN(code[1])) {
      var value = 10;
    } else {
      var value = code[1];
    }
    console.log(value);
    $("#hand").append("<span class='single'>"+unicode+"</span>");
  }
  deck1.showcards();
})

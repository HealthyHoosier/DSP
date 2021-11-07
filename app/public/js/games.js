const Game = {
    data() {
      return {
        "game":[],
        gameForm:{},
        selectedGame: null,
      }
    },
    
    methods: {
      // GET GAME DATA FOR TABLE
      postGame(evt) {
        if (this.selectedGame === null) {
            this.postNewGame(evt);
        } else {
            this.postEditGame(evt);
        }
      },
      fetchGameData(r) {
        fetch('/api/games/')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.game = responseJson;
          })
        .catch( (err) => {
          console.error(err);
        })
      },
      // POST A NEW GAME TO DATABASE
      postNewGame(evt) {
        console.log("Creating!", this.gameForm);
  
        fetch('api/games/create.php', {
            method:'POST',
            body: JSON.stringify(this.gameForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.game = json;
            // Reset the form
            this.gameForm = {};
          });
      },
      // EDIT A GAME IN THE DATABASE
      postEditGame(evt) {
        console.log("Updating", this.gameForm);
  
        fetch('api/games/update.php', {
            method:'POST',
            body: JSON.stringify(this.gameForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            this.game = json;
            
            // RESET
            this.resetGameForm();
          });
      },
      // DELETE A GAME FROM THE DATABASE
      postDeleteGame(o) {
        if (!confirm("Are you sure you want to delete this game "+o.title+"?")) {
          return;
        }
        console.log("Delete", o);
      
        fetch('api/games/delete.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.game = json;
    
          // RESET THE FORM
          this.resetgameForm();
        });
      },
      // SELECT GAME TO EDIT
      selectGameToEdit(o) {
        this.selectedGame = o;
        this.gameForm = Object.assign({}, this.selectedGame);
      },
      // RESET THE GAME FORM
      resetGameForm() {
        this.selectedGame = null;
        this.gameForm = {};
      }
    },
  // Closing Methods ------------------------------------------------------------------------------------
  },
  // Created ------------------------------------------------------------------------------------
  created(){
        this.fetchGamesData();
    }
  }

  Vue.createApp(Game).mount('#gameJS');
  
  
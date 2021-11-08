const One = {
    data() {
      return {
        "game":[],
        gameForm:{},
        selectedGame: null,
        "referee":[],
        refereeForm:{},
        selectedReferee: null,
        "assignment":[],
        assignmentForm:{},
        selectedAssignment: null,
      }
    },
      
    computed: {},
      
    methods: {
//GAMESJS-----------------------------------------------------------------------------------------------------------------
      // GET GAME DATA FOR TABLE
      postGame(evt) {
        if (this.selectedGame === null) {
          this.postNewGame(evt);
        } else {
          this.postEditGame(evt);
        }
      },
      fetchGamesData(g) {
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
        if (!confirm("Are you sure you want to delete this game with " +o.gameHost+ " against "+o.gameVisitor+"?")) {
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
          this.resetGameForm();
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
      },
//REFSJS---------------------------------------------------------------------------------------------------------------
        // GET REFEREE DATA FOR TABLE
        postReferee(evt) {
            if (this.selectedReferee === null) {
            this.postNewReferee(evt);
            } else {
            this.postEditReferee(evt);
            }
        },
        fetchRefereeData(r) {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            })
            .catch( (err) => {
            console.error(err);
            })
        },
        // POST A NEW REFEREE TO DATABASE
        postNewReferee(evt) {
            console.log("Creating!", this.refereeForm);
            fetch('api/referees/create.php', {
                method:'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referee = json;
                // Reset the form
                this.refereeForm = {};
            });
        },
        // EDIT A REFEREE IN THE DATABASE
        postEditReferee(evt) {
            console.log("Updating", this.refereeForm);
    
            fetch('api/referees/update.php', {
                method:'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                this.referee = json;
                // RESET
                this.resetRefereeForm();
            });
        },
        // DELETE A REFEREE FROM THE DATABASE
        postDeleteReferee(o) {
            if (!confirm("Are you sure you want to delete "+o.refereeLast+", "+o.refereeFirst+"?")) {
            return;
            }
            console.log("Delete", o);
        
            fetch('api/referees/delete.php', {
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
            this.referee = json;
        
            // RESET THE FORM
            this.resetRefereeForm();
            });
        },
        // SELECT REFEREE TO EDIT
        selectRefereeToEdit(o) {
            this.selectedReferee = o;
            this.refereeForm = Object.assign({}, this.selectedReferee);
        },
        // RESET THE REFEREE FORM
        resetRefereeForm() {
            this.selectedReferee = null;
            this.refereeForm = {};
        },
//ASSIGNMENTS JS-------------------------------------------------------------------------------------------------------------
        // GET ASSIGNMENT DATA FOR TABLE
        postAssignment(evt) {
          if (this.selectedAssignment === null) {
              this.postNewAssignment(evt);
          } else {
              this.postEditAssignment(evt);
          }
        },
        fetchAssignmentData(a) {
          fetch('/api/assignment/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assignment = responseJson;
            })
          .catch( (err) => {
            console.error(err);
          })
        },
        // POST A NEW ASSIGNMENT TO DATABASE
        postNewAssignment(evt) {
          console.log("Creating", this.assignmentForm);

          fetch('api/assignment/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assignment = json;
              // Reset the form
              this.assignmentForm = {};
            });
        },
        // EDIT AN ASSIGNMENT IN THE DATABASE
        postEditAssignment(evt) {
          console.log("Updating", this.assignmentForm);

          fetch('api/assignment/update.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              this.assignment = json;
              // RESET
              this.resetAssignmentForm();
            });
        },
        // DELETE AN ASSIGNMENT FROM THE DATABASE
        postDeleteAssignment(o) {
          if (!confirm("Are you sure you want to delete this Assignment"+o.gameHost+"?")) {
            return;
          }
          console.log("Delete", o);
        
          fetch('api/assignment/delete.php', {
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
            this.assignment = json;

            // RESET THE FORM
            this.resetassignmentForm();
          });
        },
        // SELECT ASSIGNMENT TO EDIT
        selectAssignmentToEdit(o) {
          this.selectedAssignment = o;
          this.assignmentForm = Object.assign({}, this.selectedAssignment);
        },
        // RESET THE ASSIGNMENT FORM
        resetAssignmentForm() {
          this.selectedAssignment = null;
          this.AssignmentForm = {};
        }
    },
  
    created() {
      this.fetchGamesData();
      this.fetchRefereeData();
      this.fetchAssignmentData();
    }
  }
  
  Vue.createApp(One).mount('#oneJS');
const Referee = {
  data() {
    return {
      "referee":[],
      refereeForm:{},
      selectedReferee: null,
    }
  },
  
  methods: {
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
      if (!confirm("Are you sure you want to delete this Referee"+o.title+"?")) {
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
        this.resetrefereeForm();
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
    }
  },
  
  }
Vue.createApp(Referee).mount('#refereesJS');
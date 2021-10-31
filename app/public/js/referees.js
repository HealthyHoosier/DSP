const Referee = {
  data() {
    return {
      "referees":[],
      refereeForm:{},
      selectedReferee: null
    }
  },
methods: {
// Currency Formatting ------------------------------------------------------------------------------------
prettyDollar(n) {
const d = new Intl.NumberFormat("en-US").format(n);
  return "$ " + d;
              },
// API to SQL for Referees Table ------------------------------------------------------------------------------------
fetchRefereesData() {
fetch('/api/referees/index.php')
.then( response => response.json() )
.then( (responseJson) => {
console.log(responseJson);
this.referees = responseJson;
})
.catch( (err) => {
console.error(err);
  })
},

// Post New Referee from form ------------------------------------------------------------------------------------
postReferee(evt) {
if (this.selectedReferee === null) {
    this.postNewReferee(evt);
} else {
    this.postEditReferee(evt);
}
},
postNewReferee(evt) { 
console.log("Create", this.refereeForm);

fetch('api/referees/create.php', {
    method:'POST',
    body: JSON.stringify(this.refereeForm),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
             }
  })

  .then( response => response.json())
  .then(json => {
  console.log("Returned from post:", json);
  this.referees = json;
  // Clear whenever its submitted -------------
  this.resetRefereeForm();
               
                 });
            },    
// Edit Referee ------------------------------------------------------------------------------------
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
  
    this.referees = json;

    // reset the form
    this.resetRefereeForm();
  });
},
//Delete Referee Record ------------------------------------------------------------------------------------
postDeleteReferee(o) {
if (!confirm("Are you sure you want to delete "+o.firstName+"'s record ?")) {
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
    this.referees = json;

    // reset the form
    this.resetRefereeForm();
  });
},
selectRefereeToEdit(o) {
  this.selectedReferee = o;
  this.refereeForm = Object.assign({}, this.selectedReferee);
},
resetRefereeForm() {
  this.selectedReferee = null;
  this.refereeForm = {};
}
            
 
// Closing Methods ------------------------------------------------------------------------------------
},
// Created ------------------------------------------------------------------------------------
created() {
      this.fetchRefereesData();
  }
}
Vue.createApp(Referee).mount('#refereeApp');
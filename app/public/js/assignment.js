const Referee = {
  data() {
    return {
      "referee":[]
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

created() {
  this.fetchRefereeData();
  }
}

Vue.createApp(Referee).mount('#refereesJS');





    




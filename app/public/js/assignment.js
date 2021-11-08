const Assignment = {
  data() {
    return {
      "assignment":[],
      assignmentForm:{},
      selectedAssignment: null,
    }
  },

  computed: {},
  
  methods: {
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
    this.fetchAssignmentData();
    }
}
Vue.createApp(Assignment).mount('#assignmentJS');





    




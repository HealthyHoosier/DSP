//pull data from REF Table
$.getJSON(refereeTable, function (data) {
            $.each(data, function (index, referee) {
// APPEND OR INSERT DATA TO SELECT ELEMENT.
                $('#sel').append('<option value="' + referee.refereeid + '">' + referee.refereeName + '</option>');
            });
        });

        // SHOW SELECTED VALUE.
 $('#sel').change(function () {
        $('#msg').text('Selected Item: ' + this.options[this.selectedIndex].text);
    });


    




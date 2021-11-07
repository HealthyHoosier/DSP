//pull data from REF Table
$.getJSON(refereeTable, function (data) {
            $.each(data, function (index, referee) {
// APPEND OR INSERT DATA TO SELECT ELEMENT.
                $('#sel').append('<option value="' + referee.refereeid + '">' + referee.refereeName + '</option>');
            });
        });

// POST TO TABLE





    




var $ = window.$ = window.jQuery = require('jquery');
var bootstrapjs = require('bootstrap-sass');
var lunr = require('lunr');

$(document).ready(function () {
    'use strict';

    // Set up search
    var index, store;
    $.getJSON('/lunr.json', function (response) {

        // Create index
        index = lunr.Index.load(response.index);

        // Create store
        store = response.store;

        // Handle search
        $('input#search').on('keyup', function () {
            // Get query
            var query = $(this).val();

            // Search for it
            var result = index.search(query);

            // Output it
            var resultdiv = $('ul.searchresults');
            if (result.length === 0) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                for (var item in result) {
                    var ref = result[item].ref;
                    var searchitem = '<li><a href="' + ref + '">' + store[ref].title + '</a></li>';
                    resultdiv.append(searchitem);
                }
                resultdiv.show();
            }
        });
    });

    // Handle Google search
    $('form#searchForm').on('submit', function (event) {
       // Prevent default behaviour
       event.preventDefault();

       // Get domain and search parameters
       var domain = $('input#sitesearch').val();
       var query = $('input#search').val();

       // Redirect to Google
       var url = 'https://www.google.com/search?sitesearch=' + domain + '&q=' + encodeURIComponent(query);
       window.location.href = url;
    });

});

$(document).ready(function () {
    'use strict';
    
    // Override search to work properly
    $('form#searchForm').on('submit', function (event) {
        // Prevent default behaviour
        event.preventDefault();

        // Get parameters
        var site, search;
        site = $('input#site').val();
        search = $('input#search').val();

        // Load the required page
        window.location = 'http://www.google.com/search?q=' + encodeURIComponent(site + ' ' + search);
    });
    <% if(github) { %>
    // Get GitHub repos
    $.get('https://api.github.com/users/<%= github %>/repos?type=owner', function (response) {
        var repolist = $('ul#github-repos');
        repolist.empty();
        for (var item in response) {
            // If repo is not a fork, display it
            if (!response[item].fork) {
                repolist.append('<li><a href="' + response[item].html_url + '">' + response[item].name + '</a><p>' + response[item].description + '</p></li>');
            }
        }

        // Get owner details from first item
        var profile = response[0].owner;

        // Insert them
        $('section#github-profile').append('<a id="github-image" href="' + profile.html_url + '" target="_blank"><img src="' + profile.avatar_url + '"></img></a>');
    });
    <% } %>
});

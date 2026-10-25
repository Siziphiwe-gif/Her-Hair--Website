// PRODUCT SEARCH FILTER
// Gets the search box from the Products page
let searchBox = document.getElementById("productSearch");

// Gets the message displayed when no wigs match the search
let noResults = document.getElementById("noResults");

// Gets all four wig products
let wigs = document.querySelectorAll(".wig-item");

// Checks if the search box exists on the current page
if (searchBox) {

    // Runs whenever the customer types in the search box
    searchBox.addEventListener("input", function () {

        // Gets the search text and changes it to lowercase
        let searchText = searchBox.value.toLowerCase();

        // Counts how many wigs match the search
        let matchCount = 0;

        // Checks each wig
        wigs.forEach(function (wig) {

            // Gets the wig name and changes it to lowercase
            let wigName = wig.querySelector("h3").textContent.toLowerCase();

           // Shows matching wigs and counts them
            if (wigName.includes(searchText)) {
                 wig.style.display = "";
                    matchCount++;
          } else {
                 wig.style.display = "none";
                }

        });

        // Shows a message if no wigs match the search
        if (matchCount === 0) {
            noResults.style.display = "block";
        } else {
                 noResults.style.display = "none";
        }
    });
}

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

// IMAGE GALLERY LIGHTBOX
// Gets all the wig images
let wigImages = document.querySelectorAll(".wig-image");

// Gets the lightbox and its elements
let lightbox = document.getElementById("lightbox");
let lightboxImage = document.getElementById("lightboxImage");
let closeLightbox = document.getElementById("closeLightbox");

// Checks if the lightbox exists on the current page
if (lightbox) {

    // Opens the lightbox when a wig image is clicked
    wigImages.forEach(function (image) {
        image.addEventListener("click", function () {

            // Displays the selected wig image in the lightbox
            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;

            // Shows the lightbox
            lightbox.style.display = "flex";
        });
    });

    // Closes the lightbox when the X button is clicked
    closeLightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });
}

// DYNAMIC PRODUCT INFORMATION
// Finds the paragraph that will display the selected wig
let selectedProduct = document.getElementById("selectedProduct");

// Checks if we are on the Enquiry page
if (selectedProduct) {

    // Gets the information from the website URL
    let urlParams = new URLSearchParams(window.location.search);

    // Gets the selected wig name from the URL
    let productName = urlParams.get("product");

    // Displays the selected wig name and its price
    if (productName) {
    // Stores the wig names and their prices
    let wigPrices = {
        "Long Black Wig": 1850,
        "Burgundy Wig": 1950,
        "Short Black Bob": 1450,
        "Lace Front Bob": 1650
    };

    // Gets the price of the selected wig
    let price = wigPrices[productName];

    // Displays the wig name and price
    if (price !== undefined) {
        selectedProduct.textContent =
            "You are enquiring about: " + productName +
            " - Price: R" + price.toLocaleString("en-ZA");
    }
}
       
}

// FAQ ACCORDION
// Gets all the FAQ question buttons
let faqQuestions = document.querySelectorAll(".faq-question");

// Checks each FAQ question
faqQuestions.forEach(function (question) {

    // Runs when a customer clicks a question
    question.addEventListener("click", function () {

        // Finds the answer directly after the question
        let answer = question.nextElementSibling;

        // Shows the answer if hidden, or hides it if visible
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }

    });
});

// ENQUIRY FORM - FILTER PRODUCTS AND SERVICES

// Get the two dropdowns
let enquiryType = document.getElementById("enquiry-type");
let productService = document.getElementById("product-service");

// Only run this code on the Enquiry page
if (enquiryType && productService) {

    // Run when the customer changes the enquiry type
    enquiryType.addEventListener("change", function () {

        // Clear the previous product or service selection
        productService.value = "";

        // Check every option in the second dropdown
        Array.from(productService.options).forEach(function (option) {

            // Keep the first "Select a product or service" option visible
            if (option.value === "") {
                option.hidden = false;
            }

            // Show only wig products
            else if (enquiryType.value === "product") {
                option.hidden = ![
                    "long-black-wig",
                    "burgundy-wig",
                    "short-black-bob",
                    "lace-front-bob"
                ].includes(option.value);
            }

            // Show only maintenance services
            else if (enquiryType.value === "maintenance") {
                option.hidden = ![
                    "wig-wash",
                    "wig-styling",
                    "wig-treatment",
                    "wig-revamp"
                ].includes(option.value);
            }

            // Hide all choices if no enquiry type is selected
            else {
                option.hidden = true;
            }
        });
    });

    // Set the correct options when the page first loads
    enquiryType.dispatchEvent(new Event("change"));
}

// ENQUIRY FORM VALIDATION AND PROCESSING

// Find the enquiry form and response paragraph
let enquiryForm = document.getElementById("enquiryForm");
let enquiryResponse = document.getElementById("enquiryResponse");

// Only run this code on the Enquiry page
if (enquiryForm && enquiryResponse) {

    // Run when the customer submits the form
    enquiryForm.addEventListener("submit", function (event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Get the customer's details and selected option
        let customerName = document.getElementById("fullname").value.trim();
        let selectedOption = document.getElementById("product-service");
        let selectedName = selectedOption.options[selectedOption.selectedIndex].text;

        // Prices for wigs and maintenance services
        let prices = {
            "long-black-wig": 1850,
            "burgundy-wig": 1950,
            "short-black-bob": 1450,
            "lace-front-bob": 1650,
            "wig-wash": 250,
            "wig-styling": 200,
            "wig-treatment": 300,
            "wig-revamp": 450
        };

        // Find the price of the selected product or service
        let price = prices[selectedOption.value];

        // Display a response to the customer
        enquiryResponse.textContent =
            "Thank you, " + customerName +
            "! Your enquiry about " + selectedName +
            " has been prepared. Estimated price: R" +
            price.toLocaleString("en-ZA") +
            ". Please contact Her Hair to confirm availability.";
    });
}

var bookMarkesList = [];
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var SubmitBTN = document.getElementById("Submit");
var inputs = document.getElementsByClassName("form-control");
if (JSON.parse(localStorage.getItem("Sites"))) {
    bookMarkesList = JSON.parse(localStorage.getItem("Sites"));
    displaySite();
}

SubmitBTN.onclick = function() {
    var URLExpression = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    var URLRegex = new RegExp(URLExpression);
    if (siteName.value == "") {
        document.getElementById("nameError").classList.remove("d-none");
    }
    if (siteUrl.value == "") {
        document.getElementById("urlError").classList.remove("d-none");
        document.getElementById("urlError").innerHTML = "Url Field is required";
    }
    if (siteName.value != "" && siteUrl.value != "") {
        if (siteUrl.value.match(URLRegex)) {
            document.getElementById("nameError").classList.add("d-none");
            document.getElementById("urlError").classList.add("d-none");
            addSite();
            displaySite();
            resetInputs();
        } else {
            document.getElementById("urlError").classList.remove("d-none");
            document.getElementById("urlError").innerHTML = "Please enter a valid url ex: www.name.com";
        }
    }
};

function addSite() {
    var Site = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    bookMarkesList.push(Site);
    localStorage.setItem("Sites", JSON.stringify(bookMarkesList));
}

function displaySite() {
    var sites = "";
    for (let i = 0; i < bookMarkesList.length; i++) {
        sites += `
        <div class="row mt-3 mb-3 mr-3 ml-3 site">
            <h2 class="ml-2 mr-5 w-25">${bookMarkesList[i].siteName}</h2>
            <a class="btn btn-primary pt-2 pb-2 pr-3 pl-3 ml-2 mr-2" href="https://${bookMarkesList[i].siteUrl}" target="_blank">visit</a>
            <button onclick=(deleteSite(${i})) class="btn btn-danger pt-2 pb-2 pr-3 pl-3 ml-2 mr-2">Delete</button>
        </div>
        `;
    }
    document.getElementById("sitesList").innerHTML = sites;
    if (JSON.parse(localStorage.getItem("Sites"))) {
        document.getElementById("sitesContainer").classList.remove("d-none");
    } else {
        document.getElementById("sitesContainer").classList.add("d-none");
    }
}

function deleteSite(index) {
    bookMarkesList.splice(index, 1);
    displaySite();
    localStorage.setItem("Sites", JSON.stringify(bookMarkesList));
}

function resetInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
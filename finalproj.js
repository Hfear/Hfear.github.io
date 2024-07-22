
//so what im doing is 
//getting the comprehensive group json of birds
//then going one by one thru each assesment id 
//of that array
//doing a GET assesment by id and then going thru the 
//assesment and filtering for certain variables that 
//i want to save and pass to a display function

//I HATE CORS!!!!!!!!!!!!! MY REQUESTS WORKED AND THEN THEY DIDNT IM USING JSON TO REPRESENT THE API SO I DONT FAIL


//initalizing my arrays
var ALLbirdIds = [];
var allbirds = [];
var highRisk = [];
var chilling = [];




//GET function for all bird ids
// https://api.iucnredlist.org/api/v4/comprehensive_groups/birds
async function GetAllBirds() {
    let url = './finalprojBirdsBackup.json'; 
    
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`ERROR: ${response.statusText}`);
        }

        const data = await response.json();

        const assessments = data.assessments;

        if (Array.isArray(assessments)) {

            // taking ids from the assessments part og the arry 
            ALLbirdIds = assessments.map(assessment => assessment.assessment_id);

            //console.log('All Bird IDs:', ALLbirdIds);

        } else {
            throw new Error('Assessments is not an array or is missing.');
        }
    
    } catch (error) 
    { // gets error from else n dispkays in console
        console.error(error);
    }
}

//tESTING ITTTTTT
//GetAllBirds();

//making the function that would act as my api call to show
//how it would work just with a call to the api per code needed 
//api.iucnredlist.org/api/v4/assessment/{assesmentcode}

async function createBirdObject(assessmentId) {

    const url = `./birdassmentbackup.json`; 

    try {
        const response = await fetch(url, 
        {
            method: 'GET'
        });
        if (!response.ok) 
        {
            throw new Error(`ERROR: ${response.statusText}`);
        }

        const data = await response.json();

        // get bird object w assessment id
        data.BirdAssessments.forEach(bird => {
            if (bird.assessment_id === assessmentId) 
            {
                foundBird = bird;
            }
        });

        //console.log(foundBird);
        return foundBird;

    } catch (error) {
        console.error(error);
    }
}
//testing id function 
//createBirdObject(118650472);

//filter function for birds that are extinct
// https://api.iucnredlist.org/api/v4/assessment/{ASSESMENT ID}


//displays all birds from database in home pg
async function ShowAll()
{
    document.getElementById("mainpage").removeAttribute("hidden");
    //setting back to front page
    if(frontpg = 1)
    {
        frontpg = 0; 
        document.getElementById("mainpage").style.display = "block";
    }

    for (var id of ALLbirdIds) 
        {
            var bird = await createBirdObject(id);
            allbirds.push(bird);
    }

    displayBirds(allbirds)
}

async function Gethighrisk()
{
    hideFrontPage()

    //go thru all objects in bird array and get back the asessment using the 
    //assesment id and check 

  for (const id of ALLbirdIds) {

    var bird = await createBirdObject(id);

    if (

        (bird.population_trend && bird.population_trend.description.en === `Rapid Declines` )
        ||
        (bird.red_list_category && bird.red_list_category.description.en === `Critically Endangered`)
    ) 
    {
        highRisk.push(bird);
    }
}

  //call display bird function and pass in bird id

  //change display style to red 

  displayBirds(highRisk);

};

//filter funct for birds that r chilling
async function Getchilling()
{
  hideFrontPage();

//go thru bird list by assesment id
//have cases for NULL
//check "population_trend" en: Stable
//check  "red_list_category"  "en": "Least Concern"

    for (const id of ALLbirdIds) {

        var bird = await createBirdObject(id);

        if (
            (bird.population_trend && bird.population_trend.description.en === 'Stable') &&
            (bird.red_list_category && bird.red_list_category.description.en === 'Least Concern')) {
            chilling.push(bird);
        }
    }

//call display bird function and pass in bird object

// change page style to green 

displayBirds(chilling);

};

//random bird function 
async function randomBird( )
{

    //random function that gets a number out of the length of all birds
    var randbirdnum = Math.floor(Math.random() * ALLbirdIds.length);

    //gets id from random index of bird id aray
    //sends it to the assesment function to create a single brid object
    //sends that object to single display function

    var randbird = await createBirdObject(ALLbirdIds[randbirdnum])

    while (randbird == 1)
    {
        //return 1 means bird not found so REROLLL
        randbirdnum = Math.floor(Math.random() * ALLbirdIds.length);
        var randbird = await createBirdObject(ALLbirdIds[randbirdnum])

    }

    DisplaySingleBird(randbird);

};

// display bird info
function displayBirds(birds) 
{

        //getting element for grid
        var birdList = document.getElementById("birdList");

        birdList.innerHTML = ` `;

        //make elements and add to grid of facts
            for( var bird of birds)
                {
                    //console.log(bird);
                var title = bird.taxon.common_names[0].name
                    //add row w two cols

                    var newrow = document.createElement('div');

                    newrow.innerHTML = (` 
                        <div class="card" id = "birdcard" style="width: 18rem;">
                        
                        <a onclick = DisplaySingleBird(bird)>

                        <div class="card-header">
                        ${title}
                        </div>

                        <ul class="list-group list-group-flush">
                           
                            <li class="list-group-item">
                            <strong>Bird ID:</strong> ${bird.assessment_id}
                            </li>
                            
                            <li class="list-group-item">
                            <strong>Scientific Name:</strong> ${bird.taxon.scientific_name}
                            </li>
                           
                            <li class="list-group-item">
                            <strong>Common Names:</strong> ${bird.taxon.common_names.map(name => name.name).join(', ')}
                            </li>
                           
                            <li class="list-group-item">
                            <strong>Status:</strong> ${bird.red_list_category.description.en }
                            </li>
                        
                            </ul>

                            </a>
                        </div>

                        `);
        
                     newrow.className = "row p-4 my-3 ";

                     //adding onclick function to the cards
                     newrow.onclick = function() {
                        DisplaySingleBird(bird);
                    };

                    birdList.append(newrow);
        
                }
}


function DisplaySingleBird(bird)
{
    hideFrontPage()
    //console.log(bird);

    //first common name for the card
    var title = bird.taxon.common_names[0].name
       //getting element for grid
       var birdList = document.getElementById("birdList");
    birdList.innerHTML= '';
       //make elements and add to grid of facts
     
                   //add row w two cols
                   var newrow = document.createElement('div');
                   newrow.innerHTML = (` 
                       <div class="card" style="width: 100%; max-width: 800px;">

            <div class="card-header">
                <h5>${title}</h5>
                <small><a href="${bird.url}" target="_blank">IUCN Red List Link</a></small>
            </div>
            <div class="card-body">
                <h5>General Information</h5>
                <p><strong>
                Bird ID:</strong> ${bird.assessment_id}</p>
                <p><strong>Scientific Name:</strong> ${bird.taxon.scientific_name}</p>
                <p><strong>Common Names:</strong> ${bird.taxon.common_names.map(name => name.name).join(', ')}</p>
                <p><strong>Status:</strong> ${bird.red_list_category.description.en }</p>

                <h6>Taxonomy</h6>
                <p><strong>Kingdom:</strong> ${bird.taxon.kingdom_name}</p>
                <p><strong>Phylum:</strong> ${bird.taxon.phylum_name}</p>
                <p><strong>Class:</strong> ${bird.taxon.class_name}</p>
                <p><strong>Order:</strong> ${bird.taxon.order_name}</p>
                <p><strong>Family:</strong> ${bird.taxon.family_name}</p>
                <p><strong>Genus:</strong> ${bird.taxon.genus_name}</p>
                <p><strong>Species:</strong> ${bird.taxon.species_name}</p>

                <h6> Conservation Status </h6>
                <p><strong>Assessment Date:</strong> ${bird.assessment_date || 'N/A'}</p>
                <p><strong>Population Trend:</strong> ${bird.population_trend?.description.en || 'N/A'}</p>
                <p><strong>Supplementary Info:</strong> ${bird.supplementary_info.population_size || 'N/A'}</p>

                <h6>Documentation</h6>
                <p><strong>Range:</strong> ${bird.documentation.range || 'N/A'} </p>
                <p><strong>Population:</strong> ${bird.documentation.population || 'N/A'} </p>
                <p><strong>Habitats:</strong>  ${bird.documentation.habitats || 'N/A'} </p>
                <p><strong>Threats:</strong>  ${bird.documentation.threats || 'N/A'}</p>
                <p><strong>Conservation Actions :</strong> ${bird.documentation.measures || 'N/A'} </p>
                <p><strong>Use & Trade:</strong>  ${bird.documentation.use_trade || 'N/A'}</p>
                <p><strong>Rationale:</strong> ${bird.documentation.rationale || 'N/A'} </p>
                <p><strong>Trend Justification:</strong> ${bird.documentation.trend_justification || 'N/A'}</p>
                <p><strong>Taxonomic Notes:</strong> ${bird.documentation.taxonomic_notes || 'N/A'}</p>

                <h5>Additional Information</h5>
                <p><strong>Biogeographical Realms:</strong> ${bird.biogeographical_realms.map(realm => realm.description.en).join(', ') || 'N/A'}</p>
            </div>
        </div>
        `);
       
            newrow.className = "row p-3 my-3 ";
       
            birdList.append(newrow);
       
               
}

function hideFrontPage()
{
    frontpg = 1; 
    document.getElementById("mainpage").setAttribute("hidden", "");
}


    GetAllBirds().then(() => {
       ShowAll();
    });
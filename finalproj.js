
//so what im doing is 
//getting the comprehensive group json of birds
//then going one by one thru each assesment id 
//of that array
//doing a GET assesment by id and then going thru the 
//assesment and filtering for certain variables that 
//i want to save and pass to a display function

var ALLbirdIds = [];



//GET function for all bird ids
// https://api.iucnredlist.org/api/v4/comprehensive_groups/birds
async function GetAllBirds()
{
    let url = 'https://api.iucnredlist.org/api/v4/comprehensive_groups/birds';
    
    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer MuBZRdQNvyT33yyh6yXi9HSbnS2j4qwFMzGD`
            }
        });

        if (!response.ok) {
            throw new Error(`ERROR: ${response.statusText}`);
        }

        const birdlist = await response.json();

        // go through list and get all of the ids of all birds and add it to our array 
        birdlist.content.forEach(content => 
        {
         ALLbirdIds.push(content.assessment_id) ;
        });

        console.log(ALLbirdIds);
    
    
    } catch (error) {

        console.error(error);

        return;
    }
};

//filter function for birds that are extinct
// https://api.iucnredlist.org/api/v4/assessment/{ASSESMENT ID}

function Getextinct()
{

    //go thru all objects in bird array and get back the asessment using the 
    //assesment id and check 
   //"possibly_extinct": true,
  //"possibly_extinct_in_the_wild": true,


  //call display bird function and pass in bird id

};

//filter funct for birds that r chilling
function Getchilling()
{

//go thru bird list by assesment id
//have cases for NULL
//check "population_trend" en: Stable
//check  "red_list_category"  "en": "Least Concern"

//call display bird function and pass in bird object

};

//random bird function 
function randomBird( bird)
{

    //make html format to display information retreived form bird object/id

    // "identification_information"
    // display all "documentation":  array 

};
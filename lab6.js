   //ignore just so i can go back and read stuff 
   //https://www.w3schools.com/js/js_array_sort.asp
   //https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
   //https://www.w3schools.com/jsref/met_node_appendchild.asp
   //https://developer.mozilla.org/en-US/docs/Web/API/Element/append 
   
   //make an array to hold json facts
    var facts = [];  
    var catPic = "";


//get from json file and parse object
async function Getcatfacts(){

    //goes into my local file and jets the json information
    //these are where the promises come and wait for the json to send
    await fetch('./lab6cats.json')

    //when u get the response and parse it automatically 
    .then((response) => response.json())

    //now what to do w json response
    .then((json) =>{

     console.log(json);
    
     //fact array in list from json
     facts = json.facts; 
     catPic = json.catPhoto;


     //sorting the facts based on id
     facts = facts.sort(function(a, b){return a.factId - b.factId});

    //console.log("show facts" , facts);

    });

    Postcatfacts();

};

//format and make html objects to add to grid

function Postcatfacts(){

    //set image to cat pic
    var catimage = document.getElementById("catpic");
    catimage.src = catPic;

    //getting element for grid
    var factchart = document.getElementById("factchart");

//make elements and add to grid of facts
    for( var fact of facts)
        {
            //console.log(fact);

            //make and append html element
            //add row w two cols
            var newrow = document.createElement('div');
            newrow.innerHTML = (` 
            <div class="column"> ${fact.factId}</div>
            <div class="column"> ${fact.text}</div>
                `);

             newrow.className = "row row-cols-2";

            factchart.append(newrow);

        }
}
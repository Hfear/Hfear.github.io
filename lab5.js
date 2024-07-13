

//class for the form 
var formAnswers ={
firstname :"",
lastname : "",
email: "",
password : "",
dob : ""
};


function submitform(){

    //getting form info from id 
    var form = document.getElementById("myform")
    
    //storing and formatting it into the class 
    formAnswers = {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        email: form.email.value,
        password: form.pass.value,
        dob: form.dob.value
    };


console.log(formAnswers);

    if(!validateform()) //not validated
        {
            //document.write(`bad form`);
            
        }
        else
        {
            showform(); 
        }

        
    
    }

    //check if all feilds are valid and match what we need,
    // if not error and return 
function validateform(){
    
    var error = "";
    
    // all fields are present
    //getting the object of formanswers and using for each method
    Object.values(formAnswers).forEach(val => {
        
        if (val === "")
            {
                error = "You havent filled evrything out";
            }   
        } );
        
        //password has special character ! or ?
        if(!formAnswers.password.includes('!') && !formAnswers.password.includes('?'))
            {
    error = "password needs special character";
}

if(error === "")
    {
        return true ;
    }
    else
    {
        alert(error);
        return false; 
    }
    
}

function showform(){

    //hide password
    var hiddenpass = "";
    
    for(var i = 0 ; i < formAnswers.password.length ; i++)
        { 
            hiddenpass +="*"; 
        }
        
        document.getElementById("displaypg").innerHTML = 
        `      
        
        <div class = "mx-auto p-3">
        
        <figure class="text-center">
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <h1 class="display-4">THANKS FOR THE INFO </h1>
        <p class="lead"> You will recive notice in 6-12 business months </p>
        </div>
        </div>
        </figure>
        
        
        <div mx-auto p-3>
        <h3>Sucessful Submitted Form :</h3>
        <p><strong>First:</strong> ${formAnswers.firstname}</p>
        <p><strong>Last:</strong> ${formAnswers.lastname}</p>
        <p><strong>Email:</strong> ${formAnswers.email}</p>
        <p><strong>Password:</strong> ${hiddenpass}</p>
        <p><strong>Date of Birth:</strong> ${formAnswers.dob}</p>
        </div>
        
        <div>
        `;

        
        //function for taking in the form and posting the data after submitted 
        // function submitform(event){
        
        //     // this prevents the page from being immediatley reloaded which makes the form dissapear ;(
        //     event.preventDefault();
        
        //     //getting form info from id 
        //     var form = document.getElementById("regform")
            
        //     //storing and formatting it into the class 
        //     formAnswers = {
        //         firstname: form.firstname.value,
        //         lastname: form.lastname.value,
        //         email: form.email.value,
        //         password: form.password.value,
        //         dob: form.dob.value
        //     };
        
        
    }
// Make adjustements to the console output

var console_old = console.log; // Reference to old console.log function.
summary_data ='\n';
console.log=function(message)
{
   summary_data+=message+'\n';
}

const model =tf.sequential();
model.add(tf.layers.dense({units:1,inputShape:[1]}));
model.compile({loss:'meanSquaredError',optimizer:'sgd'});
model.summary();

var sum_div=document.getElementById('summary');
sum_div.innerText=summary_data;


// Defining the x and y variables.
var xVals=[]
var yVals=[]
var isLoaded=false;
var trainStatus=false;
function computeY()
{
    isLoaded=true;
    trainStatus=false;
    yVals=[];
    var xInput=document.getElementById("xValBox").value;
    xVals=xInput.split(',').map(Number);
    for(var i=0;i<xVals.length;i++)
    {
        y=(2*xVals[i])-1;
        console_old(y);
        yVals.push(y);
    }
    console_old(yVals);
    updateList(yVals);

}

function updateList(yVals)
{
    var ul_heading=document.getElementById('yValListHeading');
    ul_heading.style.visibility='visible';
    var ul=document.getElementById('yValList');
    
    while(ul.firstChild)
    {
        ul.removeChild(ul.lastChild);
    }

    for(var i=0;i,yVals.length;i++)
    {
        var li=document.createElement('li');
        li.appendChild(document.createTextNode(yVals[i].toString()));
        ul.appendChild(li);
        
    }
    console_old(ul.innerHtml);
}

function StartTraining()
{
    if(isLoaded)
    {
        var predBox=document.getElementById('predBox');
        
        try
        {
            const xs=tf.tensor2d(xVals,[xVals.length,1]);
            const ys=tf.tensor2d(yVals,[yVals.length,1]); 
            predVals=predBox.value.split(',').map(Number); 
            if(predBox.value===undefined||predBox.value=='')
            {
                predVals=[10];
            }
            if(!trainStatus)
            {
                doTraining(xs,ys).then(()=>alert(model.predict(tf.tensor2d(predVals,[predVals.length,1])))); 
            }
            else
            {
                alert(model.predict(tf.tensor2d(predVals,[predVals.length,1])));
            }

              
        }
        catch(ex)
        {
            alert(ex.message);
        }
        
        
    }
    else
    {
        alert("Please add data before proceeding!");
    }
}

async function doTraining(xs,ys)
{
    summary_data='\n';
    trainStatus=true;
    const history= await model.fit(xs,ys,{epochs:500,
        callbacks:{
            onEpochEnd:async(epoch,logs)=>{
                console.log("\nEpoch: "+epoch+"   Loss: "+logs.loss);
                document.getElementById('progress').innerText=summary_data;
                                        }
                }
            });
}

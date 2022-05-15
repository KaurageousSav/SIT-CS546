const questionOne = function questionOne(arr) { 
    var i;
    var l;
    var y;
    obj={};
    
    if(arr==null)
    {
        return obj;
    }
    if(arr.length<1)
    {
        return obj;
    }
    else{
    for(i=0; i<arr.length; i++)
    {
        l=Math.abs(Math.pow(arr[i],2) - 7);
        flag=0;
        for(y=1; y<=l; y++)
        {
            if(l%y==0)
            {
                flag= flag+1;
            }

        }
        if(flag==2)
        {
            obj[l]=true
        }
        else{
            obj[l]=false;
        }
    }
    
    return obj;
}
// Implement question 1 here
}



 const questionTwo = function questionTwo(arr) { 
    sample_arr = [];
    arr1 = arr;
    var i;
    var y;
    var flag;
    if(arr.length < 1)
    {
        sample_arr = arr;
        return sample_arr;
    }
    else {
        for(i=0; i<arr.length; i++)
        {
            flag=0;
            for(y = 0; y<i; y++)
            {
                if(arr[i] === arr[y]){
                    flag= flag+1;
                }
            }    
            if(flag==0)
            {
                sample_arr[sample_arr.length] = arr[i];
            }          
        }
        return sample_arr;
    }

    // Implement question 2 here
}




const questionThree = function questionThree(arr) {
    sample_arrq3 = [];
    obj={};
    arr3 = arr;
    arr4 = [];
    var i;
    var y;
    var flag;
    if(arr.length < 1)
    {
        sample_arrq3 = arr;
        return obj;
    }
    else {
        for(i=0; i<arr.length; i++)
        {
            flag=0;
            for(y = 0; y<i; y++)
            {
                if(arr[i] === arr[y]){
                flag= flag+1;
                }
            }    
            if(flag==0)
            {
                sample_arrq3[sample_arrq3.length] = arr[i];
            }
        } 
        arr3= Array.from(sample_arrq3);

        for(i=0; i<sample_arrq3.length; i++)
        {
            sample_arrq3[i] = sample_arrq3[i].split("").sort().join("");
        }
        for(i=0; i<sample_arrq3.length; i++)
        {
            flag=0;
            for(y = 0; y<i; y++)
            {
                if(sample_arrq3[i] === sample_arrq3[y]){
                flag= flag+1;
                }
            }    
            if(flag==1)
            {
                arr4[arr4.length] = sample_arrq3[i];
            }
        }
        for(i=0; i<arr4.length; i++)
        {
            obj[arr4[i]] = [];
            for(y=0; y<sample_arrq3.length; y++)
            {
                if(sample_arrq3[y]==arr4[i])
                {
                    obj[arr4[i]][obj[arr4[i]].length] = arr3[y];
                }
            }
        
        }
        return obj;
    }
    // Implement question 3 here
}




const questionFour = function questionFour(num1, num2, num3) {
    var result_a=1;
    var result_b=1;
    var result_c=1;
    var sum;
    var output;
    var average = (num1 + num2 + num3);
    average= average/3;
    if (num1==0)
    {
        result_a=0;
    }
    else{
        for(x=1;x<=num1;x++)
    {
        result_a=x*result_a;
    }
    }
    if (num2==0)
    {
        result_b=0;
    }
    else
    {
        for(y=1;y<=num2;y++)
    {
        result_b = y*result_b;
    }
    }
    if(num3==0)
    {
        result_c=0;
    }
    else
    {
        for(z=1;z<=num3;z++)
    {
        result_c=z*result_c;
    }

    }
    
    sum = result_a + result_b + result_c;
    
    output = Math.floor(sum/average);

    return output;

    //// Implement question 4 here
}

module.exports = {
    firstName: "SAVLEEN", 
    lastName: "KAUR", 
    studentId: "10476867",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
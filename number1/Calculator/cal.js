let buttons  =document.querySelectorAll(".inp");
let display = document.querySelector(".display");

buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        const tot =  ['+','-','/','*','%','^'];
        

        if(display.value === "Error")
        {
            display.value = "";
        }
        //solve initial operator
        if(display.value=="")
        {
            if(tot.includes(btn.textContent)&&btn.textContent!='-')
            {
                return;
            }
        }
        //frendly starter from .
        if(btn.textContent==='.')
        {
            let n=display.value.length;
            if(display.value===""||tot.includes(display.value.slice(n-1,n)))
            {
                display.value = display.value + "0.";
                return;
            }
        }
        //solve double operator
        if(tot.includes(btn.textContent))
        {
            let l=display.value.length;
            let val = display.value.slice(-1);
            if(tot.includes(val))
            {
                display.value = display.value.slice(0,l-1) + btn.textContent;
                return;
            }
        }
        //Dot solve
        if(btn.textContent === '.')
        {
            let val = display.value;
            let n = val.length;
            let k=0;
            for(let i=n-1;i>=0;i--)
            {
                let v = val.charAt(i);
                if(tot.includes(v))
                {
                    k=i;
                    break;
                }
                if(v==='.')return;
            }
            if(k==0)
            {
                display.value += '.';
                return;
            }
            let sb = val.substring(k+1,n);
            for(let i=sb.length-1;i>=0;i--)
            {
                if(sb.charAt(i)==='.')return;
            }
        }
        //delete all
        if(btn.textContent.trim() === "AC")
        {
            display.value = "";
            return;
        }
        //delete one
        if(btn.textContent.trim()==="Del")
        {
            let l = display.value.length;
            display.value = display.value.slice(0,l-1);
            return;
        }

        //"=" management
        if(btn.textContent.trim() === "=")
        {
            //avoid infinite
            let div = display.value;
            let n = display.value.length;
            //check last one is an operator or not
            let val1 = display.value.slice(-1);
    
            if(tot.includes(val1))
            {
                display.value = display.value.slice(0,n-1);
            }
            
            
            for(let i=n-1;i>=0;i--)
            {
                if(div.charAt(i)==='/')
                {
                    for(let j=i+1;j<n;j++)
                    {
                        if(tot.includes(div.charAt(j)))
                        {
                            let s = Number(div.substring(i+1,j));
                            if(s==0)
                            {
                                display.value="Error";
                                return;
                            }
                        }
                        if(j+1>=n)
                        {
                            let s = Number(div.substring(i+1,n));
                            if(s==0)
                            {
                                display.value="Error";
                                return;
                            }      
                        }
                    }
                }
            }
            // let res = eval(div);
            // if(!isFinite(res))
            // {
            //     display.value = 'Error';  but problem at starting(click =).
            //     return;
            // }

            //to convert "^" -> power
            let val = display.value;
            if(display.value === "")return;
            
            val = val.split("^").join("**");
            //val.replaceAll also works.
            try{
                display.value = eval(val);
                return;
            }
            catch{
                console.log("Error");
                display.value = "Error";
                return;
            }
        }
        display.value += btn.textContent;
    });
});

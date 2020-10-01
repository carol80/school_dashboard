

function addtoCart(product_name,product_price,no_quantity){
    // alert(product_name+" was added to cart!");
    // console.log(product_name,product_price)


    var old_products=localStorage.getItem("all_products");
    var old_products_price=localStorage.getItem("all_products_price");
    var quantity=localStorage.getItem("quantity");




    if (old_products!=null || old_products!=undefined ){
        
        var my_products=JSON.parse(old_products);
        var my_products_price=JSON.parse(old_products_price);
        var quantity=JSON.parse(quantity);
        if(!my_products.includes(product_name)){
            my_products.push(product_name);
            my_products_price.push(product_price);
            quantity.push(no_quantity);
            localStorage.setItem("all_products",JSON.stringify(my_products));
            localStorage.setItem("all_products_price",JSON.stringify(my_products_price));
            localStorage.setItem("quantity",JSON.stringify(quantity));
            alert(product_name+" was added to your cart.");
            console.log(quantity)
        }
        else{
            alert("Item already exists in your cart.");
        }
    }
    else{
        
        var my_products=[];
        var my_products_price=[];
        var quantity=[]
        my_products.push(product_name);
        my_products_price.push(product_price);
        quantity.push(no_quantity);
        localStorage.setItem("all_products", JSON.stringify(my_products));
        localStorage.setItem("all_products_price", JSON.stringify(my_products_price));
        localStorage.setItem("quantity", JSON.stringify(quantity));
        alert(product_name+" was added to your cart.");
        console.log(quantity)
    }


}




   
// var flag=0;

function showData(){

    var all_products = JSON.parse(localStorage.getItem("all_products"));
    var all_products_price= JSON.parse(localStorage.getItem("all_products_price"));
    var total_price=0;
    var quantity=JSON.parse(localStorage.getItem("quantity"));
    if (all_products!=null || all_products!=undefined){
        for(i=0;i<all_products.length;i++){
            var table_body=document.getElementById("tablebody");
            var row = document.createElement("tr");
    
            // var cell0 = document.createElement("td");
            // text = document.createTextNode("Product Info : ");
            // // console.log(text)
            // cell0.appendChild(text);

            var cell_image = document.createElement("td");
            var image = document.createTextNode(i+1);
            // image.src=image_url_array[i];
            // image.height=50;
            // console.log(text)
            cell_image.appendChild(image);

            var cell1 = document.createElement("td");
            text = document.createTextNode(all_products[i]);
            // console.log(text)
            cell1.appendChild(text);
    
            var cell2 = document.createElement("td");
            text = document.createTextNode(all_products_price[i]);
            cell2.appendChild(text);
    
            var cell3 = document.createElement("td");
            var plus=document.createElement("button");
            plus.innerHTML="+"
            plus.style.width="20px";
            plus.addEventListener('click',function(){
                // var quantity_value=this.parentElement.childNodes[1];
                var quantity_value_plus=Number(this.parentElement.childNodes[1].nodeValue);
                quantity_value_plus=quantity_value_plus+1
                this.parentElement.childNodes[1].nodeValue=quantity_value_plus;
                // quantity[i]=quantity_value_plus;
                index=Number(this.parentElement.parentElement.childNodes[0].innerHTML)-1;
                quantity[index]=quantity[index]+1
                localStorage.setItem("quantity", JSON.stringify(quantity));
                var total_value_plus=this.parentElement.parentElement.childNodes[2].innerHTML;
                total_value_plus=total_value_plus*quantity_value_plus;
                this.parentElement.parentElement.childNodes[4].innerHTML=total_value_plus;
                // window.flag=1;
                // console.log(flag);
            })
            // plus.setAttribute("onclick", "clickPlus(#)");
            var minus=document.createElement("button");
            minus.innerHTML="-"
            minus.style.width="20px";
            minus.addEventListener('click',function(){
                // var quantity_value=this.parentElement.childNodes[1];
                var quantity_value_minus=Number(this.parentElement.childNodes[1].nodeValue);
                if(quantity_value_minus>0){
                    quantity_value_minus=quantity_value_minus-1;
                    this.parentElement.childNodes[1].nodeValue=quantity_value_minus;
                    // quantity[i]=quantity_value_minus;
                    index=Number(this.parentElement.parentElement.childNodes[0].innerHTML)-1;
                    quantity[index]=quantity[index]-1;
                    localStorage.setItem("quantity", JSON.stringify(quantity));
                    console.log(quantity);
                    var total_value_minus=this.parentElement.parentElement.childNodes[2].innerHTML;
                    console.log(total_value_minus);
                    total_value_minus=total_value_minus*quantity_value_minus;
                    this.parentElement.parentElement.childNodes[4].innerHTML=total_value_minus;
                    flag=1
                }
            })
            var curr_quantity= quantity[i] ;
            text = document.createTextNode(curr_quantity);
            text.width="10px";
            cell3.appendChild(plus);
            cell3.appendChild(text);
            cell3.appendChild(minus);
    
            // if (flag==0){
                // console.log(flag);
            var cell4 = document.createElement("td");
            var total=all_products_price[i]*quantity[i]
            text = document.createTextNode(total);
            cell4.appendChild(text);
            // }
    
            var cancel = document.createElement("td");
            var my_button = document.createElement("button");
            my_button.innerHTML="Delete";
            my_button.className="btn btn-success";
            my_button.style.width="100px";
            cancel.appendChild(my_button);
            cancel.addEventListener("click", function(){
            var delete_product_name=this.parentElement.childNodes[1].innerHTML;
            var delete_product_price=this.parentElement.childNodes[2].innerHTML;
            all_products.splice(all_products.indexOf(delete_product_name),1);
            // console.log(all_products_price.indexOf(Number(delete_product_price)))
            all_products_price.splice(all_products_price.indexOf(Number(delete_product_price)),1);
            console.log(all_products_price);

            // console.log(image_url_array);

            var parent_of_tr=cancel.parentNode.parentNode;
            console.log(parent_of_tr);
            var tr =cancel.parentNode;
            console.log(tr);
            // parent_of_tr.removeChild(tr);

            localStorage.setItem("all_products", JSON.stringify(all_products));
            localStorage.setItem("all_products_price", JSON.stringify(all_products_price));
            location.reload();
            
            });
            
            total_price=total_price+Number(cell4.innerHTML);
            console.log(total_price);

            // row.appendChild(cell0);
            row.appendChild(cell_image);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cancel);


    
            // window.onload()
            table_body.appendChild(row);
        }
    
        // total_price=JSON.parse(localStorage.getItem("all_products_price"));
        // console.log(total_price);
    
    
        function getSum(total, num) {
            return total + Math.round(num);
          }
          
        // document.getElementById("total").innerHTML = "Rs. "+total_price;
        // document.getElementById("final_total").innerHTML = "Rs. "+(total_price+30);
        localStorage.setItem("total_price",total_price);
    }
}

function clearLocalStorage(){
    localStorage.clear();
}

function increase(){
    console.log("Clicked")
}

// function clickPlus(){
//     console.log("Clicked")
// }
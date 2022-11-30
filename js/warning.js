// 更改指示灯状态信息的js代码
$(function(){
    const $status = $('.status-light')
    const $btn = $('button#status-test')
    const $text = $(".status-text")

    // $btn.click(function(){
    //     flag = 
    // })
       let flag = true;
       $btn.click(function(){
           if(flag===true){
               $status.toggleClass("green"); //清除green
               $text.text("出现异常"); //更改文本

               t = setInterval(function(){
                   $status.toggleClass("red");  //连续关闭、开启
               }, 200);
               $status.addClass("red")
               flag = false 
           }else if(flag == false){
                //更改颜色    
                $status.addClass("green");
                $status.removeClass("red")
                
                $text.text("一切正常"); //更改文本
                clearInterval(t);  
                flag=true
           }
       });

   }
   
)
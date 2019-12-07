$('#amendPass').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(data){
            location.href="/admin/login.html"
        }
    })
    
    //阻止表单默认提交
    return false;
})
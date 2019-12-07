$('#classify').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(data){
            location.reload()
        }
    })
    //禁止表单的默认提交
    return false 
});
$.ajax({
    type:'get',
    url:'/categories',
    success:function(data){
        // console.log(data);
        let html = template('tpl-class',{data});
        $('#classTbody').html(html)
    }
});
$('#classTbody').on('click','.redact',function(){
    // console.log($(this).attr('data-id'));
    let id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/' + id,
        success:function(data){
            let html = template('tpl-redact',data)
            $('#modifyBox').html(html)
        }
    })    
});
$('#modifyBox').on('submit','#classify',function(){
    //获取用户输入的表单内容
    let formData = $(this).serialize(); //注意要先获取表单内容

    let id = $(this).attr('data-id')

    $.ajax({
        type:'put',
        url:'/categories/' + id,
        data:formData,
        success:function(data){
            location.reload()
        }
    })
    return false;
});
$('#classTbody').on('click','.delete',function(){

    let id = $(this).siblings('.redact').attr('data-id');
    if(confirm('确认要删除这个分类吗？')) {
        $.ajax({
            type:'delete',
            url:'/categories/' + id,
            success:function(data){
                location.reload()
            }
        })
    }   
});

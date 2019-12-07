$('#formBox').on('change','#image',function(){
    let formData = new FormData();

    formData.append('image', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (data) {
            console.log(data);
            
            //储存页面地址
            $('#hiddenFile').val(data[0].image)
        }
    })
});
$('#formBox').on('submit','#slideForm',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(data){
            location.reload()
        }
    })

    return false;
})
$.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
        let html = template('tpl-slide',{data})
        $('#slideTbody').html(html)       
    }
})
$('#slideTbody').on('click','.delete',function(){
    let id = $(this).attr('data-id')
    if(confirm('确定要删除吗？')){
        $.ajax({
            type:'delete',
            url:'/slides/' + id,
            success:function(data){
                location.reload()
            }
        })
    }
})

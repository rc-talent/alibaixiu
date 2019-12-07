function serializeobj(form) {
    let result = form.serializeArray();
    let obj = {};
    result.forEach(item => {
        obj[item.name] = item.value
    });
    return obj;
};
$('#userForm').on('submit', function () {
    let obj = serializeobj($(this));
    $.ajax({
        url: '/users',
        type: 'post',
        data: obj,
        success: function (data) {
            location.reload()
        },
        error: function (data) {
            alert('用户添加失败')
        }
    });
    return false;
});
$.ajax({
    type: 'get',
    url: '/users',
    success: function (data) {
        let html = template('tplUser', { user: data });
        $('#userTbody').html(html);
    }
});
$('#modifyBox').on('change', '#avatar', function () {
    let formData = new FormData();

    formData.append('avatar', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (data) {

            //将图片渲染到页面中
            $('#preview').attr('src', data[0].avatar);
            //储存页面地址
            $('#hiddenAvatar').val(data[0].avatar)
        }
    })
})
$('#userTbody').on('click', '.redact', function () {
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (data) {
            let html = template('modifyTpl', data)
            $('#modifyBox').html(html)
        }
    })
})
$('#modifyBox').on('submit', '#userForm', function () {
    //获取用户输入的表单内容
    let formData = $(this).serialize();
    //获取要修改的用户ID
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (data) {
            location.reload()
        }
    })
    return false;
})
$('#userTbody').on('click', '.delete', function () {
    //提示是否删除用户
    if (confirm('确定删除用户吗？')) {
        //获取要删除用户的ID
        let id = $(this).siblings('.redact').data('id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (data) {
                location.reload()
            }
        })
    }
})
//selectAll  selectMany
//全选
$('#selectAll').on('change',function(){
    let checkedAll = $(this).prop('checked');
    if(checkedAll){
        $('#deletes').css('display','block')
    }else{
        $('#deletes').css('display','none')
    }
    $('#userTbody').find('input').prop('checked',checkedAll);
    
})
//多选
$('#userTbody').on('change','#selectMany',function(){
    let inputs = $('#userTbody').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        $('#selectAll').prop('checked',true);
    }else{
        $('#selectAll').prop('checked',false);
    }
    
    if(inputs.filter(':checked').length > 0){
        $('#deletes').css('display','block')
    }else{
        $('#deletes').css('display','none')
    }
    
})
$('#deletes').on('click',function(){
    let checkeds = $('#userTbody').find('input').filter(':checked');
    let str = []
    checkeds.each(function(idx,item){
       str.push($(item).attr('data-id')) ;
    })
    //console.log(str);
    if(confirm('确定要批量删除')){
        $.ajax({
            type: 'delete',
            url: '/users/' + str.join('-'),
            success: function (data) {
                location.reload()
            }
        })
    }
    

})
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (data) {
        // console.log(data);
        
        let html = template('tpl-posts',data)
        $('#postsTbody').html(html)
        let page = template('tpl-page',data)
        $('#pages').html(page)
    }
});

$('#pages').on('click','a',function(){
    let formData = serializeobj($('#classSelect'));
    let page= $(this).attr("data-id");
    formData['page'] = page;
    if(!formData.state){
        delete formData.state
    }
    if(!formData.category){
        delete formData.category
    }
    $.ajax({
        type: 'get',
        url: '/posts',
        data:formData,
        success: function (data) {
            let html = template('tpl-posts',data)
            $('#postsTbody').html(html)
            let page = template('tpl-page',data)
            $('#pages').html(page)
        }
    });
})
$.ajax({
    type:'get',
    url:'/categories',
    success:function(data){
        let html = template('tpl-title',{data})
        $('#select-title').html(html)       
    }
});
function serializeobj(form) {
    let result = form.serializeArray();
    let obj = {};
    result.forEach(item => {
        obj[item.name] = item.value
    });
    return obj;
};
$('#classSelect').on('submit',function(){
    let formData = serializeobj($(this))
    if(!formData.state){
        delete formData.state
    }
    if(!formData.category){
        delete formData.category
    }

    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(data){
            let html = template('tpl-posts',data)
            $('#postsTbody').html(html)
            let page = template('tpl-page',data)
            $('#pages').html(page)
        }
    })

    return false;
})
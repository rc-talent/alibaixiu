$.ajax({
    type:'get',
    url:'/comments',
    success:function(data){
        let html = template('tpl-comment',data)
        $('#commentTbody').html(html)
        let page = template('tpl-page',data)
        $('#pages').html(page)
    }
})
$('#commentTbody').on('click','#approve',function(){
    let id = $(this).attr('data-id')
    let status = $(this).attr('data-status')

    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state: status == 0 ? 1 : 0
        },
        success:function(data){
            location.reload()
        }
    })
})
$('#pages').on('click','a',function(){
    let page = $(this).attr('data-id')
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:page
        },
        success:function(data){
            let html = template('tpl-comment',data)
            $('#commentTbody').html(html)
            let page = template('tpl-page',data)
            $('#pages').html(page)
        }
    })
})
$('#commentTbody').on('click','.delete',function(){
    let id = $(this).attr('data-id');
    if(confirm('确定要删除吗？')){
        $.ajax({
            type:'delete',
            url:'/comments/' + id,
            success:function(data){
                location.reload()
            }
        })
    }
})
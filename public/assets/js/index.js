$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(data){
        $('#number').children('li').eq(0).html('<strong> '+ data.postCount +'</strong>篇文章（<strong> '+ data.draftCount +'</strong>篇草稿）')       
    }
})
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(data){
        $('#number').children('li').eq(1).html('<strong> '+ data.categoryCount +'</strong>个分类')
    }
})
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(data){
        $('#number').children('li').eq(2).html('<strong> '+ data.commentCount +'</strong>条评论（<strong>0</strong>条待审核）') 
    }
})
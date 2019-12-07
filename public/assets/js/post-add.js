$.ajax({
    type:'get',
    url:'/categories',
    success:function(data){
        let html = template('tpl-class',{data});
        $('#category').html(html)
    }
});
$('#feature').on('change',function(){
    //获取上传的文件
    let file = this.files[0];
    //设置formData对象,实现文件上传
    let formData = new FormData();
    //将文件追加到formData中
    formData.append('thumbnail',file)
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		// 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success:function(data){
            $('#hiddenAvatar').val(data[0].thumbnail)
        }
    })   
})

$('#article').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(data){
            location.href='/admin/posts.html'       
        }
    })
    return false;
});
function getId(id){
    let result = location.search.substr(1).split('&')
    for(let i=0 ;i<result.length;i++){
        let str = result[i].split('=')
        if(str[0] == id){
            return str[1]
        }
    }
    return -1
}
getId("id")
$.ajax({
    type:'get',
    url:'posts'+id,
    success:function(data){
        
    }
})

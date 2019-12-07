$('#loginOut').on('click',function(){
    let isConfirm = confirm('请确认是否退出');
    $.ajax({
      type:'post',
      url:'/logout',
      success:function(data){
        location.href = '/admin/login.html'
      },
      error:function(data){
        alert('退出登录失败')
      }
    })
  })
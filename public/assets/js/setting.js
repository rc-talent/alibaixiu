$('#formBox').on('change','#logo',function(){
    let formData = new FormData()
    formData.append('logo',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
            $('#hiddenFile').val(data[0].logo);
            $('#logo').siblings('img').prop('src',data[0].logo)
        }
    })
});
function serializeobj(form) {
    let result = form.serializeArray();
    let obj = {};
    result.forEach(item => {
        obj[item.name] = item.value
    });
    return obj;
};
$('#formBox').on('submit','#settingForm',function(){

    // let formData = serializeobj($(this));
    // console.log(formData);
    let formData = $(this).serialize();
    console.log(formData);
    
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(data){
            location.reload()
        }
    })
    return false;
})
$(".delete-button").click(function(){
    var selected = [];
    $('.checkbox-tasks:checked').each(function() {
        selected.push($(this).attr('value'));
    });
    if(selected.length){
        $.ajax({
            url:'/delete-tasks',
            type: 'POST', 
            data: { ids: selected },
            success: function () { 
                location.href = '/'
            },
            error: function (errorMessage) {
                console.log(errorMessage)
            }
        });
    }
    else{
        alert("No items are selected for delete.")
    }
    
});
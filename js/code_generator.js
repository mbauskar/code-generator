$(document).ready(function() {
    $('#generate_code').on('click', function(e) {
        var rows = $("[name='rows']").val();
        var cols = $("[name='cols']").val();

        if (validate_input(rows, cols)) {
            result = generate_bootstrp_grid_structure(rows, cols);
            copy_text(result["code"]);
            $("#result").html(result["msg"]);
        }
        else{
            $("#result").html("Invalid Input !!");
        }
    });
});

validate_input = function(rows, cols){
    // validate input from user
    return true
}

copy_text = function(text){
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

generate_bootstrp_grid_structure = function(rows, cols){
    var code = ""
    var msg = "Bootstrap grid structure code is copied please paste the code to text editor .."

    // Generate Grid Structure

    return {
        "code":code,
        "msg": msg
    }
}

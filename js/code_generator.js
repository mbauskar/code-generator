chrome.app.runtime.onLaunched.addListener(function() {
    // Center window on screen.
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 500;
    var height = 300;

    chrome.app.window.create('popup.html', {
        id: "CodeGenID",
        outerBounds: {
            width: width,
            height: height,
            left: Math.round((screenWidth - width) / 2),
            top: Math.round((screenHeight - height) / 2)
        }
    });
});

$(document).ready(function() {
    $('#generate_code').on('click', function(e) {
        var rows = parseInt($("[name='rows']").val());
        var cols = parseInt($("[name='cols']").val());
        console.log([rows, cols])
        if (validate_input(rows, cols)) {
            result = generate_bootstrap_grid_structure(rows, cols);
            // result = generate_html_table_structure(parseInt(rows), parseInt(cols));
            copy_text(result["code"]);
            $("#result").html(result["msg"]);
        }
    });
});

validate_input = function(rows, cols) {
    // validate input from user
    var result = false

    if (/^[1-9]*$/.test(rows) && /^[1-9]*$/.test(cols)) {
        if (cols > 12)
            $("#result").html("Number of columns per row can not exceed 12");
        else
            result = true
    } else
        $("#result").html("Invalid Input");

    return result
}

copy_text = function(text) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

generate_bootstrap_grid_structure = function(rows, cols) {
    var code = ""
    var msg = "Bootstrap grid structure code is copied please paste the code to text editor .."
    var col_cls = 12 % cols == 0 ? "col-xs-" + 12 / cols : "col-xs-";

    // Generate Grid Structure
    for (var i = 0; i < rows; i++) {
        code += "<div class='row'>";
        for (var j = 0; j < cols; j++) {
            code += "\n\t<div class='" + col_cls + "'>\n\t</div>";
        }
        code += "\n</div>\n";
    }

    return {
        "code": code,
        "msg": msg
    }
}

// get_column_cls = function(cols){
//     if(12%cols == 0)
//         return "col-xs-"12/cols;
//     else
//         return "col-xs-"
// }

generate_html_table_structure = function(rows, cols) {
    var code = ""
    var msg = "Bootstrap grid structure code is copied please paste the code to text editor .."

    // Creating Table Stucture
    code = "<table>\n\t<thead>";
    rows += 1;
    for (var i = 0; i < rows; i++) {
        code += (i == 1) ? "\n\t<tbody>" : ""
        code += "\n\t\t<tr>"
        for (var j = 0; j < cols; j++) {
            code += (i == 0) ? "\n\t\t\t<th></th>" : "\n\t\t\t<td></td>"
        }
        code += "\n\t\t</tr>"
        code += (i == 0) ? "\n\t</thead>" : (i == rows - 1) ? "\n\t</tbody>" : ""
    }
    code += "\n</table>"
    return {
        "code": code,
        "msg": msg
    }
}

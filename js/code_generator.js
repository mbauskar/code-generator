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

window.methods = {}
var cli = "generate_html_table_structure"

var headings = {
    "html_table":"<h4><b>HTML Tables</b></h4>",
    "grids":"<h4><b>Bootstrap Grids</b></h4>"
}

$(document).ready(function() {
    $("#panel-heading").html(headings["html_table"]);
    methods.bind_events();
});

methods.bind_events = function(){
    // Create Code
    $('#generate_code').on('click', function(e) {
        var rows = $("[name='rows']").val();
        var cols = $("[name='cols']").val();

        if (validate_input(rows, cols)) {
            args = {
                "rows":parseInt(rows),
                "cols":parseInt(cols)
            }

            result = methods[cli](args);
            copy_text(result["code"]);
            $("#result").html(result["msg"]);
            $("#code").val(result["code"]);
        }
    });

    $("#clear-textbox").on('click', function(e){
        clear_code();
    })

    $("#html_table_structure").on('click', function(e){
        cli = "generate_html_table_structure";
        $("#panel-heading").html(headings["html_table"]);

        clear_code();
    })

    $("#bootstrap_grid_structure").on('click', function(e){
        cli = "generate_bootstrap_grid_structure";
        $("#panel-heading").html(headings["grids"]);

        clear_code();
    })
}

methods.generate_bootstrap_grid_structure = function(args) {
    rows = args["rows"];
    cols = args["cols"];
    var code = "";

    var msg = "Bootstrap grid structure code is copied please paste the code to text editor ..";
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

methods.generate_html_table_structure = function(args) {
    var code = ""
    var msg = "HTML table code is copied please paste the code to text editor .."
    rows = args["rows"];
    cols = args["cols"];

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

validate_input = function(rows, cols) {
    // validate input from user
    var result = false

    if (/^[0-9]*$/.test(rows) && /^[0-9]*$/.test(cols)) {
        cols = parseInt(cols);
        rows = parseInt(rows);

        if(rows != 0 && cols != 0){
            if (cli == "generate_bootstrap_grid_structure" && cols > 12)
                $("#result").html("Number of columns per row can not exceed 12");
            else
                result = true
        }
        else
            $("#result").html("Input can not be zero");
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

clear_code = function(){
    $("#code").val("");
    // reset active form
    $("form").trigger("reset");
    $("#result").html("");
}

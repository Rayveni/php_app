var table_data, current_level = 0, max_row_id = 0, coll_arr = [], level_nodes = [];
const default_rows = {
    level0: {
        header: {
            value: "введите специальность",
            type: "input",
            params: {
                max_length: 100
            }
        }
    },
    level1: {
        header: {
            value: "введите учебный план",
            type: "input",
            params: {
                max_length: 100
            }
        }
    },
    level2: {
        header: {
            value: "введите название дисциплины",
            type: "input",
            params: {
                max_length: 100
            }
        },
		
	        header2: {
            value: "введите РП",
            type: "file",
            params: {
                max_length: 100
            }
        }	,
		
	        header3: {
            value: "введите КТП",
            type: "file",
            params: {
                max_length: 100
            }
        }	,
		
	        header4: {
            value: "введите ФОС",
            type: "file",
            params: {
                max_length: 100
            }
        }	,
		
	        header5: {
            value: "введите пркт.",
            type: "file",
            params: {
                max_length: 100
            }
        }	,

	        header6: {
            value: "введите смст.",
            type: "file",
            params: {
                max_length: 100
            }
        }	,
	        header7: {
            value: "введите ВКР",
            type: "file",
            params: {
                max_length: 100
            }
        }			
		
		
		
    }
};

const default_header = {
    level0: ['Специальность'],
    level1: ["Учебный план"],
    level2: ["Дисциплина","РП","КТП","ФОС","Практические","Самостоят.","ВКР"]
};

getTableData();
//var _temp;
//table_data=[{"Специальность":{"value":"11","type":"text"}},{"Специальность":{"value":"22","type":"text"}},{"Специальность":{"value":"33","type":"text"}},{"Специальность":{"value":"44","type":"text"}},{"Специальность":{"value":"aa","type":"text"}},{"Специальность":{"value":"ggg","type":"text"}},{"Специальность":{"value":"aaaa","type":"text"}},{"Специальность":{"type":"text"}},{"Специальность":{"value":"t","type":"text"}},{"Специальность":{"value":"tt","type":"text"}},{"Специальность":{"value":"","type":"text"}}]
let table = document.getElementById("main_table");
//let data = Object.keys(table_data[0]);

drawTable();

function delete_function(evt) {
    var el = document.getElementById(evt.currentTarget.myParam);
    process_row(el.cells[0].innerText)
}

function table_search(t_data, _value) {
    var _n = t_data.length;
    for (let i = 0; i < _n; i++) {
        let item = Object.values(t_data[i])[0];
        if (item['value'] == _value) {
            var __temp = item['child_nodes'];
            i = _n + 2;
        };
    }
    return __temp;
}
function next_lvl_function(evt) {
    var _selected = evt.currentTarget.innerText,
    _data;

    if (current_level == 0) {
        _data = table_data
		level_nodes=[]
    };
    if (current_level == 1) {
        _data = table_search(table_data, level_nodes[0]);

    };

    var _temp = table_search(_data, _selected);
    document.getElementById("main_table").innerHTML = "";
    coll_arr = [];
    current_level = current_level + 1;
    drawTable(_table_data = _temp);

    level_nodes .push(_selected);

}

function nav_names(level) {
    if (level == 0) {
        document.getElementById("add_row_btn").firstChild.data = "Добавить специальность";
        document.getElementById('nav_back').style.visibility = 'hidden';
    } else if (level == 1) {
        document.getElementById("add_row_btn").firstChild.data = "Добавить учебный план";
        document.getElementById('nav_back').style.visibility = 'visible';
    }
	else {
		document.getElementById("add_row_btn").firstChild.data = "Добавить дисциплину";
        document.getElementById('nav_back').style.visibility = 'visible';
		
	}
}
function getTableData() {
    $.ajax({
        type: 'GET',
        url: 'data_endpoint.php',
        async: false,
        success: function (d) {
            if (d == "no_file") {
                table_data = [];
            } else {
                table_data = JSON.parse(d);
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            flash_message(err.Message);
        }
    })
};

function drawTable(_table_data = table_data) {
    let level_id = 'level' + current_level;
    coll_arr = [];

    generateTableHead(default_header[level_id]);

    if (_table_data.length > 0) {
        generateTable(_table_data)
    }
    add_input_row();
    nav_names(current_level);
};

function generateTableHead(data) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
};

function generateTable(data) {
    for (let element of data) {
        let row = table.insertRow();
        generateRow(row, element)
    }
};
function generateRow(row, row_data, flg = false) {

    if (flg == true) {
        row.id = "input_row_id";
    } else {
        row.id = 'flat_row_' + max_row_id;
        max_row_id = max_row_id + 1;

    }
    val_flg = true;
    for (key in row_data) {
        let cell = row.insertCell(),
        row_cell = row_data[key];
        if (val_flg == true && flg == false) {
            coll_arr.push(row_cell["value"]);
        }
        val_flg = false;
        if (row_cell["type"] == "text") {

            var insert_cell = document.createTextNode(row_cell["value"]);
        } 
        else if (row_cell["type"] == "download_url") {

          //  var insert_cell = document.createTextNode(row_cell["value"]);
		 var insert_cell = document.createElement('a');
		 
		var  prepared_val=row_cell["value"].replace('↵', '').trim();
		 var _link = document.createTextNode(prepared_val.split("/")[1]);
		  insert_cell.appendChild(_link);  
		 insert_cell.href = prepared_val;
        insert_cell.download = prepared_val;        
    
  
        } 		
		
		
		
		else if (row_cell["type"] == "button") {
            var insert_cell = document.createElement("BUTTON");
            insert_cell.innerHTML = row_cell["value"];
            insert_cell.classList.add(row_cell["params"]["class"]);
            insert_cell.addEventListener('click', eval(row_cell["params"]["func"]), false);
        } else if (row_cell["type"] == "input") {
            var insert_cell = document.createElement("INPUT");
            insert_cell.setAttribute("type", "text");
            insert_cell.placeholder = row_cell["value"];
            insert_cell.maxLength = row_cell["params"]["max_length"];
        }
	else if (row_cell["type"] == "file") {
            var insert_cell = document.createElement("INPUT");
            insert_cell.setAttribute("type", "file");
			 insert_cell.classList.add("upl_file");
			 insert_cell.setAttribute("name","fileToUpload")
            //insert_cell.placeholder = row_cell["value"];
            //insert_cell.maxLength = row_cell["params"]["max_length"];
        }	
		
		
        cell.appendChild(insert_cell);
    }
    if (flg == false) {
        var insert_cell = document.createElement("BUTTON");
        insert_cell.innerHTML = 'delete';
        insert_cell.classList.add('button_link');

        insert_cell.addEventListener('click', delete_function, false);
        insert_cell.myParam = row.id;
        row.insertCell().appendChild(insert_cell);
    }
};

function flash_message(msg, alert_type = "succeses") {
    var flash_el = document.getElementById("flash_msg");
    let close_btn = '<span class="close" id="flash_close">×</span>'
        flash_el.cells[0].innerHTML = msg + close_btn
        flash_el.style.display = '';
    document.getElementById("flash_msg").addEventListener("click", function () {
        flash_el.style.display = 'none';
    });
    if (alert_type == "succeses") {
        flash_el.style.backgroundColor = "lime";
    } else {
        flash_el.style.backgroundColor = "LightCoral";
    }
};

function create_btn(parent_el, button_text, f_name) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = button_text;
    btn.value = "test_btn"
        btn.addEventListener('click', function () {
            window[f_name](this.value);
        }, false);
    parent_el.appendChild(btn);
};

function add_input_row() {
    tr = table.insertRow(1) // puts it at the start
        let row_data = default_rows['level' + current_level]
        generateRow(tr, row_data, true);
};

function process_row(del_item = false) {
    if (del_item == false) {
        var list = document.getElementById("input_row_id").cells;
        let firs_val = list[0].firstChild.value;
        //alert(firs_val)
        if (firs_val == "") {
            flash_message("Графа не может быть пустой", alert_type = "error")
            return;
        }
        if (coll_arr.filter(x => x === firs_val).length > 0) {
            flash_message("Введенный элемент уже существует", alert_type = "error")
            return;
        }

        const msg = generate_send_msg(list);
        if (msg=="error"){
			//console.log("event broken");
			return "error";
		}
        send_msg(msg);
    } else {
        send_msg({
            id: del_item
        }, 'del');
    }
    getTableData();
    document.getElementById("main_table").innerHTML = "";
    max_row_id = 0;
    current_level = 0;
    drawTable();
}


function upload_all_files(header,level_id){
	const _form_upload=document.getElementsByClassName("upl_file");
	for (var i = 0; i < _form_upload.length; i++) {
		if (_form_upload[i].files.length==0)
		{
			flash_message("Не выбран файл в графе" + header[i+1] , alert_type = "error");
			 return "error"
			
		}
	
	}
	var _flg=0 , _msg= [];
	for (var i = 0; i < _form_upload.length; i++) {
		
	 var file_data = _form_upload[i].files[0];
	 
	
	 
    var form_data = new FormData();                  
    form_data.append('file', file_data);
                             
    $.ajax({
        url: 'upload2.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
		async: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
			if (php_script_response.substring(0,7)=="success"){
            _msg.push(php_script_response.substring(7,php_script_response.length)); 
	    
			}
			else {
				_flg=1;
			}
        }
     });
	
		if (_flg==1)
		{
			flash_message("Ошибка при загрузке файла " + header[i+1]+" на сервер" , alert_type = "error");
			 return "error"
			
		}
	
	
	
	}	
	
	
	

	 
	 return _msg  
};



function generate_send_msg(list) {
    const level_id = 'level' + current_level,
    header = default_header[level_id];
    var msg = {};
	
	if (current_level ==2) {
		var uploaded_files=upload_all_files(header,level_id);
		if (uploaded_files=="error"){
			return "error";
		}
	}
    for (var i = 0; i < list.length; i++) {

        let _value = list[i].firstChild.value;
        if (_value == "") {
            flash_message("Графа" + header[i] + "не может быть пустой", alert_type = "error")
            break;
        }
        if (current_level < 2) {
            msg[header[i]] = {
                value: _value,
                type: "button",
                params: {
                    class: 'button_link',
                    func: "next_lvl_function"
                },
                child_nodes: []
            };
        }	else{
			if (i==0){
			
		            msg[header[i]] = {
                value: _value,
                type: "text",
                child_nodes: []
            };	
			}
			else {
		            msg[header[i]] = {
                value: uploaded_files[i-1],
                type: "download_url",
                child_nodes: []
            };	
			}
			
		}

    }

    return msg
};
function process_level(t) {
    if (current_level >0) {
        current_level = 0;
        level_nodes = [];
        getTableData();
        document.getElementById("main_table").innerHTML = "";
        drawTable();

    } else if (current_level == 2) {}
    else {}
}

function send_msg(message, _action = 'add') {
    //alert(JSON.stringify(message));
    //alert(_action);
    //alert(current_level);
    //alert(JSON.stringify(level_nodes));
    $.ajax({
        type: 'POST',
        url: 'save_data.php',
        async: false,
        data: {
            json: JSON.stringify(message),
            action: _action,
            level: current_level,
            nodes: JSON.stringify(level_nodes)
        },
        dataType: 'json'
    })
    .done(function (data) {
        console.log(data);
        update_succeses = true;
        flash_message("Обновление данных успешно");
    })
    .fail(function (data) {
        update_succeses = false;
        flash_message('Обновление данных не успешно' + data.responseText, alert_type = "error")
    });

}
function onLOAD() {
    gameframe();
}

let miner = 0;
function gameframe() {
    let transport_array = [];
    let item_array = [];
    for (let i = 0; i < document.getElementsByClassName('game_map')[0].children.length; i++) {
        if (document.getElementsByClassName('building_map')[0].children[i].classList.contains('building')) {
            transport_array.push(i);
        } else if (document.getElementsByClassName('building_map')[0].children[i].classList.contains('transport')) {
            transport_array.push(i);
        }
        if (document.getElementsByClassName('transport_map')[0].children[i].classList.contains('item')) {
            item_array.push(i);
        }
    }

    //move items on transport belts
    for (let i = 0; i < transport_array.length; i++) {
        if (document.getElementsByClassName('building_map')[0].children[(transport_array[i])].classList.contains('transport-up')) {
            if (item_array.includes(transport_array[i])) {
                document.getElementsByClassName('transport_map')[0].children[(transport_array[i])].classList.remove('item');
                document.getElementsByClassName('transport_map')[0].children[(transport_array[i] - 50)].classList.add('item');
            }
        } else if (document.getElementsByClassName('building_map')[0].children[transport_array[i]].classList.contains('transport-right')) {
            if (item_array.includes(transport_array[i])) {
                document.getElementsByClassName('transport_map')[0].children[transport_array[i]].classList.remove('item');
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] + 1].classList.add('item');
            }
        } else if (document.getElementsByClassName('building_map')[0].children[transport_array[i]].classList.contains('transport-down')) {
            if (item_array.includes(transport_array[i])) {
                document.getElementsByClassName('transport_map')[0].children[transport_array[i]].classList.remove('item');
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] + 50].classList.add('item');
            }
        } else if (document.getElementsByClassName('building_map')[0].children[transport_array[i]].classList.contains('transport-left')) {
            if (item_array.includes(transport_array[i])) {
                document.getElementsByClassName('transport_map')[0].children[transport_array[i]].classList.remove('item');
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] - 1].classList.add('item');
            }
            //store items from transport belt
        } else if (document.getElementsByClassName('building_map')[0].children[transport_array[i]].classList.contains('storage')) {
            if (item_array.includes(transport_array[i])) {
                document.getElementsByClassName('transport_map')[0].children[transport_array[i]].classList.remove('item');
            }
            //miners to transport belt
        } else if (document.getElementsByClassName('building_map')[0].children[transport_array[i]].classList.contains('miner')) {
            if (document.getElementsByClassName('building_map')[0].children[(transport_array[i] + 50)].classList.contains('transport')) {
                //above
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] + 50].classList.add('item');
            } else if (document.getElementsByClassName('building_map')[0].children[(transport_array[i] + 1)].classList.contains('transport')) {
                //right
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] + 1].classList.add('item');
            } else if (document.getElementsByClassName('building_map')[0].children[(transport_array[i] - 50)].classList.contains('transport')) {
                //below
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] - 50].classList.add('item');
            } else if (document.getElementsByClassName('building_map')[0].children[(transport_array[i] - 1)].classList.contains('transport')) {
                //left
                document.getElementsByClassName('transport_map')[0].children[transport_array[i] - 1].classList.add('item');
            }
        }
    }

    console.log(item_array);
    console.log(transport_array);

 setTimeout(function(){ gameframe(); },500);
}


let build_size = 0;
let rotation = 'up';
let building_type = '';
let color = 'rgba(19,255,0,0.5)';
let ignore = false;
function gridOn(element) {
    GridSelector(element);
    ignore = false;

    color = 'rgba(19,255,0,0.5)';
    if (build_size === 1) {
        if (grid_bottom_left.classList.contains('building')) {
            color = 'rgba(255,18,0,0.5)';
            ignore = true;
        }
    } else {
        if (grid_bottom_left.classList.contains('building') ||
            grid_top_left.classList.contains('building') ||
            grid_bottom_right.classList.contains('building') ||
            grid_top_right.classList.contains('building') ||
            grid_bottom_left.classList.contains('transport') ||
            grid_top_left.classList.contains('transport') ||
            grid_bottom_right.classList.contains('transport') ||
            grid_top_right.classList.contains('transport')
        ){
            color = 'rgba(255,18,0,0.5)';
        }
    }
    GridColor(color);
    GridPointerDirection('set');
}
function gridOff(element) {
    GridSelector(element);
    GridColor('');
    GridPointerDirection('unset');
}
function gridClick(element) {
    GridSelector(element);


    if (build_size === 1) {
        if (ignore) {
            return;
        }
        grid_bottom_left.classList.remove('transport-left');
        grid_bottom_left.classList.remove('transport-right');
        grid_bottom_left.classList.remove('transport-up');
        grid_bottom_left.classList.remove('transport-down');
        grid_bottom_left.classList.add('transport');
        grid_bottom_left.classList.add('transport-' + rotation);
    } else if (build_size === 2) {
        if (color === 'rgba(255,18,0,0.5)') {
            return;
        }
        grid_bottom_left.classList.add('building');
        grid_bottom_left.classList.add(building_type);
        grid_bottom_left.classList.add(building_type+'_TAG');
        grid_top_left.classList.add('building');
        grid_top_left.classList.add(building_type);
        grid_bottom_right.classList.add('building');
        grid_bottom_right.classList.add(building_type);
        grid_top_right.classList.add('building');
        grid_top_right.classList.add(building_type);
    }
}

let grid_bottom_left; let grid_top_left; let grid_bottom_right; let grid_top_right;
function GridSelector(element) {
    grid_bottom_left = document.getElementById('building_' + parseFloat(element.id).toString());
    grid_top_left = document.getElementById('building_' + (parseFloat(element.id)  - 50).toString());
    grid_bottom_right = document.getElementById('building_' + (parseFloat(element.id)  + 1).toString());
    grid_top_right = document.getElementById('building_' + (parseFloat(element.id) - 50 + 1).toString());
}
function GridColor(color) {
    if (build_size === 1) {
        grid_bottom_left.style.setProperty("background", color, "important");
    } else  if (build_size === 2) {
        grid_bottom_left.style.setProperty("background", color, "important");
        grid_top_left.style.setProperty("background", color, "important");
        grid_bottom_right.style.setProperty("background", color, "important");
        grid_top_right.style.setProperty("background", color, "important");
    }
}
function GridPointerDirection(set, prev_rot = rotation) {
    if (building_type === 'transport') {
        if (set === 'set') {
            if (ignore) {
                return;
            }
            grid_bottom_left.classList.add('direction-'+rotation);
        } else {
            grid_bottom_left.classList.remove('direction-'+prev_rot);
        }
    }
}

let rotation_array = ['up', 'right', 'down', 'left'];
let rotation_num = 0;
let previous_rotation;
document.addEventListener("keypress", function(e){
    if (e.key === 'r' || e.key === 'R') {
        previous_rotation = rotation;
        if (rotation_num < 3) {
            rotation_num++;
        } else {
            rotation_num = 0;
        }
        rotation = rotation_array[rotation_num];
        if (ignore) {
            return;
        }
        GridPointerDirection('set');
        GridPointerDirection('unset', previous_rotation);
    }
});
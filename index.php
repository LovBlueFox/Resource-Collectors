<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Resource Collectors</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="onLOAD()">
    <div class="game_map">
        <?php
        for ($x = 1; $x <= 1200; $x++) {
            echo "<div id='$x' onmouseenter='gridOn(this)' onmouseleave='gridOff(this)' onmousedown='gridClick(this)'></div>";
        }
        ?>
    </div>
    <div class="ore_map">
        <?php
        $coal_array = [204, 205, 206, 252, 253, 254, 255, 256, 257, 302, 303, 304, 305, 306, 307, 308, 352, 353, 354, 355, 356, 357, 358, 402, 403, 404, 405, 406, 407, 452, 453];
        $iron_array = [114, 115, 116, 162, 163, 164, 165, 166, 167, 212, 213, 214, 215, 216, 217, 218, 263, 264, 265, 266, 267, 268, 313, 314, 315, 316, 317];
        $copper_array = [914, 915, 916, 962, 963, 964, 965, 966, 967, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1063, 1064, 1066];
        for ($x = 1; $x <= 1200; $x++) {
            $ore = '';
            if (in_array($x, $coal_array, true)) {
                $ore = 'coal';
            } else if (in_array($x, $iron_array, true)) {
                $ore = 'iron';
            } else if (in_array($x, $copper_array, true)) {
                $ore = 'copper';
            }
            echo "<div class='$ore' id='ore_$x'></div>";
        }
        ?>
    </div>
    <div class="building_map">
        <?php
        $trans_array = [480, 430, 431, 481];
        $i = 0;
        $trans_dir_array = ['right', 'down', 'up', 'left'];
        for ($x = 1; $x <= 1200; $x++) {
            $building = '';
            if (in_array($x, $trans_array, true)) {
                $building = 'transport transport-'.$trans_dir_array[$i];
                $i++;
            }
            echo "<div class='$building' id='building_$x'></div>";
        }
        ?>
    </div>
    <div class="transport_map">
        <?php
        $item_array = [480];
        for ($x = 1; $x <= 1200; $x++) {
            $item = '';
            if (in_array($x, $item_array, true)) {
                $item = 'item';
            }
            echo "<div class='$item' id='transport_$x'></div>";
        }
        ?>
    </div>
    <div class="building_select">
        <p>stored_items = <span id="str_items">0</span></p>
        <a onclick="build_size = 1; building_type = 'transport'">Transport</a>
        <a onclick="build_size = 2; building_type = 'miner'">Miner</a>
        <a onclick="build_size = 2; building_type = 'storage'">Storage</a>
    </div>


    <script src="script.js"></script>
</body>
</html>
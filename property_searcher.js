/// <reference types="@mapeditor/tiled-api" />
/*
MIT License

Copyright (c) 2023 Grif_on

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

//Intended for use in Tiled 1.8.6

let shared_name_find_value = "Find objects with value";
let shared_name_find_property = "Find objects with property";
let shared_name_find_value_in_property = "Find objects with value in property";
let shared_name_option_only_on_visible_layers = "finder - Only on visible layers";


let previous_value = "";
let previous_property_name = "";


function numberize(input) {
    let processed_value;
    if (input.charAt(0) === "\"" && (input.charAt(input.length - 1) === "\"" && input.length !== 1)) {
        processed_value = input.slice(1, input.length - 1);
    } else {
        processed_value = Number(input);
        if (isNaN(processed_value) || !isFinite(processed_value)) {
            processed_value = input;
        }
    }
    return processed_value;
}


const find_value = tiled.registerAction(shared_name_find_value, function () {
    let new_value = tiled.prompt("What value should object have in any of it properties ?\nValue will be treated as number if it can be converted to it ,\notherwise it will be treated as string .\nIf you don't want auto conversion then just wrap around input with \"\"\n(e.g. \"\" --> empty string and \"1\" --> string with number one) .", previous_value, "Value ?");
    if (new_value === "") return; //Note - "Cancel" empty string and user empty string are different (since "" !== "\"\"")

    previous_value = new_value;

    new_value = numberize(new_value);

    let map = tiled.activeAsset;
    map.selectedObjects = [];
    for (let i = 0; i < map.layerCount; i++) {
        current_layer = map.layerAt(i);
        if (option_only_on_visible_layers.checked && !current_layer.visible) continue;
        if (current_layer.isObjectLayer) {                          //игнорировать необъектные слои
            if (current_layer.objects != null) {                    //на случай , если слой не будет иметь объектов вообще
                current_layer.objects.forEach(function (processed_object) {
                    let properties = processed_object.properties();
                    for (const [key, value] of Object.entries(properties)) {
                        if (typeof (value) === "object") {
                            if (value.value === new_value) processed_object.selected = true;
                        } else {
                            if (value === new_value) processed_object.selected = true;
                        }
                    }
                });
            }
        }
    }
});

find_value.text = shared_name_find_value;
find_value.icon = "find_v.png";

tiled.extendMenu("Map", [
    { separator: true },
    { action: shared_name_find_value, before: "SelectNextTileset" }
]);




const find_property = tiled.registerAction(shared_name_find_property, function () {
    let new_property_name = tiled.prompt("\n\n‎‎‎‎‎‎‎‎‎‎‎‎‎            In which property object should have supplied value ?            ‎‎‎‎‎‎‎‎‎‎‎‎‎\n\n", previous_property_name, "Property ?");
    if (new_property_name === "") return;

    previous_property_name = new_property_name;

    let map = tiled.activeAsset;
    map.selectedObjects = [];
    for (let i = 0; i < map.layerCount; i++) {
        current_layer = map.layerAt(i);
        if (option_only_on_visible_layers.checked && !current_layer.visible) continue;
        if (current_layer.isObjectLayer) {                          //игнорировать необъектные слои
            if (current_layer.objects != null) {                    //на случай , если слой не будет иметь объектов вообще
                current_layer.objects.forEach(function (processed_object) {
                    let properties = processed_object.properties();
                    for (const [key, value] of Object.entries(properties)) {
                        if (key === new_property_name) processed_object.selected = true;
                    }
                });
            }
        }
    }
});

find_property.text = shared_name_find_property;
find_property.icon = "find_p.png";

tiled.extendMenu("Map", [
    { action: shared_name_find_property, before: "SelectNextTileset" }
]);




const find_value_in_property = tiled.registerAction(shared_name_find_value_in_property, function () {
    let new_value = tiled.prompt("What value should object have ?\nValue will be treated as number if it can be converted to it ,\notherwise it will be treated as string .\nIf you don't want auto conversion then just wrap around input with \"\"\n(e.g. \"\" --> empty string and \"1\" --> string with number one) .", previous_value, "Value ?");
    if (new_value === "") return; //Note - "Cancel" empty string and user empty string are different (since "" !== "\"\"")

    let new_property_name = tiled.prompt("\n\n‎‎‎‎‎‎‎‎‎‎‎‎‎            In which property object should have supplied value ?            ‎‎‎‎‎‎‎‎‎‎‎‎‎\n\n", previous_property_name, "Property ?");
    if (new_property_name === "") return;

    previous_value = new_value;
    previous_property_name = new_property_name;

    new_value = numberize(new_value);

    let map = tiled.activeAsset;
    map.selectedObjects = [];
    for (let i = 0; i < map.layerCount; i++) {
        current_layer = map.layerAt(i);
        if (option_only_on_visible_layers.checked && !current_layer.visible) continue;
        if (current_layer.isObjectLayer) {                          //игнорировать необъектные слои
            if (current_layer.objects != null) {                    //на случай , если слой не будет иметь объектов вообще
                current_layer.objects.forEach(function (processed_object) {
                    let value = processed_object.property(new_property_name);
                    if (typeof (value) === "object") {
                        if (value.value === new_value) processed_object.selected = true;
                    } else {
                        if (value === new_value) processed_object.selected = true;
                    }
                });
            }
        }
    }
});

find_value_in_property.text = shared_name_find_value_in_property;
find_value_in_property.icon = "find_v_in_p.png";

tiled.extendMenu("Map", [
    { action: shared_name_find_value_in_property, before: "SelectNextTileset" }
]);



const option_only_on_visible_layers = tiled.registerAction(shared_name_option_only_on_visible_layers, function () { });

option_only_on_visible_layers.text = shared_name_option_only_on_visible_layers;
option_only_on_visible_layers.checkable = true;
option_only_on_visible_layers.checked = false;
option_only_on_visible_layers.iconVisibleInMenu = false;
tiled.extendMenu("Map", [
    { action: shared_name_option_only_on_visible_layers, before: "SelectNextTileset" },
    { separator: true }
]);
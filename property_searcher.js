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




const find_value = tiled.registerAction(shared_name_find_value, function () {

});

find_value.text = shared_name_find_value;
find_value.icon = "find_v.png"

tiled.extendMenu("Map", [
    { separator: true },
    { action: shared_name_find_value, before: "SelectNextTileset" }
]);




const find_property = tiled.registerAction(shared_name_find_property, function () {

});

find_property.text = shared_name_find_property;
find_property.icon = "find_p.png"

tiled.extendMenu("Map", [
    { action: shared_name_find_property, before: "SelectNextTileset" }
]);




const find_value_in_property = tiled.registerAction(shared_name_find_value_in_property, function () {

});

find_value_in_property.text = shared_name_find_value_in_property;
find_value_in_property.icon = "find_v_in_p.png"

tiled.extendMenu("Map", [
    { action: shared_name_find_value_in_property, before: "SelectNextTileset" },
    { separator: true }
]);
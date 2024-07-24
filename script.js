import HashMap from "./hash.js";
import HashSet from "./hashSet.js";

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");

map.set("elephant", "red");
map.set("carrot", "red");

map.set("moon", "silver");

map.set("moon", "black");
map.set("elephant", "black");
map.set("carrot", "black");

console.log(map);

const set = new HashSet();

set.add("Yev");
set.add("Gabi");
set.add("Vesna");

set.add("Vesna");
set.add("Vesna");

console.log(set);

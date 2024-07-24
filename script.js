// import { createNode, createLinkedList } from "./linkedList.js";
//
class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.hashMap = new Array(capacity);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  //0. grow function
  checkForGrow() {
    const loadFactor = this.capacity * this.loadFactor;
    const currentLengthMap = this.length();

    if (currentLengthMap > loadFactor) {
      const newCapacity = this.capacity * 2;
      const newHashMap = new HashMap(newCapacity);
      const oldEntries = this.entries();

      oldEntries.forEach((entry) => {
        newHashMap.set(entry[0], entry[1]);
      });
      console.log(newHashMap);

      this.capacity = newCapacity;
      this.hashMap = newHashMap.hashMap;
      this.capacity = newCapacity;
      console.log(map);
    }
  }

  //1. produces a hash code
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
    }
    const hashIndex = hashCode % this.capacity;
    return hashIndex;
  }

  //2. add an element to hashMap
  set(key, value) {
    const hashIndex = this.hash(key);
    //A. if bucket is not empty
    if (this.hashMap[hashIndex]) {
      //reference to the empty bucket or linked-list
      //a. check for key-match in linked list and override value
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        const matchingNode =
          this.hashMap[hashIndex].returnAt(matchingNodeIndex);
        matchingNode.value = value;
        return;
      }
      //b. create new node and add to the tail of linked-list
      this.hashMap[hashIndex].appendNode(key, value);
      const newHead = this.hashMap[hashIndex].getHead(); //update head from linkedList to hashMap
      this.hashMap[hashIndex].head = newHead;
      this.checkForGrow();
      return;
    }
    //B. if bucket is empty, create and head and linkedList at index
    const headNode = createNode(key, value); //{key, value, next: null)}
    this.hashMap[hashIndex] = createLinkedList(headNode);
    this.checkForGrow();
    return;
  }

  //3. takes one argument as a key and returns the value that is assigned to this key.
  get(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        const matchingNode =
          this.hashMap[hashIndex].returnAt(matchingNodeIndex);
        return matchingNode.value;
      }
    }
    return null; //if bucket is empty
  }

  //4. takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  has(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        return true;
      }
    }
    return false; //if bucket is empty
  }

  //5. remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true.
  remove(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        this.hashMap[hashIndex].removeAt(matchingNodeIndex);
        const newHead = this.hashMap[hashIndex].getHead(); //update head from linkedList to hashMap
        this.hashMap[hashIndex].head = newHead;
        return true;
      }
    }
    return false; //if bucket is empty
  }

  //6. returns the number of stored keys in the hash map.
  length() {
    let count = 0;
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        let bucketCount = bucket.getSize();
        count += bucketCount;
      }
    });
    return count;
  }

  //7. removes all entries in the hash map.
  clear() {
    this.hashMap = new Array(this.capacity);
  }

  //8. returns an array containing all the keys inside the hash map.
  keys() {
    const keysArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          keysArray.push(currentNode.key);
          currentNode = currentNode.next;
        }
      }
    });
    return keysArray;
  }

  //9. returns an array containing all the values.
  values() {
    const valuesArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          valuesArray.push(currentNode.value);
          currentNode = currentNode.next;
        }
      }
    });
    return valuesArray;
  }

  //10. returns an array that contains each key, value pair.
  entries() {
    const pairsArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          const bucketArray = [currentNode.key, currentNode.value];
          pairsArray.push(bucketArray);
          currentNode = currentNode.next;
        }
      }
    });
    return pairsArray;
  }
}

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

// map.set("Yev", "Khodakovskyy"); //10
// map.set("Gabriela", "Astolphi"); //11
// map.set("Fernanda", "Bevilacqua"); //5
// map.set("Ivan", "Pico"); //10

// map.set("Gabriela", "Bevilacqua"); //11
// map.set("Yev", "1"); //10
// map.set("Ivan", "2"); //10

// map.remove("Fernanda"); //5
// map.remove("Yev"); //10

// map.set("Yev", "Khodakovskyy"); //10

// map.set("Fernanda", "Bevilacqua"); //5
// map.set("Fernanda", "Gaston"); //5
// map.set("Vesna", "Tezak");

console.log(map);

//
//
//
//
//
//
//
//
//
//
//

function createNode(key = null, value = null) {
  // const next = null;
  return { key, value, next: null };
}

function createLinkedList(head = null) {
  //1. adds a new node containing value to the end of the list
  function appendNode(key, value) {
    const newNode = createNode(key, value);
    const lastNode = getTail();
    if (head == null) {
      head = newNode;
    } else {
      lastNode.next = newNode;
    }
  }

  //2. adds a new node containing value to the start of the list
  function prependNode(value) {
    const newNode = createNode(value);
    newNode.next = head;
    head = newNode;
  }

  //3. returns the total number of nodes in the list
  function getSize() {
    let count = 0;
    let currentNode = head;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }

  //4. returns the first node in the list
  function getHead() {
    //utility instead of .head property
    return head;
  }

  //5. returns the last node in the list
  function getTail() {
    let lastNode = head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      return lastNode;
    } else {
      //if empty list
      return null;
    }
  }

  //6. returns the node at the given index
  function returnAt(index) {
    const listSize = getSize();
    if (index > listSize - 1) {
      return "index does not exist";
    }

    let count = 0;
    let currentNode = head;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //7. removes the last element from the list
  function popLast() {
    let lastNode = head;
    let previousNode;
    if (lastNode) {
      while (lastNode.next) {
        previousNode = lastNode;
        lastNode = lastNode.next;
      }
      previousNode.next = null;
    }
  }

  //8. returns true if the passed in value is in the list and otherwise returns false.
  function containsValue(value) {
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value == value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  //9. returns the index of the node containing value, or null if not found.
  //A
  function findValue(value) {
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value == value) {
        return count;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }
  //B
  function findKey(key) {
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    while (currentNode) {
      if (currentNode.key == key) {
        return count;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }

  //10. represents your LinkedList objects as strings, so you can print them out and preview them in the console.
  //The format should be: ( value ) -> ( value ) -> ( value ) -> null.
  function toString() {
    let listString = "";
    let currentNode = head;
    while (currentNode) {
      listString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    listString += "null";
    return listString;
  }

  //11. inserts a new node with the provided value at the given index.
  function insertAt(value, index) {
    const listSize = getSize();
    if (index > listSize + 1) {
      return "index does not exist";
    }

    if (index == 0) {
      prependNode(value);
      return;
    }
    if (index == listSize) {
      appendNode(value);
      return;
    }

    const newNode = createNode(value);
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    let previousNode;

    while (count < index) {
      count++;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = newNode;
    newNode.next = currentNode;
  }

  //12. removes the node at the given index.
  function removeAt(index) {
    const listSize = getSize();
    if (index >= listSize) {
      return "index does not exist";
    }

    let currentNode = head;

    if (index == 0) {
      head = currentNode.next;
      return;
    }

    let count = 0;
    let previousNode;
    while (count < index) {
      count++;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = currentNode.next;
  }

  return {
    head,
    appendNode,
    prependNode,
    getSize,
    getHead,
    getTail,
    returnAt,
    popLast,
    containsValue,
    findValue,
    findKey,
    toString,
    insertAt,
    removeAt,
  };
}

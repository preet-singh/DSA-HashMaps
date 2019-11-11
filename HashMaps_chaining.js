'use strict';

class _hashNode {
    constructor(key, value){
      this.key = key;
      this.value = value;
      this.next = null;
    }
}
class HashMapChaining {
    constructor(initalCapacity = 8){
        this.length = 0; //initial length of hashtable
        this._hashTable = []; //holds the data
        this._capacity = initalCapacity; //will grow in chunks as we resize
        this._deleted = 0;
        this.head = null;
    }

    get(key) {//access key values from hashtable
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    //methods for locating and adding an item to the hashmap
    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > this.MAX_LOAD_RATIO) {//keeps track of how full the hashmap is
            this._resize(this._capacity * this.SIZE_RATIO);//reduce num of collisions
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if(!this._hashTable[index]){
            this.length++;
            this._hashTable[index] = {
                key, 
                value,
                DELETED: false
            };
        }
        else {
            let head = this._hashTable[index];
            if (head.next === undefined){
                const hashNode = new _hashNode(head.key, head.value);
                this._hashTable[index] = hashNode;
                head = this._hashTable[index];
            }
            const newNode = new _hashNode(key, value);
            while (head.next !== null)
                head = head.next;
            head.next = newNode; 
        }

    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {//used to find the correct slot for a given key
        const hash = HashMapChaining._hashString(key); //calcs. hash of key 
        const index = hash % this._capacity;//uses mod to find a slot within current capacity
        const slot = this._hashTable[index];

        if (slot === undefined || (slot.key === key && !slot.DELETED)) { //slot - are you free?
            return index; //func will always return a slot as we leave extra slots due to max load factor
        }
    }

    _resize(size) {//making sure each item lives in the correct place, we recreate the hash with a larger capacity
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) { //function takes a string and hashes it giving a num
        let hash = 5381; //declared var, initialized to prime num - primes are good at uniformly dist. data
        for (let i = 0; i < string.length; i++) {//iterating thru each char in string
            hash = (hash << 5) + hash + string.charCodeAt(i);//extraxt and convert each char to it's num val
            //(hash << 5 - left shift) - takes hash and shifts 5 bits to left, therefore makes val of hash larger
            hash = hash & hash;//forces hash to be a fixed size (i.e. 32 bit int)
        }
        return hash >>> 0; //takes large hash val and forces it to be a +ve int, same as abs() - but time complexity will be larger
    }
}

module.exports = { HashMapChaining };


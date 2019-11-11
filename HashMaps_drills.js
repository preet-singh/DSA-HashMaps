'use strict';
const { HashMap } = require('./HashMaps');
const { HashMapChaining } = require('./HashMaps_chaining');
////////////////////////

function main(){
    const lor = new HashMap();
    lor.MAX_LOAD_RATIO = 0.5;
    lor.SIZE_RATIO = 3;
    //add the data
    const lorData = [
    {'Hobbit': 'Bilbo'}, 
    {'Hobbit': 'Frodo'},
    {'Wizard': 'Gandolf'}, 
    {'Human': 'Aragon'}, 
    {'Elf': 'Legolas'}, 
    {'Maiar': 'The Necromancer'},
    {'Maiar': 'Sauron'}, 
    {'RingBearer': 'Gollum'},
    {'LadyOfLight': 'Galadriel'}, 
    {'HalfElven': 'Arwen'},
    {'Ent': 'Treebeard'}
    ];
    lorData.forEach(obj => {
        for(let key in obj)
        lor.set(key, obj[key]);
    })
    lorData.forEach(obj => {
        for(let key in obj)
        console.log(`${key}`, lor.get(key));
    });
    console.log('capacity', lor._capacity);
    console.log('hashtable', lor._hashTable);
    // console.log(lor._findSlot("Maiar")); 
    // console.log(lor._findSlot("Hobbit")); 
}
//main();

//Q2: What does this do?
// map1 will display 20 because the value was overwritten by: map2.set(str3,20);
// map2 will display 10 because the value was overwritten by: map2.set(str4,10);
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
};
//WhatDoesThisDo()

//Q3: Demonstrate understanding of Hash maps




//Q4: Remove duplicates
function removeDuplicates(str) {
    const characters = new HashMap();
    for( let i = str.length - 1; i >= 0; i--) {
        characters.set(str[i], i);
    }
    let results = '';
    for (let i = 0; i < str.length; i++) {
        if ( i === characters.get(str[i])){
            results += str[i];
        }
    }
    return results;
}
//console.log(removeDuplicates('google'));.

//Q5: Any permutation a palindrome
function palindrome(str){
    const hash = new Map();
    let counter = 0;
    for(let i=0; i<str.length; i++){
      if(!hash.has(str[i])){
        hash.set(str[i], '');
        counter++;
      } else if(hash.has(str[i])){
        counter--;
      }
    }
  
    return str.length % 2 && counter === 1 ? true : str.length % 2 && counter === 0? true : false;    
  }
// console.log(palindrome('acecarr'));
// console.log(palindrome('north'));
// console.log(palindrome('tacocat'));


//Q6: Anagram grouping
function anagram(arr){
    const hash = new Map();
    let result = [];
    arr.forEach(item => {
        let sortedItem = item.split('').sort().join('');
        if(!hash.has(sortedItem)){
          hash.set(sortedItem, [item]);
          result.push(sortedItem);
        } else{
          let items = hash.get(sortedItem);
          items.push(item);
          hash.set(sortedItem, items);
        }
      });
    return result.map(item => hash.get(item.split('').sort().join('')));
}
//console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));


//Q7: Separate Chaining - test new hashmap chain class with Q2(LOR)
function separateChaining(){
  const lorChain = new HashMapChaining();
  lorChain.MAX_LOAD_RATIO = 0.5;
  lorChain.SIZE_RATIO = 3;

  lorChain.set('Hobbit', 'Bilbo')
  lorChain.set('Hobbit', 'Frodo')
  lorChain.set('Wizard', 'Gandolf')
  lorChain.set('Elf', 'Legolas')
  lorChain.set('Maiar', 'The Necromancer')
  lorChain.set('Maiar', 'Sauron')
  lorChain.set('LadyOfLight', 'Galadriel')
  lorChain.set('HalfElven', 'Arwen')
  lorChain.set('Ent', 'Treebeard')
  console.log(JSON.stringify(lorChain));

}
console.log(separateChaining());
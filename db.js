"use strict";

const customerData = [  
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },  
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }  
];  
const dbName = "test";  

$(function(){
  // This will improve our code to be more readable and shorter  
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;  
  // indexedDB.deleteDatabase("test");
 
  var request = indexedDB.open("test",1);  
  var db;
  request.onerror = function(event) {  
    // Handle errors. 
      console.error('MediaDB():', request.error.name);
  };  
  console.log("hi");
  
  request.onsuccess = function() {  
    // Do something with request.result! 
    db = request.result;
    console.log("ok11");
  };
  
  request.onupgradeneeded = function() {
    console.log("2222");
    /*
    var db = request.result;

    // If there are already existing object stores, delete them all
    // If the version number changes we just want to start over.
    var existingStoreNames = db.objectStoreNames;
    for (var i = 0; i < existingStoreNames.length; i++) {
      db.deleteObjectStore(existingStoreNames);
    }

    // Now build the database
    var filestore = db.createObjectStore('files', { keyPath: 'name' });
    mediadb.indexes.forEach(function(indexName)  {
      // the index name is also the keypath
      filestore.createIndex(indexName, indexName);
    });
    */
  }
  
});

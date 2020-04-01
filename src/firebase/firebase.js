//takes all named exports from firebase
//and puts them on a variable called firebase
// import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment';

//Firebase configuration
//values stored in .env.test, .env.development files
//and retrieved through webpack.config.json
const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
//Firebase Initialization
firebase.initializeApp(firebaseConfig);

//access firebase database
const database = firebase.database();

export { firebase, database as default };
/** write to datatabase */
//ref: references to a specific path for our database
//if we don't pass any arg then we reference the root of the database,
//otherwise we can reference to one of our collections
//set:writes to the firebase database  
// database.ref().set({
//     name: 'Dorothea',
//     stressLevel: 6,
//     age: 28,
//     job: {
//         title: 'software developer',
//         company: 'Google'
//     },
//     isSingle: true,
//     location: {
//         city: 'Athens',
//         country: 'Greece'
//     }
// });

///each set() wipes out the previous data
// database.ref().set('This is my data');

// database.ref().set({
//     age: 27
// });

//set new root child 'attributes' 
// database.ref('attributes').set({
//     height: { cm: '152' },
//     weight: { kilos: 52 }
// }).then(() => {
//     console.log('Data is changed!');
// }).catch((e) => {
//     console.log('Data was not saved ' + e);
// });

/***** remove data */
//1st way
// database.ref('isSingle').remove().then(()=>{
//     console.log('Data is removed!'); 
// }).catch((e)=>{
//     console.log('Data was not removed '+e);
// });

/*2nd way**/
// database.ref('isSingle').set(null).then(() => {
//     console.log('Data is removed!');
// }).catch((e) => {
//     console.log('Data was not removed ' + e);
// });

/*** update data */

//1st way
//using set
//by referencing the property we can update it
// database.ref('age').set(28)

// database.ref('location/city').set('athens');

//2nd way 
//using update
//if property doesn't exist it's created 
// database.ref().update({
//     isSingle: false

// }).then(() => {
//     console.log('Data is updated!');
// }).catch((e) => {
//     console.log('Data was not updated ' + e);
// });

//update inside of an object
//update city inside of location
//location : { city: 'Athens'} would have replaced the whole object 
//intsead we give the reference path in quotes
// database.ref().update({
//     stressLevel: 9,
//     'job/title': 'software engineer',
//     'job/company': 'Interamerican',
//     isSingle: true,
//     'location/city': 'Athens'
// }).then(() => {
//     console.log('Data is updated!');
// }).catch((e) => {
//     console.log('Data was not updated ' + e);
// });


/** fetching data */

//fetch data once
// database.ref().once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

//fetch data every time a change happens
//aka subscribe 
// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// },(e)=>{
//     console.log('error ' +e);
// });

// setTimeout(() => {
//     database.ref('age').set(20);
// }, 3500);

// setTimeout(() => {
// // unsuscribe
// database.ref().off();
// }, 7500);

// setTimeout(() => {
//     database.ref('age').set(29);
// }, 8500);

// unsubscribe from specific subscription
//1st way
// const subscription1= (snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// };
// database.ref().on('value', subscription1);
// database.ref().off(subscription1);

//2nd way
// const subscription2 = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// });
// database.ref().off(subscription2);


/** challenge */
// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log("%s is a %s at %s", val.name, val.job.title,val.job.company);
//     // console.log(`{$val.name} is a ${val.job.title} at ${val.job.company}`);

// }); 

// database.ref('job/title').set('Software Developer');

/** Array Data */


//firebase does not support arrays
//firebase converts them to objects bases on indexes as properties eg. notes : {0 : {}, 1: {}}
// const notes = [{
//     id: '12',
//     title: 'this is my title',
//     body: 'this is my note'
// }, {
//     id: '14',
//     title: 'this is my title',
//     body: 'this is my note'
// }];

//represantion of an array in firebase
// const firebaseNotes = {
//     notes: {
//         uniqueIdentifier1: {
//             title: 'first note',
//             body:'this is my first note'
//         },
//         uniqueIdentifier2: {
//             title: 'first note',
//             body:'this is my first note'
//         }
//     }
// };

//creates a unique identifier 
//each push adds a new one 
// database.ref('notes').push({
//     title: 'To Do',
//     body: 'Go for a run'
// });
// database.ref('notes/-M3Y0rYEEzkTLZE-3u7l').remove();

//setup expenses
// const expenses =[{
//     id: "1",
//     description: "Gum",
//     note: '',
//     amount: 195,
//     createdAt: 0 //January 1st midnight
// },
// {
//     id: "2",
//     description: "Rent",
//     note: '',
//     amount: 180,
//     createdAt: moment(0).subtract(4, 'days').valueOf()
// },
// {
//     id: "3",
//     description: "Car",
//     note: '',
//     amount: 295,
//     createdAt: moment(0).add(4, 'days').valueOf()
// }];

/** create array data */
// expenses.forEach((expense,index) => {
//     const customId=  'expense' +index;
//     const exp = expense;
//     database.ref('expenses').child(customId).set(exp);
// });

/** read array data */
//and set id value to unique identifier value
// database.ref('expenses')
// .once('value')
// .then((snapshot)=>{
//     const expenses = [];
//     console.log(snapshot.val());
//     snapshot.forEach((childSnapshot) => {

//         expenses.push({
//             //id contained in childsnaphot will be overwritten by id
//             ...childSnapshot.val(),
//             id: childSnapshot.key
//         });

//       });
//       console.log(expenses);

// }).catch((e)=>{});


// database.ref('expenses')
// .on('value', (snapshot)=>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push(
//            childSnapshot.val()
//         );

//       });
//       console.log(expenses);
// },(e)=>{
//     console.log(e);
// });


//events provided by firebase
//value, child_removed, child_changed , child_added
// database.ref('expenses').on('child_removed', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });
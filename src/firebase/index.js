import * as firebase from "firebase";

var closure = null

const firebaseConfig = {
    apiKey: "AIzaSyDQrg_QY98OalGl7P-Kjw0jf5bslfpxVrQ",
    authDomain: "knowitall-893d7.firebaseapp.com",
    databaseURL: "https://knowitall-893d7.firebaseio.com",
    projectId: "knowitall-893d7",
    storageBucket: "knowitall-893d7.appspot.com",
    messagingSenderId: "904997770636"
};

export const getCurrentUser = () => {
	return firebase.auth().currentUser
}

export const removeEntity = (entityID) => {
	firebase.database().ref(`entities/${entityID}`).remove()
}

export const removeComment = (entityID, commentID) => {
	firebase.database().ref(`entities/${entityID}/comments/${commentID}`).remove()
}

export const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
};

export const getEntities = (dispatchGetEntities, entityId) => {
    firebase.database().ref('entities/').on('value', dispatchGetEntities);
};

export const checkPollResponseExists = (entityId, poster) => {
	return firebase.database().ref(`entities/${entityId}/pollResponses`).child(poster).once('value'); 
}

export const createPollResponse = (entityId, option, poster, posterEmail, anonymous) => {
	const postObj = {
		poster, posterEmail, option, anonymous, entityId
	}
	console.log(postObj)
	firebase.database().ref(`entities/${entityId}/pollResponses`).child(poster).set(postObj)
}

export const checkReviewExists = (entityId, reviewer) => {
	return firebase.database().ref(`entities/${entityId}/reviews`).child(reviewer).once('value'); 
}

export const createEntityReview = (entityType, entityId, stars, reviewer, reviewerEmail, review, anonymous) => {
	const reviewObj = {
		stars, reviewer, review, anonymous, entityId, reviewerEmail
	}
	console.log(reviewObj, entityId, reviewer)
	firebase.database().ref(`entities/${entityId}/reviews`).child(reviewer).set(reviewObj)
}

export const createEntityComment = (entityType, entityId, comment, commentor, commentorEmail, anonymous) => {
	const commentObj = {
		entityId, comment, commentor, anonymous, commentorEmail
	}
	firebase.database().ref(`entities/${entityId}/comments`).push(commentObj)
}

export const getEntity = (dispatchGetEntity, entityId) => {
	firebase.database().ref(`entities/${entityId}`).on('value', dispatchGetEntity);
}

export const registerUser = (email, password, otherThis) => {
	if(firebase.auth().currentUser) {
		return
	}
	var uscEmail = email.substr(email.length - 7)
	
	if(uscEmail != 'usc.edu') {
		otherThis.toggleError();
		return
	}

	firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
		sendEmailVerification()
		let newUser = {
        	"isAdmin": false,
    	}
		firebase.database().ref(`users/${user.uid}`).set(newUser)
	}).catch((error)=>{
		otherThis.toggleError();
		console.log(error);
	})
}

export const getUserData = dispatchAttemptLogin => {
    firebase.auth().onAuthStateChanged(function(user) {
    	if(user != null) {
    		var path = firebase.database().ref(`users/${user.uid}`)    		
	    	
	    	 closure = path.on('value', function(snapshot) {
	    	 	if(user != firebase.auth().currentUser){
					path.off('value', closure)
					closure = null
					return
	    	 	}

	    		const isAdmin = snapshot.val().isAdmin
	    		const newUser = {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					email: user.email,
					emailVerified: user.emailVerified,
					isAdmin: isAdmin
	    		}

	    		dispatchAttemptLogin(newUser)
	    	}) 
    	} else {
    		dispatchAttemptLogin(user)
    	}
	});
};

export const login = (email, password) => {
	if(firebase.auth().currentUser) {
		return
	}
	firebase.auth().signInWithEmailAndPassword(email, password)
}

export const logout = () => {
	let currUser = firebase.auth().currentUser.uid
 	firebase.auth().signOut()
}

export const sendEmailVerification = () => {
	const user = firebase.auth().currentUser
	user.sendEmailVerification().catch(function(error) {
		console.log(error)
	})
}
/*
	entityType: String --> can be a Poll, Rating, or Question
	anonymous: bool -> default is false
	owner: String -> username
	options: [String] -> poll options 
	subject: String
	timeLimit:Int -> Days to Expire
*/
export const addEntity = (entityType, options, owner, subject, timeLimit, anonymous=false, category, details) => {
	const toPush = {
		entityType, options, owner, subject, timeLimit, anonymous, category, details
	}

	firebase.database().ref('entities/').push(toPush);
}

export const upVote = (entityId) => {
	var databaseRef = firebase.database().ref('entities/').child(entityId).child('numUpVote');
	databaseRef.transaction((numUpVote) => {
		return (numUpVote || 0) + 1;
	})
}

export const downVote = (entityId) => {
	var databaseRef = firebase.database().ref('entities/').child(entityId).child('numDownVote');
	databaseRef.transaction((numDownVote) => {
		return (numDownVote || 0) + 1;
	})
}
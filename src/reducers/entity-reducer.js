const GET_ENTITY = "GetEntityFromFirebase"

export const dispatchGetEntity = (snapshot) => {
	return {
		type: GET_ENTITY,
		payload: snapshot.val()
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_ENTITY:
			return action.payload
		default:
			return state
	}	
}
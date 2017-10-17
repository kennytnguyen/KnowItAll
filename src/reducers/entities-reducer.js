const GET_ENTITIES = "GetEntitiesFromFirebase"

export const dispatchGetEntities = (snapshot) => {
	return {
		type: GET_ENTITIES,
		payload: snapshot.val()
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_ENTITIES:
			return action.payload
		default:
			return state
	}	
}
import {createStore} from "vuex";
import {collection, getDocs} from "firebase/firestore";

// Create a new store instance.
export default createStore({
    state()
    {
        return {
            allCharacters: [],
            loading: false
        };
    },
    mutations: {
        updateLoading(state, payload)
        {
            state.loading = payload.isLoading;
        }
    },
    actions: {
        //Fetch data from firebase
        async fetchCharacters({commit, state})
        {
            //Remove all current characters to avoid duplicating
            state.allCharacters = [];
            commit("updateLoading", {isLoading: true});
            await getDocs(collection(db, "characters"))
                .then(querySnapshot =>
                {
                    //Remove old data in case re-fetching
                    querySnapshot.forEach((doc) =>
                    {
                        state.allCharacters.push({id: doc.id, ...doc.data()});
                    });
                })
                .catch(e => console.log(e));
            commit("updateLoading", {isLoading: false});
        }
    }
});

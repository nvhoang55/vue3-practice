import {collection, getDocs} from "firebase/firestore";

export default {
    namespaced: true,
    state: () => ({
        allCharacters: []
    }),
    actions: {
        //Fetch data from firebase
        async fetchCharacters({commit, state})
        {
            //Remove all current characters to avoid duplicating
            state.allCharacters = [];
            commit("setLoading", {isLoading: true}, {root: true});
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
            commit("setLoading", {isLoading: false}, {root: true});
        }
    }
};

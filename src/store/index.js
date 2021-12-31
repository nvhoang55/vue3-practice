import {createStore} from "vuex";
import characters from "./characters";

// Create a new store instance.
export default createStore({
    state: () => ({
        loading: false
    }),
    mutations: {
        setLoading(state, payload)
        {
            state.loading = payload.isLoading;
        }
    },
    modules: {
        characters
    }
})
;

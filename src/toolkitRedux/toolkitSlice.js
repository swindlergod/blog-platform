import { createSlice } from "@reduxjs/toolkit"

const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        posts: [],
        loading: false
    },
    reducers: {
        loadPosts(state, action){
            state.posts.push(action.payload)
        },
        stopLoading(state) {
            state.loading = true
        }
    }
})

export default toolkitSlice.reducer
export const { loadPosts, stopLoading } = toolkitSlice.actions
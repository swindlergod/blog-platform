import { loadPosts, stopLoading } from "../toolkitRedux/toolkitSlice"

export const getPosts = () => {
    return function(dispatch) {
        try{
            fetch('https://blog.kata.academy/api/articles?limit=5&offset=5')
            .then(response => response.json())
            .then(json => dispatch(loadPosts(json.articles)))
            .then(() => dispatch(stopLoading()))
        } catch(e) {
            console.log(e)
        }        
    }   
  }
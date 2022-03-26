import {createContext,useState,useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();


export const FeedbackProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(true);

    const [feedback,setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(()=>{
        fetchFeedback();        
    }, []);
    const fetchFeedback = async ()=>{
        const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
        const data = await response.json();
        setIsLoading(false);
        setFeedback(data)
    }

    function deleteFeedback (id){
        if(window.confirm('Are you sure you want to delete ?')){
            setFeedback(()=> feedback.filter((item)=> item.id!==id))
        }
    }

    function addFeedback (newFeedback){
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    //Update Feedback Item
    const updateFeedback = (id,updItem)=>{
        setFeedback(
            feedback.map(item=> item.id === id ? {...item, ...updItem} : item)
            )
    }

    //Set Item to be updated
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }


    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        updateFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
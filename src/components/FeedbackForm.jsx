import { useState, useContext, useEffect } from "react"
import FeedbackContext from "./context/FeedbackContext"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm() {

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext); 

  const [inputText,setInputText] = useState('')
  const [rating ,setRating] = useState(10)

  const [btnDisabled,setBtnDisabled] = useState(true)
  const [message,setMessage] = useState('')

  useEffect(()=>{
    if(feedbackEdit.edit === true){
      setInputText(feedbackEdit.item.text);
      setRating(+feedbackEdit.item.rating);
      setBtnDisabled(false)
    }
  }, [feedbackEdit])
  
  const handleChange = (e)=>{

      if(e.target.value === ''){
        setBtnDisabled(true)
        setMessage(null)
      }
      else if(e.target.value !== 0 && e.target.value.trim().length <= 10){
        setMessage('Text must be atleast 10 characters long')
        setBtnDisabled(true)
      }else{
        setMessage(null)
        setBtnDisabled(false)
      }
      setInputText(e.target.value)

    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(inputText.trim().length > 10){
        const newFeedback = {
          text: inputText,
          rating: rating
        }

        if(feedbackEdit.edit === true){
          updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
          addFeedback(newFeedback);
        }
        setInputText('');
        
      }
    }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your experience with us?</h2>
        <RatingSelect select={(rating)=>setRating(rating)} />
        <div className="input-group">
          <input type="text" placeholder='Write your review' onChange={handleChange} value={inputText}/>
          <Button type='submit' version='secondary' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">
          {message}
        </div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
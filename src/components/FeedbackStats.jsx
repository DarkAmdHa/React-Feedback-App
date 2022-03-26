import { useContext } from 'react'
import FeedbackContext from './context/FeedbackContext';

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext);
  console.log(feedback)
    let average = (feedback.reduce((acc,cur)=>acc+cur.rating,0)/feedback.length).toFixed(1).replace(/[.,]0$/, '')
    console.log(average)
  return (
    <div className='feedback-stats'>
        <h4>Feedbacks: {feedback.length}</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average }</h4>        
    </div>
  )
}


export default FeedbackStats
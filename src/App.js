import { v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackList from './components/FeedbackList'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './components/pages/AboutPage'
import FeedbackContext from './components/context/FeedbackContext'
import { FeedbackProvider } from './components/context/FeedbackContext'
import AboutIconLink from './components/AboutIconLink'

function App(){
    
    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={
                            <>
                                <FeedbackForm/>
                                <FeedbackStats/>
                                <FeedbackList/>
                            </>
                        }>
                        </Route>
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>

                    <AboutIconLink />
                </div>

            </Router>
        </FeedbackProvider>
    )
}



export default App
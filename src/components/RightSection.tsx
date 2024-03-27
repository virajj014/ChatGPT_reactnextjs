"use client";
import React, { useState } from 'react'
import styles from '@/styles/RightSection.module.css'
import chatgptlogo from '@/assets/chatgptlogo.png'
import chatgptlogo2 from '@/assets/chatgptlogo2.png'
import nouserlogo from '@/assets/nouserlogo.png'
import Image from 'next/image'
// import schoolbg from '@/assets/schoolBG.jpg'
import { HashLoader } from 'react-spinners';
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API
// console.log(API_KEY)
const RightSection = () => {
    const trainingPrompt = [
        {
            "role": "user",
            "parts": [{
                "text": "This is Introductory dialogue for any prompt :  'Hello, my dear friend, I am the CHATGPT Bot. Ask me anything regarding procurement, purchase, and logistics. I will be happy to help you. '"
            }]
        },
        {
            "role": "model",
            "parts": [{
                "text": "okay"
            }]
        },
        {
            "role": "user",
            "parts": [{
                "text": "Special Dialogue 1 : if any prompt mentions 'Shashi Shahi' word :  'Ofcourse! Dr. Shashi Shahi is one of the prominent professors at UWindsor! He is an IIT-D alumni with year of invaluable experience and a fun way of engaging in lectures!' 'Likes: Analytics and Research and Case Studies ''Dislikes: Students near riverside.'"
            }]
        },
        {
            "role": "model",
            "parts": [{
                "text": "okay"
            }]
        },
        {
            "role": "user",
            "parts": [{
                "text": "Special Dialogue 2 : Any prompt that mentions CHATGPT class / classroom  A : ' The CHATGPT Batch of 2023 is by far the best the university has ever seen by all sets of standards. Students from different come together to form a truly diverse and culturally rich classroom experience. I believe that all students are highly capable and will achieve all great things in their professional career!' "
            }]
        },
        {
            "role": "model",
            "parts": [{
                "text": "okay"
            }]
        }
    ]
    const [message, setMessage] = useState('')
    const [isSent, setIsSent] = useState(true)
    const [allMessages, setAllMessages] = useState<any[]>([])

    // const sendMessage = async () => {
    //     // console.log(message)
    //     let url = "https://api.openai.com/v1/chat/completions"

    //     let token = `Bearer ${openAiAPI}`
    //     let model = 'gpt-3.5-turbo'

    //     let messagesToSend = [
    //         ...allMessages,
    //         {
    //             role: 'user',
    //             content: message
    //         }
    //     ]

    //     let res = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': token,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             model: model,
    //             messages: messagesToSend
    //         })
    //     })
    //     let resjson = await res.json()
    //     if (resjson) {
    //         console.log(resjson)

    //         // console.log(resjson.choices[0].message)

    //         let newAllMessages = [
    //             ...messagesToSend,
    //             resjson.choices[0].message
    //         ]

    //         // console.log(newAllMessages)

    //         setAllMessages(newAllMessages)
    //         setMessage('')
    //     }
    // }



    const sendMessage = async () => {

        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=` + API_KEY
        let messagesToSend = [
            ...trainingPrompt,
            ...allMessages,
            {
                "role": "user",
                "parts": [{
                    "text": message
                }]
            }
        ]

        setIsSent(false)
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
            })
        })

        let resjson = await res.json()
        setIsSent(true)
        // console.log(resjson.candidates[0].content.parts[0].text)

        let responseMessage = resjson.candidates[0].content.parts[0].text

        let newAllMessages = [
            ...allMessages,
            {
                "role": "user",
                "parts": [{
                    "text": message
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": responseMessage
                }]
            }
        ]

        console.log(newAllMessages)

        setAllMessages(newAllMessages)
        setMessage('')
    }
    return (
        <div className={styles.rightSection}>
            {/* <Image src={schoolbg} alt="" className={styles.schoolbg} /> */}
            <div className={styles.rightin}>
                <div className={styles.chatgptversion}>
                    <p className={styles.text1}>Chat</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </div>


                {
                    allMessages.length > 0 ?
                        <div className={styles.messages}>
                            {allMessages.map((msg, index) => (
                                <div key={index} className={styles.message}>
                                    <Image src={msg.role === 'user' ? nouserlogo : chatgptlogo2} width={50} height={50} alt="" />
                                    <div className={styles.details}>
                                        <h2>{msg.role === 'user' ? 'You' : 'CHATGPT Bot'}</h2>
                                        <p>{msg.parts[0].text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className={styles.nochat}>
                            <div className={styles.s1}>
                                {/* <Image src={chatgptlogo} alt="chatgpt" height={70} width={70} /> */}
                                <h1>How can I help you today?</h1>
                            </div>
                            <div className={styles.s2}>
                                <div className={styles.suggestioncard}>
                                    <h2>Recommend activities</h2>
                                    <p>psychology behind decision-making</p>
                                </div>
                                <div className={styles.suggestioncard}>
                                    <h2>Recommend activities</h2>
                                    <p>psychology behind decision-making</p>
                                </div>
                                <div className={styles.suggestioncard}>
                                    <h2>Recommend activities</h2>
                                    <p>psychology behind decision-making</p>
                                </div>
                                <div className={styles.suggestioncard}>
                                    <h2>Recommend activities</h2>
                                    <p>psychology behind decision-making</p>
                                </div>
                            </div>

                        </div>
                }

                <div className={styles.bottomsection}>
                    <div className={styles.messagebar}>
                        <input type='text' placeholder='Message CHATGPT Bot...'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />

                        {
                            isSent ?
                                <svg
                                    onClick={sendMessage}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                                :
                                <HashLoader color="#36d7b7" size={30} />
                        }

                    </div>
                    <p>CHATGPT BOT can make mistakes. Consider checking important information.</p>

                </div>
            </div>
        </div>
    )
}

export default RightSection
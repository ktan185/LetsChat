import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import { getAllChats } from '../../services/chatService'
import { ChatList, CreateChat } from '../../components/chat/chatComponents.js'
import Button from 'react-bootstrap/esm/Button'

function Home() {
  const [chats, setChats] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchChats = async () => {
      const chatsData = await getAllChats()
      setChats(chatsData)
    }
    fetchChats()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Welcome back!</h1>
      <div className={styles.chats}>
        <h1>Join a chat room</h1>
        <CreateChat show={showModal} onHide={() => setShowModal(false)} />
        <div className={styles.createChatButton}>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Create a chat!
          </Button>
        </div>
        <ChatList chats={chats} />
      </div>
    </div>
  )
}

export default Home

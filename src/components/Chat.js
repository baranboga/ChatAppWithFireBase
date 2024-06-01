import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {

  //room adına göre mesajları tutmak için state oluşturuyoruz.


  const [messages, setMessages] = useState([]);
  //Yeni mesajı tutmak için state oluşturuyoruz.
  const [newMessage, setNewMessage] = useState("");
  //Firestore'da messages collection'ını state e atıyoruz.
  const messagesRef = collection(db, "messages");

  //Firestore'dan mesajları çekmek için useEffect kullanıyoruz.
  useEffect(() => {

    //Firestore'da messages collection'ını room adına göre sıralıyoruz. hangi odanın mesajlarını çekeceğimizi belirtiyoruz.
    const queryMessages = query(
      messagesRef,
      where("room", "==", room), //room adına göre mesajları çekiyoruz. Odaların farklı mesajları olacak. bu sayede odalara özel mesajlar çekebiliriz.
      orderBy("createdAt")  //createdAt'e göre sıralıyoruz.
    );

    //Firestore'da messages collection'ını dinliyoruz.
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      console.log("new message");
      snapshot.forEach((doc) => {
        // önceki mesajları al ve yeni mesajı ekleyerek set et. Ve her birine id ekleyerek set et.
        messages.push({ ...doc.data(), id: doc.id });
      });
 
      setMessages(messages);
      console.log(messages);
    });

    //Unsubscribe fonksiyonu ile dinlemeyi durduruyoruz.çünkü listenin useeffectlerinde sürekli dinleme yaparsak performans sorunları olabilir.
    //buna cleanup fonksiyonu denir.
    return () => unsuscribe();
  }, []);

  //Bu fonksiyon ile yeni mesajı ekleriz.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    //Firestore'a yeni mesajı ekliyoruz. firebase de doc aslında column'a denk gelir.
    //nasıl bir obje ekleyeceğimizi belirtiyoruz. istediğimiz objeyi ekleyebiliriz. çünkü noSQL
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      //Kullanıcı adını ve oda adını ekliyoruz.
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
    
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
 import "./sentbox.css";
//  import { fetchSentEmailsSuccess, deleteSentEmail } from "../../store/sentSlice";
import { deleteSentEmail,fetchSentEmailsSuccess } from "../Login/store/SentSlice";
 const SentEmail = () => {
    const Email = useSelector((state) => state.auth.email);
    const emails = useSelector((state) => state.sent.emails); // Update to use sent state ... array
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
    const myEmail = Email.replace(/[.@]/g, "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchSentEmails = async () => {
        try {
          const response = await axios.get(
            `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/sent/${myEmail}.json`
          );
          if (response.status === 200) {
            const fetchedEmails = [];
            for (const key in response.data) {
              console.log('res data', response.data)
              fetchedEmails.push({
                id: key,
                ...response.data[key],
              });
            }
            dispatch(fetchSentEmailsSuccess(fetchedEmails)); 
          }
        } catch (error) {
          console.error("Error fetching emails: ", error);
        }
      };
      if(isLoggedIn){
        fetchSentEmails();
      }
  
      fetchSentEmails();
    }, [dispatch,myEmail]);
  
    const handleDelete = async (emailId, event) => {
      event.stopPropagation();
      try {
        await axios.delete(
            `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/sent/${myEmail}.json`
        );
        dispatch(deleteSentEmail(emailId)); // Update to use deleteSentEmail from sentSlice
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    };
  
    const handleClick = (id) => {
        navigate(`/sent/${id}`);
    };
  
    return (
        <div className="sent">
        <ul className="sent-list">
          {emails.map((email) => (
            <li
              key={email.id}
              className="email-item"
              onClick={() => handleClick(email.id)}
            >
              <div className="email-header">
                <p className="sender-email">
                  To: <strong>{email.to}</strong>
                </p>
                <p className="email-subject">
                  <strong>{email.subject}</strong>
                </p>
              </div>
              <p className="email-content">{email.content}</p>
  
              <div className="delTime">
                <button
                  className="delEmailBtn"
                  onClick={(event) => handleDelete(email.id, event)}
                >
                  Delete
                </button>
  
                <p className="email-time">{email.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SentEmail;
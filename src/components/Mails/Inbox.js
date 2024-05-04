// import './inbox.css';
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { inboxActions } from '../Login/store/inboxSlice';
// import { useNavigate } from "react-router-dom";

// const Inbox = () => {
//     const Email = useSelector((state) => state.auth.email);
//     const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
//     const myEmail = Email.replace(/[.@]/g, "");
//     console.log('myemail', myEmail); // Log myEmail value for debugging
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [emails, setEmails] = useState(null); // Initialize emails state with null

//     useEffect(() => {
//       const fetchEmails = async () => {
//         try {
//           const response = await axios.get(
//             `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${myEmail}.json`
//           );
//           if (response.status === 200) {
//             const fetchedEmails = [];
//             for (const key in response.data) {
//               fetchedEmails.push({
//                 id: key,
//                 ...response.data[key],
//               });
//             }
//             setEmails(fetchedEmails); // Set emails state with fetched emails
//           }
//         } catch (error) {
//           console.error("Error fetching emails: ", error);
//         }
//       };

//       if (isLoggedIn) {
//         fetchEmails(); // Fetch emails when the component mounts
//         const intervalId = setInterval(fetchEmails, 2000); // Fetch emails periodically
//         return () => clearInterval(intervalId); // Clear interval when component unmounts
//       }
      
//     }, [dispatch, myEmail, isLoggedIn]);

//     const handleDelete = async (emailId, event) => {
//       event.stopPropagation();
//       try {
//         await axios.delete(
//           `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${myEmail}/${emailId}.json`
//         );
//         dispatch(inboxActions.deleteEmail(emailId)); // Dispatch deleteEmail action
//       } catch (error) {
//         console.error("Error deleting email:", error);
//       }
//     };

//     const handleClick = (id) => {
//       navigate(`/inbox/${id}`);
//     };

//     const addDot = (email) => {
//       if (email.read) {
//         return <span className="dot white"></span>;
//       } else {
//         return <span className="dot blue"></span>;
//       }
//     };

//     // Render the component only when emails are defined
//     if (!emails) {
//       return null;
//     }

//     return (
//       <div className="inbox">
//         <ul className="inbox-list">
//           {emails.map((email) => (
//             <li
//               key={email.id}
//               className="email-item"
//               onClick={() => handleClick(email.id)}
//             >
//               <div className="email-header">
//                 <p className="sender-email"></p>
//               </div>
//               {isLoggedIn && addDot(email)}
//               From: <strong>{email.from} </strong>
//               <strong>{email.subject}</strong>
//               <p className="email-content">{email.content}</p>
//               <div className="delTime">
//                 <button onClick={(event) => handleDelete(email.id, event)}>
//                   Delete
//                 </button>
//                 <p className="email-time">{email.time}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
// }

// export default Inbox;
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { fetchEmailsSuccess, markAsReadSuccess } from "./inboxSlice";
// import { fetchSentEmailsSuccess} from "../Login/store/SentSlice";
import { markAsReadSuccess } from "../Login/store/inboxSlice";
import { fetchSentEmailsSuccess } from "../Login/store/SentSlice";
import { useNavigate } from "react-router-dom";


const Inbox = () => {
  const emails = useSelector((state) => state.inbox.emails);
  const unreadCount = useSelector((state) => state.inbox.unreadCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`https://mailbox-2b912-default-rtdb.firebaseio.com`);
        if (response.status === 200) {
          dispatch(fetchSentEmailsSuccess(response.data));
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchEmails();
  }, [dispatch]);

  const handleClick = async (id) => {
    try {
      await axios.put(`https://mailbox-2b912-default-rtdb.firebaseio.com/${id}`, { read: true });
      dispatch(markAsReadSuccess(id));
      navigate(`/inbox/${id}`);
    } catch (error) {
      console.error("Error marking email as read: ", error);
    }
  };

  return (
    <div className="inbox">
      <h2>Total Unread Messages: {unreadCount}</h2>
      <ul className="inbox-list">
        {emails.map((email) => (
          <li key={email.id} className="email-item" onClick={() => handleClick(email.id)}>
            {email.read ? <span className="dot blue"></span> : <span className="dot white"></span>}
            <strong>{email.subject}</strong> - {email.content.substring(0, 50)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
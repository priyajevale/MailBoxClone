import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";
import './inboxFullMail.css'

const ShowFullMail = () => {
  const Email = useSelector((state) => state.auth.email);
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const myEmail = Email.replace(/[.@]/g, "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        await axios.patch(
            `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${myEmail}/${id}.json`,
          { read: true }
        );
        const response = await axios.get(
            `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${myEmail}/${id}.json`
        );
        if (response.status === 200) {
          setEmail(response.data);

          dispatch(inboxActions.markAsRead(id));
        } else {
          console.error("Failed to fetch email data:", response);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [dispatch, id, myEmail]);

  if (!email) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="main">
      <h3 className="emailSender">From: {email.from}</h3>
      <h2 className="emailsubject">{email.subject}</h2>
      <p className="email-content">{email.content}</p>
      <button className="backBtn" onClick={() => navigate("/inbox")}>
        Back
      </button>
    </div>
  );
};

export default ShowFullMail;
import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const Home = () => {
  const [inbox, setInbox] = useState([]);

  const mail = localStorage.getItem("email");
  const updatedMail = mail.replace("@", "").replace(".", "");

  const fetchInboxHandler = () => {
    fetch(
      `https://mail-box-27ec7-default-rtdb.firebaseio.com/to${updatedMail}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Fetching Inbox Failed!");
          });
        }
      })
      .then((data) => {
        if (data) {
          const allInboxMails = Object.keys(data).map((key) => ({
            id: key,
            fromMail: data[key].fromMail,
            subject: data[key].subject,
            body: data[key].body,
          }));
          setInbox(allInboxMails);
        } else {
          setInbox([]);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchInboxHandler();
  }, []);
  return (
    <Fragment>
      <Container>
        <div className="text-center mt-2" style={{ fontFamily: "serif" }}>
          <h1>Inbox</h1>
        </div>
        <ul className="list-unstyled">
          {inbox.map((mail) => (
            <li key={mail.id}>
              <Container
                fluid
                className="shadow-lg mt-4"
                style={{ border: "1px solid black", borderRadius: "5px" }}
              >
                <Button variant="outline-light w-100">
                  <p style={{ float: "left" }}>
                    <span style={{ fontWeight: "bold" }}>From: </span>
                    {mail.fromMail}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Subject: </span>
                    {mail.subject}
                  </p>
                </Button>
              </Container>
            </li>
          ))}
        </ul>
      </Container>
    </Fragment>
  );
};
export default Home;
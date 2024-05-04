// import React, { Fragment, useRef, useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from "draft-js";

// const ComposeMail = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const navigate = useNavigate();
//   const emailInputRef = useRef();
//   const subjectInputRef = useRef();

//   const onEditorStateChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const sendMailHandler = (event) => {
//     event.preventDefault();

//     const toMail = emailInputRef.current ? emailInputRef.current.value : "";
//     const fromMail = localStorage.getItem("email") || "";
//     const updatedToMail = toMail.replace("@", "").replace(".", "");
//     const updatedFromMail = fromMail.replace("@", "").replace(".", "");
//     const subject = subjectInputRef.current.value;
//     const body = editorState.getCurrentContent().getPlainText();

//     const composedMail = {
//       fromMail,
//       subject,
//       body,
//     };

//     const sentBoxMail = {
//       toMail,
//       subject,
//       body,
//     };

//     fetch(
//       `https://mailbox-2b912-default-rtdb.firebaseio.com/to${updatedToMail}.json`,
//       {
//         method: "POST",
//         body: JSON.stringify(composedMail),
//         headers: {
//           "Content-Type": "application.json",
//         },
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             throw new Error("Email Sent Failed!");
//           });
//         }
//       })
//       .then((data) => {
//         console.log(data);
//       });

//     fetch(
//       `https://mailbox-2b912-default-rtdb.firebaseio.com/from${updatedFromMail}.json`,
//       {
//         method: "POST",
//         body: JSON.stringify(sentBoxMail),
//         headers: {
//           "Content-Type": "application.json",
//         },
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             throw new Error("Email Sent Failed!");
//           });
//         }
//       })
//       .then((data) => {
//         console.log(data);
//       });

//     emailInputRef.current.value = "";
//     subjectInputRef.current.value = "";
//     setEditorState(EditorState.createEmpty());
//   };

//   return (
//     <Fragment>
//       <Container
//         className="p-3 shadow-lg"
//         style={{ marginTop: "20px", width: "70%", border: "2px solid black" }}
//       >
//         {/* <div
//           className="mb-2"
//           style={{ display: "flex", justifyContent: "space-between" }}
//         > */}
//           {/* <h5>New Message</h5> */}
//           {/* <Button variant="outline-dark" onClick={() => navigate("/home")}>
//             X
//           </Button> */}
//         {/* </div> */}
//         <Form onSubmit={sendMailHandler}>
//         <Form.Group style={{ display: "flex", alignItems: "center" }}>
//   <Form.Label style={{ marginRight: "10px" }}>To: </Form.Label>
//   <Form.Control
//     type="email"
//     className="mb-3"
//     ref={emailInputRef}
//     required
//   />
//   <div style={{ flex: 1 }}></div> {/* Empty div to push X button to the right */}
//   {/* <Button variant="outline-dark" onClick={() => navigate("/home")}>
//     X
//   </Button> */}

//   <Button variant="outline-dark" onClick={() => navigate("/home")}>
//     X
//   </Button>
// </Form.Group>
//           <Form.Control
//             className="mb-3"
//             type="text"
//             placeholder="Subject"
//             ref={subjectInputRef}
//           />
//           <Editor
//             editorState={editorState}
//             toolbarClassName="hidden"
//             wrapperClassName="border mb-3"
//             editorClassName="w-full mb-5"
//             onEditorStateChange={onEditorStateChange}
//           />
//           <Button type="submit" style={{backgroundColor:"aquamarine",cursor:'pointer'}}>Send </Button>
//         </Form>
//       </Container>
//     </Fragment>
//   );
// };

// export default ComposeMail;
import { useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import './compose.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import axios from "axios";
const ComposeMail = () =>{
  
const emailRef = useRef();
    const subjectRef = useRef();
    const editorRef = useRef();
    const SendersMail = useSelector((state) => state.auth.email);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSubmit = async (e) => {
      e.preventDefault();
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const enteredEmail = emailRef.current.value;
      const enteredSubject = subjectRef.current.value;
     const emailBody =  rawContentState.blocks.map(block => block.text).join('\n');
      // const myEmail = enteredEmail.replace(/[.@]/g, "");

      const recEmail = enteredEmail.replace(/[.@]/g, "");

      // const sentEmail = SendersMail.replace(/[.@]/g, "");
      const senderEmail = SendersMail.replace(/[.@]/g, "");


      const currentDate = new Date();
      const sentDate = currentDate.toDateString();
      const sentTime = currentDate.toLocaleTimeString();

      console.log('Sending email:', {  body: emailBody, enteredEmail });
      try {
        await axios.post(
          // `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${myEmail}.json`,
          `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/drafts/${recEmail}.json`,
          {
            to: enteredEmail,
            subject: enteredSubject,
            content: emailBody,
            from: SendersMail,
            date: sentDate,
            time: sentTime,

          }
        );

        await axios.post(
          // `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/sent/${sentEmail}.json`,
          `https://mailbox-2b912-default-rtdb.firebaseio.com/mailbox/sent/${senderEmail}.json`,
          {
            to: enteredEmail,
            subject: enteredSubject,
            content: emailBody,
            from: SendersMail,
            date: sentDate,
            time: sentTime,
            read:true,
          }
        );

        emailRef.current.value = "";
        subjectRef.current.value = "";

      } catch (error) {
        console.error("Error in sending the mail", error);
      }

      setEditorState(EditorState.createEmpty());
    };

    return(<>
   <div className="form">
      <div className="col-md-5 p-3 border" >
      <Form onSubmit={handleSubmit}>
     
             <div className="to">To: <Form.Control
               type="email"
               placeholder="Enter recipient email"
              //  value={to}
              //  onChange={(e) => setTo(e.target.value)}
              ref={emailRef}
               required
             />
           </div>
     
     
     
             <Form.Control
               type="text"
               placeholder="Enter subject"
              //  value={subject}
              //  onChange={(e) => setSubject(e.target.value)}
              ref={subjectRef}
               required
             />
             <Form.Label>Body:</Form.Label>
             <Editor
      placeholder="enter your text here!"
              // editorState={editorState}
              editorState={editorState}
              editorClassName="editorClassName"
               toolbarClassName="toolbarClassName"
               wrapperClassName="wrapperClassName"
               ref={editorRef}
               onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
     
              // onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
             />
     
     
     
           <Button variant="primary" type="submit">
             Send
           </Button>
         </Form>
         </div>
         </div>
     </>)    
     }
     
     export default ComposeMail;
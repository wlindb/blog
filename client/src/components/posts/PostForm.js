import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../form/Input";
import Textarea from "../form/Textarea";
const fs = require('fs');

const arrayBufferToBase64 = (buffer) => {
   var binary = '';
   var bytes = [].slice.call(new Uint8Array(buffer));
   bytes.forEach((b) => binary += String.fromCharCode(b));
   return window.btoa(binary);
};

const PostForm = ({ post, onChange, onImageChange, onBlur, loading, onSubmit }) => {
   const { title, body, videoURL, img, errors } = post;
   console.log('POSTFORM ', post); 
   // var base64Flag = 'data:image/jpeg;base64,';
   // var imageStr =
         // arrayBufferToBase64(image.data.data);
   // console.log(imageStr);
   // var arrayBufferView = new Uint8Array(image.data.data);
   // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
   console.log(img);
   
   var urlCreator = window.URL;
   var imageUrl = img ? urlCreator.createObjectURL( img ) : undefined;
   // console.log(blob);
   
   return (
      <Container>
         <Row>
            <Col className="mx-auto">
               <Form noValidate onSubmit={onSubmit} className="p-sm-3 p-xs-1">
                  <Input
                     name="title"
                     type="text"
                     placeholder="Enter Post Title"
                     value={title}
                     onChange={onChange}
                     onBlur={onBlur}
                     text={{
                        module: "post",
                        label: "Title",
                        error: errors.title
                     }}
                  />
                  {
                     img ? 
                     <div className="image-from-db-container">
                        <img src={imageUrl} />
                     </div>
                     : <div/>
                  }
                  <Input
                     name="image"
                     type="file"
                     placeholder="Upload screenshot"
                     onChange={onImageChange}
                     onBlur={onBlur}
                     text={{
                        module: "post",
                        label: "Upload Screenshot",
                        error: errors.title
                     }}
                  />
                  <Textarea
                     name="body"
                     placeholder="Write your post here..."
                     value={body}
                     onChange={onChange}
                     onBlur={onBlur}
                     text={{
                        module: "post",
                        label: "Description",
                        error: errors.body
                     }}
                  />
                  <Input
                     name="videoURL"
                     type="text"
                     placeholder="YouTube url for application demo"
                     value={videoURL}
                     onChange={onChange}
                     onBlur={onBlur}
                     text={{
                        module: "post",
                        label: "YouTube URL",
                        error: errors.title
                     }}
                  />
                  <Button
                     variant="outline-info"
                     type="submit"
                     disabled={loading}
                     className="mt-3"
                  >
                     Submit
                  </Button>
               </Form>
            </Col>
         </Row>
      </Container>
   );
};

PostForm.propTypes = {
   post: PropTypes.object.isRequired,
   loading: PropTypes.bool.isRequired,
   onBlur: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired
};

export default PostForm;
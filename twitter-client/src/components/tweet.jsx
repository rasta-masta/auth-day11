import { useState } from "react";
import {
   Avatar,
   Button,
   CircularProgress,
   CircularProgressLabel,
   Divider,
   Flex,
   Text,
   Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

export const TweetComp = () => {
   const [text, setText] = useState("");
   const { username, email, id } = useSelector((state) => state.user.value);
   const token = localStorage.getItem("token");

   const handleTweet = async () => {
      try {
         const data = {
            userId: id,
            username,
            email,
            tweet: text,
         };
         console.log(data);
         axios.post("http://localhost:2000/tweets", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
         });
         setText("");
         console.log(data);
         window.location.reload();
      } catch (err) {
         console.log(err);
      }
   };
   const characterCount = text.length;
   return (
      <Flex
         p="20px"
         gap="20px"
         borderBottom="1px solid"
         borderLeft="1px solid"
         borderRight="1px solid"
         borderColor="gray.100">
         <Avatar name={username} />
         <Flex flexDirection="column" gap="15px" w="100%">
            <Textarea
               placeholder="Apa yang sedang hangat dibicarakan?"
               value={text}
               onChange={(e)=>setText(e.target.value)}
               fontSize="20px"
            />
            <Divider />
            <Flex align="center" justify="space-between">
               <Flex align="center" gap="10px">
                  <Text fontWeight="bold">{characterCount} / 50</Text>
                  <CircularProgress
                     size="30px"
                     color={characterCount > 50 ? "red" : "blue"}
                     value={characterCount * 2}>
                     <CircularProgressLabel fontWeight="bold">
                        {characterCount * 2}%
                     </CircularProgressLabel>
                  </CircularProgress>
               </Flex>
               <Button
                  borderRadius="30px"
                  w="100px"
                  colorScheme="blue"
                  isDisabled={characterCount === 0 || characterCount > 50}
                  onClick={handleTweet}
                  type="submit"
                  >
                  Posting
               </Button>
            </Flex>
         </Flex>
      </Flex>
   );
};

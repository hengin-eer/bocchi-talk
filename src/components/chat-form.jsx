import { speechLanguageState } from "@/states/speechLanguageState";
import { useEffect, useRef } from "react";
import SpeechRecognition from "react-speech-recognition";
import { useRecoilValue } from "recoil";
import { Box, Button, Flex, Icon } from "@chakra-ui/react"
import { AutoResizeTextarea } from "./custom-chakra-ui";
import { PiMicrophoneFill, PiPaperPlaneRightFill } from "react-icons/pi";

export const ChatForm = ({ sendMessage, message, listening, setTextareaHeight, setMessage, setProovedText }) => {
    // setProofedText, setMessage
    // states
    const speechLanguage = useRecoilValue(speechLanguageState);

    // refs
    const textareaElement = useRef(null);

    // effects
	useEffect(() => {
		if (textareaElement.current) {
			setTextareaHeight(textareaElement.current.scrollHeight);
		}
	}, [message.content])

    // functions
    const handleInputChange = (value) => {
		setMessage({ role: "user", content: value });
		setProovedText(value);
	}

    return (
        <Box as='form' onSubmit={(e) => sendMessage(e)} >
            <Flex ref={textareaElement} align='flex-end' w='100%' maxW={800} h='auto' px={3} mx='auto' py={3}>
                <AutoResizeTextarea placeholder="Let's Chat!!" value={message.content} onChange={(e) => handleInputChange(e.target.value)} />
                {(message.content !== "" || speechLanguage === "") && (
                    <Button colorScheme='teal' type='submit'><Icon as={PiPaperPlaneRightFill} /></Button>
                )}
                {message.content === "" && speechLanguage !== "" && (
                    <Button colorScheme='green' variant={listening ? 'solid' : 'ghost'} onClick={() => SpeechRecognition.startListening({ language: speechLanguage })}><Icon as={PiMicrophoneFill} /></Button>
                )}
            </Flex>
        </Box>
    )
}
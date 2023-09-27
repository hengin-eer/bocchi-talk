import { Box, Text } from '@chakra-ui/react';
import { diffChars } from 'diff';

export const OlderDiffMessages = ({ beforeText, AfterText }) => {
    const diff = diffChars(beforeText, AfterText);

    return (
        <Text >
            {diff.filter((part) => part.added === undefined).map((part) => (
                <>
                    {part.removed ? <Box as='span' color='red' fontWeight='semibold' borderBottom='2px' borderColor='red.300'>{part.value}</Box> : <>{part.value}</>}
                </>
            ))}
        </Text>
    );
}

export const NewerDiffMessages = ({ beforeText, AfterText }) => {
    const diff = diffChars(beforeText, AfterText);

    return (
        <Text>
            {diff.filter((part) => part.removed === undefined).map((part) => (
                <>
                    {part.added ? <Box as='span' color='green' fontWeight='semibold' borderBottom='2px' borderColor='green.300'>{part.value}</Box> : <>{part.value}</>}
                </>
            ))}
        </Text>
    );
}
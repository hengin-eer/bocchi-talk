import { Text, Link } from '@chakra-ui/react';

const MarkdownComponents = {
    h1: (props) => (
        <Text as="h1" fontSize="24px" fontWeight="bold" mt={4} mb={2} {...props} />
    ),
    h2: (props) => (
        <Text as="h2" fontSize="20px" fontWeight="bold" mt={3} mb={1} {...props} />
    ),
    h3: (props) => (
        <Text as="h3" fontSize="16px" fontWeight="bold" mt={2} mb={1} {...props} />
    ),
    li: (props) => (
        <Text as="li" listStyleType="disc" ml={4} mb={1} {...props} />
    ),
    li: (props) => (
        <Text as="li" listStyleType="decimal" ml={4} mb={1} {...props} />
    ),
    a: ({ children, href }) => (
        <Link textDecoration="underline" href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
    ),
    p: (props) => (
        <Text {...props} mb={2} />
    ),
};

export default MarkdownComponents;

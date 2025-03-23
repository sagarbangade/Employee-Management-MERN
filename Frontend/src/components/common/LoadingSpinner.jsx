// Frontend\src\components\common\LoadingSpinner.jsx
import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const LoadingSpinner = ({ size = 'xl', ...props }) => {
    return (
        <Box textAlign="center" {...props}>
            <Spinner size={size} />
        </Box>
    );
};

export default LoadingSpinner;
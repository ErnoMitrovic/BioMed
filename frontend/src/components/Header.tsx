import { Grid, Box, Image, Heading, Divider, IconButton } from '@chakra-ui/react';
import { FiHome, FiMenu } from 'react-icons/fi';

function Header() {
    return (
        <>
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap={4}
                bg="#8C587A"
                color="white"
                alignItems="center"
                p={4}
                w='100%'
            >
                {/* Logo */}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Image src="/SecretariaSalud.jpg" boxSize="75px" alt="Logo" />
                </Box>
                {/* Título */}
                <Box>
                    <Heading
                        pb={2}
                        fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} // Tamaños de fuente diferentes para cada breakpoint
                    >
                        DIRECCION DE INVESTIGACION <br/>
                        DEPARTAMENTO DE EVALUACION TECNOLOGICA <br/>
                        CERTIFICADO DE ACEPTACION
                    </Heading>
                    <Divider borderWidth={2} borderRadius={10} />
                </Box>
                {/* Logo */}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Image src="/favicon.ico" boxSize="75px" alt="Logo" />
                </Box>
            </Grid>
        </>
    );
}

export default Header;

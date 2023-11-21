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
            >
                {/* Logo */}
                <Box display="flex" alignItems="center" justifyContent="start">
                    <Image src="/favicon.ico" boxSize="50px" alt="Logo" borderRadius='full' />
                </Box>
                {/* Título */}
                <Box>
                    <Heading
                        pb={2}
                        fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} // Tamaños de fuente diferentes para cada breakpoint
                    >
                        Ficha Técnica de Equipo médico
                    </Heading>
                    <Divider borderWidth={2} borderRadius={10} />
                </Box>
                {/* Íconos de acciones */}
                <Box display="flex" justifyContent="end">
                    <IconButton
                        aria-label="Inicio"
                        icon={<FiHome />}
                        size="lg"
                        variant="ghost"
                        color="white"
                        marginRight={2}
                        bg='#A61B8F'
                        borderRadius='full'
                    />
                    <IconButton
                        aria-label="Menú"
                        icon={<FiMenu />}
                        size="lg"
                        variant="ghost"
                        color="white"
                        bg='#A61B8F'
                        borderRadius='full'
                    />
                </Box>
            </Grid>
        </>
    );
}

export default Header;

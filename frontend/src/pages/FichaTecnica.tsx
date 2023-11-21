import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Select,
    Button,
    VStack,
    Heading,
    useBreakpointValue,
    Grid,
    GridItem,
} from '@chakra-ui/react';

function MedicalEquipmentForm() {

    const templateValues = useBreakpointValue({
        base: 'repeat(1, 1fr)', // 1 columna en dispositivos pequeños
        md: 'repeat(2, 1fr)', // 2 columnas en dispositivos medianos
        lg: 'repeat(3, 1fr)', // 3 columnas en dispositivos grandes
    })

    return (
        <Flex bg="#D9C7D3" align="center" justify="center" h="80vh" minW='sm'>
            <Grid
                templateColumns={templateValues}
                gap={4}
                autoRows="minmax(75px, auto)"
                p={4}
                w='80%'>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Nombre del equipo</FormLabel>
                        <Select placeholder="Seleccione equipo">
                            {/* Opciones */}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Marca</FormLabel>
                        <Input type="date" />
                    </FormControl>
                </GridItem>
                {/* Añade más controles de formulario según sea necesario */}
                <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
                    <Button width="full">Enviar</Button>
                </GridItem>
            </Grid>
        </Flex >
    );
}

export default MedicalEquipmentForm;

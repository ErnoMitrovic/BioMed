import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Button,
    HStack,
    Heading,
    useBreakpointValue,
    Grid,
    GridItem,
    Radio,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React from 'react';

interface Item {
    label: string;
    value: string;
}

const equipos = [
    'Aparato de anestesia',
    'Aparato de radiografia',
    'Aparato de electrocardiograma',
];

interface FormData {
    nombreDelEquipo: string;
    marca: string;
    fechaDeRecepcion: string;
    nombreDelRepartidor: string;
    numeroDeFichaTecnica: string;
    nombreDelReceptor: string;
    descripcion: string;
    manual: string;
    accesorios: string;
    capacitacion: string;
    consumibles: string;
    garantia: string;
    refracciones: string;
    mantenimiento: string;
    instalacion: string;
    normas: string;
}

type FormField = {
    id: keyof FormData;
    label: string;
    placeholder: string;
    required: boolean;
    type?: string;
    options?: string[];
    showOnValue?: string;
    hidden?: boolean;
};

const formFields: FormField[] = [
    { id: 'nombreDelEquipo', label: 'Nombre del equipo', placeholder: 'Lista desplegable', required: true, type: 'autocomplete', options: equipos },
    { id: 'marca', label: 'Marca', placeholder: 'Ingresa una marca', required: true, type: 'text' },
    { id: 'fechaDeRecepcion', label: 'Fecha de recepción', placeholder: '', required: true, type: 'date' },
    { id: 'nombreDelRepartidor', label: 'Nombre del repartidor', placeholder: 'Nombre y apellido', required: true, type: 'text' },
    { id: 'numeroDeFichaTecnica', label: 'Número de ficha técnica', placeholder: 'XXXXXXXX', required: true, type: 'text' },
    { id: 'nombreDelReceptor', label: 'Nombre del receptor', placeholder: 'Nombre y apellido', required: true, type: 'text' },
    { id: 'descripcion', label: 'Descripción', placeholder: 'Descripción del equipo', required: true, type: 'text' },
    { id: 'accesorios', label: 'Accesorios', placeholder: 'Accesorios del equipo', required: true, type: 'text' },
    { id: 'manual', label: 'Manual de operación y software', placeholder: '', required: true, type: 'radio', options: ['Si', 'No'] },
    { id: 'capacitacion', label: 'Capacitación', placeholder: 'Quien brinda la capacitacion', required: true, type: 'text' },
    { id: 'consumibles', label: 'Consumibles', placeholder: 'Consumibles del equipo', required: true, type: 'text' },
    { id: 'garantia', label: 'Garantia', placeholder: 'Garantia del equipo', required: true, type: 'text' },
    { id: 'mantenimiento', label: 'Mantenimiento', placeholder: 'Periodo de mantenimiento en meses', required: true, type: 'number' },
    { id: 'instalacion', label: 'Instalacion y puesta en marcha', placeholder: 'Instrucciones', required: true, type: 'text' },
    { id: 'normas', label: 'Normas y certificados vigentes', placeholder: 'Certificado / norma', required: true, type: 'text' },
];

const initialFormData: FormData = {
    nombreDelEquipo: '',
    marca: '',
    fechaDeRecepcion: '',
    nombreDelRepartidor: '',
    numeroDeFichaTecnica: '',
    nombreDelReceptor: '',
    descripcion: '',
    manual: '',
    accesorios: '',
    capacitacion: '',
    consumibles: '',
    garantia: '',
    refracciones: '',
    mantenimiento: '',
    instalacion: '',
    normas: '',
};

function FichaTecnica() {
    const [pickerItems, setPickerItems] = React.useState(equipos);
    const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
    const [formData, setFormData] = React.useState(initialFormData);
    const templateValues = useBreakpointValue({
        base: 'repeat(1, 1fr)', // 1 columna en dispositivos pequeños
        md: 'repeat(2, 1fr)', // 2 columnas en dispositivos medianos
        lg: 'repeat(3, 1fr)', // 3 columnas en dispositivos grandes
    });

    const handleCreateItem = (item: Item) => {
        setPickerItems((curr) => [...curr, item.value]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (changes: { selectedItems?: Item[] }) => {
        if (changes.selectedItems) {
            setSelectedItems(changes.selectedItems);
        }
    };

    const handleChange = (id: keyof FormData, value: string) => {
        setFormData((prevData) => ({
            ...formData,
            [id]: value,
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    const renderFormField = (field: FormField) => {
        switch (field.type) {
            case 'autocomplete':
                return (
                    <CUIAutoComplete
                        label={field.label}
                        labelStyleProps={{ color: '#8C587A', fontWeight: 'bold' }}
                        placeholder={field.placeholder}
                        onCreateItem={handleCreateItem}
                        items={pickerItems.map((item) => ({ label: item, value: item }))} // Convertir el arreglo de strings a un arreglo de objetos
                        selectedItems={selectedItems}
                        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes)}
                    />
                );
            case 'text':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <Input type='text' placeholder={field.placeholder} onChange={(e) => handleChange(field.id, e.target.value)} />
                    </FormControl>
                );
            case 'date':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <Input type="date" onChange={(e) => handleChange(field.id, e.target.value)} />
                    </FormControl>
                );
            case 'number':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <NumberInput defaultValue={0} min={0}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                )
            case 'radio':
                return (
                    <FormControl as='fieldset'>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <RadioGroup defaultValue={field.options ? field.options[0] : ''}>
                            <HStack spacing='24px'>
                                {field.options &&
                                    field.options.map((option, index) => (
                                        <Radio key={index} value={option}>
                                            {option}
                                        </Radio>
                                    ))}
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                );
            default:
                return null;
        }
    };

    return (
        <Box w='100%' as='form' onSubmit={submit}>
            <Flex direction='column' align="center" justify="center" minW='sm'>
                <Grid templateColumns={templateValues} gap={4} autoRows="minmax(75px, auto)" p={4} w='80%'>
                    {formFields.slice(0, 6).map((field) => (
                        <GridItem key={field.id} colSpan={1}>
                            {renderFormField(field)}
                        </GridItem>
                    ))}
                </Grid>
                <Box bg='#8C587A' w='100%' color='white'>
                    <Heading p={4} fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>
                        Apartado de características
                    </Heading>
                </Box>
                <Grid templateColumns={templateValues} gap={4} autoRows="minmax(75px, auto)" p={4} w='80%'>
                    {formFields.slice(6).map((field) => (
                        <GridItem key={field.id} colSpan={1}>
                            {renderFormField(field)}
                        </GridItem>
                    ))}
                    <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
                        <Button type='submit' minW='sm' color='white' bg='#8C587A' _hover={{ bg: '#A61B8F' }} _active={{ bg: '#6C1466' }}>
                            Enviar
                        </Button>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    );
}

export default FichaTecnica;
